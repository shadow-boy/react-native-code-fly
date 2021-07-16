#import "CodeFly.h"
#import "SSZipArchive.h"

@implementation CodeFlyPackage

#pragma mark - Private constants

static NSString *const DiffManifestFileName = @"hotCodeFly.json";
static NSString *const DownloadFileName = @"download.zip";
static NSString *const RelativeBundlePathKey = @"bundlePath";
static NSString *const StatusFile = @"CodeFly.json";
static NSString *const UpdateBundleFileName = @"app.jsbundle";
static NSString *const UpdateMetadataFileName = @"app.json";
static NSString *const UnzippedFolderName = @"unzipped";

#pragma mark - Public methods

+ (void)clearUpdates
{
  [[NSFileManager defaultManager] removeItemAtPath:[self getCodeFlyPath] error:nil];
}

+ (void)downloadAndReplaceCurrentBundle:(NSString *)remoteBundleUrl
{
  NSURL *urlRequest = [NSURL URLWithString:remoteBundleUrl];
  NSError *error = nil;
  NSString *downloadedBundle = [NSString stringWithContentsOfURL:urlRequest
                                                        encoding:NSUTF8StringEncoding
                                                           error:&error];
  
  if (error) {
    CFLog(@"Error downloading from URL %@", remoteBundleUrl);
  } else {
    NSString *currentPackageBundlePath = [self getCurrentPackageBundlePath:&error];
    [downloadedBundle writeToFile:currentPackageBundlePath
                       atomically:YES
                         encoding:NSUTF8StringEncoding
                            error:&error];
  }
}

+ (void)downloadPackage:(NSDictionary *)updatePackage
 expectedBundleFileName:(NSString *)expectedBundleFileName
              publicKey:(NSString *)publicKey
         operationQueue:(dispatch_queue_t)operationQueue
       progressCallback:(void (^)(long long, long long))progressCallback
           doneCallback:(void (^)())doneCallback
           failCallback:(void (^)(NSError *err))failCallback
{
  NSString *newUpdateHash = updatePackage[@"packageHash"];
  NSString *newUpdateFolderPath = [self getPackageFolderPath:newUpdateHash];
  NSString *newUpdateMetadataPath = [newUpdateFolderPath stringByAppendingPathComponent:UpdateMetadataFileName];
  NSError *error;
  
  if ([[NSFileManager defaultManager] fileExistsAtPath:newUpdateFolderPath]) {
    // This removes any stale data in newUpdateFolderPath that could have been left
    // uncleared due to a crash or error during the download or install process.
    [[NSFileManager defaultManager] removeItemAtPath:newUpdateFolderPath
                                               error:&error];
  } else if (![[NSFileManager defaultManager] fileExistsAtPath:[self getCodeFlyPath]]) {
    [[NSFileManager defaultManager] createDirectoryAtPath:[self getCodeFlyPath]
                              withIntermediateDirectories:YES
                                               attributes:nil
                                                    error:&error];
    
    // Ensure that none of the CodeFly updates we store on disk are
    // ever included in the end users iTunes and/or iCloud backups
    NSURL *CodeFlyURL = [NSURL fileURLWithPath:[self getCodeFlyPath]];
    [CodeFlyURL setResourceValue:@YES forKey:NSURLIsExcludedFromBackupKey error:nil];
  }
  
  if (error) {
    return failCallback(error);
  }
  
  NSString *downloadFilePath = [self getDownloadFilePath];
  NSString *bundleFilePath = [newUpdateFolderPath stringByAppendingPathComponent:UpdateBundleFileName];
  
  CodeFlyDownloadHandler *downloadHandler = [[CodeFlyDownloadHandler alloc]
                                             init:downloadFilePath
                                             operationQueue:operationQueue
                                             progressCallback:progressCallback
                                             doneCallback:^(BOOL isZip) {
    NSError *error = nil;
    NSString * unzippedFolderPath = [CodeFlyPackage getUnzippedFolderPath];
    NSMutableDictionary * mutableUpdatePackage = [updatePackage mutableCopy];
    if (isZip) {
      if ([[NSFileManager defaultManager] fileExistsAtPath:unzippedFolderPath]) {
        // This removes any unzipped download data that could have been left
        // uncleared due to a crash or error during the download process.
        [[NSFileManager defaultManager] removeItemAtPath:unzippedFolderPath
                                                   error:&error];
        if (error) {
          failCallback(error);
          return;
        }
      }
      
      NSError *nonFailingError = nil;
      [SSZipArchive unzipFileAtPath:downloadFilePath
                      toDestination:unzippedFolderPath];
      [[NSFileManager defaultManager] removeItemAtPath:downloadFilePath
                                                 error:&nonFailingError];
      if (nonFailingError) {
        CFLog(@"Error deleting downloaded file: %@", nonFailingError);
        nonFailingError = nil;
      }
      
      
      [CodeFlyUpdateUtils copyEntriesInFolder:unzippedFolderPath
                                   destFolder:newUpdateFolderPath
                                        error:&error];
      if (error) {
        failCallback(error);
        return;
      }
      
      [[NSFileManager defaultManager] removeItemAtPath:unzippedFolderPath
                                                 error:&nonFailingError];
      if (nonFailingError) {
        CFLog(@"Error deleting downloaded file: %@", nonFailingError);
        nonFailingError = nil;
      }
      
      NSString *relativeBundlePath = [CodeFlyUpdateUtils findMainBundleInFolder:newUpdateFolderPath
                                                               expectedFileName:expectedBundleFileName
                                                                          error:&error];
      
      if (error) {
        failCallback(error);
        return;
      }
      
      if (relativeBundlePath) {
        [mutableUpdatePackage setValue:relativeBundlePath forKey:RelativeBundlePathKey];
      } else {
        NSString *errorMessage = [NSString stringWithFormat:@"Update is invalid - A JS bundle file named \"%@\" could not be found within the downloaded contents. Please ensure that your app is syncing with the correct deployment and that you are releasing your CodeFly updates using the exact same JS bundle file name that was shipped with your app's binary.", expectedBundleFileName];
        
        error = [CodeFlyErrorUtils errorWithMessage:errorMessage];
        
        failCallback(error);
        return;
      }
      
      if ([[NSFileManager defaultManager] fileExistsAtPath:newUpdateMetadataPath]) {
        [[NSFileManager defaultManager] removeItemAtPath:newUpdateMetadataPath
                                                   error:&error];
        if (error) {
          failCallback(error);
          return;
        }
      }
      
    
      

    } else {
      [[NSFileManager defaultManager] createDirectoryAtPath:newUpdateFolderPath
                                withIntermediateDirectories:YES
                                                 attributes:nil
                                                      error:&error];
      [[NSFileManager defaultManager] moveItemAtPath:downloadFilePath
                                              toPath:bundleFilePath
                                               error:&error];
      if (error) {
        failCallback(error);
        return;
      }
    }
    
    NSData *updateSerializedData = [NSJSONSerialization dataWithJSONObject:mutableUpdatePackage
                                                                   options:0
                                                                     error:&error];
    NSString *packageJsonString = [[NSString alloc] initWithData:updateSerializedData
                                                        encoding:NSUTF8StringEncoding];
    
    [packageJsonString writeToFile:newUpdateMetadataPath
                        atomically:YES
                          encoding:NSUTF8StringEncoding
                             error:&error];
    if (error) {
      failCallback(error);
    } else {
      doneCallback();
    }
  }
                                             
                                             failCallback:failCallback];
  
  [downloadHandler download:updatePackage[@"downloadUrl"]];
}

+ (NSString *)getCodeFlyPath
{
  NSString* CodeFlyPath = [[CodeFly getApplicationSupportDirectory] stringByAppendingPathComponent:@"CodeFly"];
//  if ([CodeFly isUsingTestConfiguration]) {
//    CodeFlyPath = [CodeFlyPath stringByAppendingPathComponent:@"TestPackages"];
//  }
  
  return CodeFlyPath;
}
/**
 获取app.json中 使用都包信息
 */
+ (NSDictionary *)getCurrentPackage:(NSError **)error
{
  NSString *packageHash = [CodeFlyPackage getCurrentPackageHash:error];
  if (!packageHash) {
    return nil;
  }
  
  return [CodeFlyPackage getPackage:packageHash error:error];
}

+ (NSString *)getCurrentPackageBundlePath:(NSError **)error
{
  NSString *packageFolder = [self getCurrentPackageFolderPath:error];
  
  if (!packageFolder) {
    return nil;
  }
  
  NSDictionary *currentPackage = [self getCurrentPackage:error];
  
  if (!currentPackage) {
    return nil;
  }
  
  NSString *relativeBundlePath = [currentPackage objectForKey:RelativeBundlePathKey];
  if (relativeBundlePath) {
    return [packageFolder stringByAppendingPathComponent:relativeBundlePath];
  } else {
    return [packageFolder stringByAppendingPathComponent:UpdateBundleFileName];
  }
}

+ (NSString *)getCurrentPackageHash:(NSError **)error
{
  NSDictionary *info = [self getCurrentPackageInfo:error];
  if (!info) {
    return nil;
  }
  
  return info[@"currentPackage"];
}

+ (NSString *)getCurrentPackageFolderPath:(NSError **)error
{
  NSDictionary *info = [self getCurrentPackageInfo:error];
  
  if (!info) {
    return nil;
  }
  
  NSString *packageHash = info[@"currentPackage"];
  
  if (!packageHash) {
    return nil;
  }
  
  return [self getPackageFolderPath:packageHash];
}

+ (NSMutableDictionary *)getCurrentPackageInfo:(NSError **)error
{
  NSString *statusFilePath = [self getStatusFilePath];
  if (![[NSFileManager defaultManager] fileExistsAtPath:statusFilePath]) {
    return [NSMutableDictionary dictionary];
  }
  
  NSString *content = [NSString stringWithContentsOfFile:statusFilePath
                                                encoding:NSUTF8StringEncoding
                                                   error:error];
  if (!content) {
    return nil;
  }
  
  NSData *data = [content dataUsingEncoding:NSUTF8StringEncoding];
  NSDictionary* json = [NSJSONSerialization JSONObjectWithData:data
                                                       options:kNilOptions
                                                         error:error];
  if (!json) {
    return nil;
  }
  
  return [json mutableCopy];
}

+ (NSString *)getDownloadFilePath
{
  return [[self getCodeFlyPath] stringByAppendingPathComponent:DownloadFileName];
}

+ (NSDictionary *)getPackage:(NSString *)packageHash
                       error:(NSError **)error
{
  NSString *updateDirectoryPath = [self getPackageFolderPath:packageHash];
  NSString *updateMetadataFilePath = [updateDirectoryPath stringByAppendingPathComponent:UpdateMetadataFileName];
  
  if (![[NSFileManager defaultManager] fileExistsAtPath:updateMetadataFilePath]) {
    return nil;
  }
  
  NSString *updateMetadataString = [NSString stringWithContentsOfFile:updateMetadataFilePath
                                                             encoding:NSUTF8StringEncoding
                                                                error:error];
  if (!updateMetadataString) {
    return nil;
  }
  
  NSData *updateMetadata = [updateMetadataString dataUsingEncoding:NSUTF8StringEncoding];
  return [NSJSONSerialization JSONObjectWithData:updateMetadata
                                         options:kNilOptions
                                           error:error];
}

+ (NSString *)getPackageFolderPath:(NSString *)packageHash
{
  return [[self getCodeFlyPath] stringByAppendingPathComponent:packageHash];
}

+ (NSDictionary *)getPreviousPackage:(NSError **)error
{
  NSString *packageHash = [self getPreviousPackageHash:error];
  if (!packageHash) {
    return nil;
  }
  
  return [CodeFlyPackage getPackage:packageHash error:error];
}

+ (NSString *)getPreviousPackageHash:(NSError **)error
{
  NSDictionary *info = [self getCurrentPackageInfo:error];
  if (!info) {
    return nil;
  }
  
  return info[@"previousPackage"];
}

+ (NSString *)getStatusFilePath
{
  return [[self getCodeFlyPath] stringByAppendingPathComponent:StatusFile];
}

+ (NSString *)getUnzippedFolderPath
{
  return [[self getCodeFlyPath] stringByAppendingPathComponent:UnzippedFolderName];
}



/**
 {
 appVersion = "1.0";
 deploymentKey = "";
 downloadUrl = "http://qq1w7fz5q.hn-bkt.clouddn.com/bundle.zip";
 isMandatory = 1;
 label = v2;
 packageHash = 8427bdfbdd6c569366152f0f5de3e90600b6dbc2750d91fa7de64e114e921e04;
 packageSize = 3965726;
 }
 */
+ (BOOL)installPackage:(NSDictionary *)updatePackage
   removePendingUpdate:(BOOL)removePendingUpdate
                 error:(NSError **)error
{
  NSString *packageHash = updatePackage[@"packageHash"];
  NSMutableDictionary *info = [self getCurrentPackageInfo:error];
  
  if (!info) {
    return NO;
  }
  
  if (packageHash && [packageHash isEqualToString:info[@"currentPackage"]]) {
    // The current package is already the one being installed, so we should no-op.
    return YES;
  }
  
  if (removePendingUpdate) {
    NSString *currentPackageFolderPath = [self getCurrentPackageFolderPath:error];
    if (currentPackageFolderPath) {
      // Error in deleting pending package will not cause the entire operation to fail.
      NSError *deleteError;
      [[NSFileManager defaultManager] removeItemAtPath:currentPackageFolderPath
                                                 error:&deleteError];
      if (deleteError) {
        CFLog(@"Error deleting pending package: %@", deleteError);
      }
    }
  } else {
    NSString *previousPackageHash = [self getPreviousPackageHash:error];
    if (previousPackageHash && ![previousPackageHash isEqualToString:packageHash]) {
      NSString *previousPackageFolderPath = [self getPackageFolderPath:previousPackageHash];
      // Error in deleting old package will not cause the entire operation to fail.
      NSError *deleteError;
      [[NSFileManager defaultManager] removeItemAtPath:previousPackageFolderPath
                                                 error:&deleteError];
      if (deleteError) {
        CFLog(@"Error deleting old package: %@", deleteError);
      }
    }
    [info setValue:info[@"currentPackage"] forKey:@"previousPackage"];
  }
  
  [info setValue:packageHash forKey:@"currentPackage"];
  return [self updateCurrentPackageInfo:info
                                  error:error];
}

+ (void)rollbackPackage
{
  NSError *error;
  NSMutableDictionary *info = [self getCurrentPackageInfo:&error];
  if (!info) {
    CFLog(@"Error getting current package info: %@", error);
    return;
  }
  
  NSString *currentPackageFolderPath = [self getCurrentPackageFolderPath:&error];
  if (!currentPackageFolderPath) {
    CFLog(@"Error getting current package folder path: %@", error);
    return;
  }
  
  NSError *deleteError;
  BOOL result = [[NSFileManager defaultManager] removeItemAtPath:currentPackageFolderPath
                                                           error:&deleteError];
  if (!result) {
    CFLog(@"Error deleting current package contents at %@ error %@", currentPackageFolderPath, deleteError);
  }
  
  [info setValue:info[@"previousPackage"] forKey:@"currentPackage"];
  [info removeObjectForKey:@"previousPackage"];
  
  [self updateCurrentPackageInfo:info error:&error];
}

+ (BOOL)updateCurrentPackageInfo:(NSDictionary *)packageInfo
                           error:(NSError **)error
{
  NSData *packageInfoData = [NSJSONSerialization dataWithJSONObject:packageInfo
                                                            options:0
                                                              error:error];
  if (!packageInfoData) {
    return NO;
  }
  
  NSString *packageInfoString = [[NSString alloc] initWithData:packageInfoData
                                                      encoding:NSUTF8StringEncoding];
  BOOL result = [packageInfoString writeToFile:[self getStatusFilePath]
                                    atomically:YES
                                      encoding:NSUTF8StringEncoding
                                         error:error];
  
  if (!result) {
    return NO;
  }
  return YES;
}

@end
