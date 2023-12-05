#if __has_include(<React/RCTAssert.h>)
#import <React/RCTAssert.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTConvert.h>
#import <React/RCTEventDispatcher.h>
#import <React/RCTRootView.h>
#import <React/RCTUtils.h>
#else // back compatibility for RN version < 0.40
#import "RCTAssert.h"
#import "RCTBridgeModule.h"
#import "RCTConvert.h"
#import "RCTEventDispatcher.h"
#import "RCTRootView.h"
#import "RCTUtils.h"
#endif

#import "CodeFly.h"
#import "SSZipArchive.h"


@interface CodeFly () <RCTBridgeModule, RCTFrameUpdateObserver>
@end

@implementation CodeFly {
    BOOL _hasResumeListener;
    //    BOOL _isFirstRunAfterUpdate;
    //    int _minimumBackgroundDuration;
    // Used to coordinate the dispatching of download progress events to JS.
    long long _latestExpectedContentLength;
    long long _latestReceivedConentLength;
    BOOL _didUpdateProgress;
    
    BOOL _allowed;
    BOOL _restartInProgress;
    
}

RCT_EXPORT_MODULE()

#pragma mark - Private constants

// These constants represent emitted events
static NSString *const DownloadProgressEvent = @"CodeFlyDownloadProgress";

// These keys represent the names we use to store data in NSUserDefaults
static NSString *const FailedUpdatesKey = @"CODE_FLY_FAILED_UPDATES";


// These keys are used to inspect/augment the metadata
// that is associated with an update's package.
static NSString *const AppVersionKey = @"appVersion";
static NSString *const BinaryBundleDateKey = @"binaryDate";
static NSString *const PackageHashKey = @"packageHash";

#pragma mark - Static variables

static BOOL isRunningBinaryVersion = NO;

// These values are used to save the NS bundle, name, extension and subdirectory
// for the JS bundle in the binary.
static NSBundle *bundleResourceBundle = nil;
static NSString *bundleResourceExtension = @"jsbundle";
static NSString *bundleResourceName = @"main";
static NSString *bundleResourceSubdirectory = nil;

// modify at 2023/10/17
static NSString *defaultResourceName = @"index";
static NSString *defaultBundleZipName = @"main";
static NSString *defaultBundleZipPassword = @"passwordforzip";


+ (void)initialize
{
    [super initialize];
    if (self == [CodeFly class]) {
        // Use the mainBundle by default.
        bundleResourceBundle = [NSBundle mainBundle];
    }
}




+(NSString* )localAssetPath{
    NSString *supportPath = [self getApplicationSupportDirectory];
    supportPath = [supportPath stringByAppendingPathComponent:@"codefly_local_assets"];
    return supportPath;
}

+ (NSURL *)localBundleURLForResource:(NSString *)resourceName
                       bunleFileName:(NSString * )bunleFileName
                         zipPassword:(NSString * )zipPassword{
    if (bunleFileName){
        defaultBundleZipName = bunleFileName;
    }
    if (resourceName){
        defaultResourceName = resourceName;
    }
    if (zipPassword){
        defaultBundleZipPassword =  zipPassword;
    }
    NSFileManager * fm = [NSFileManager defaultManager];
    NSError * error = nil;
    if (![fm fileExistsAtPath:[self localAssetPath]]){
        [[NSFileManager defaultManager] createDirectoryAtPath:[self localAssetPath]
                                  withIntermediateDirectories:YES
                                                   attributes:nil
                                                        error:&error];
        if (error){
            NSLog(@"createDirectoryAtPath.error-->%@",error);
        }
        else{
            NSLog(@"createDirectoryAtPath.success-->successfully");
        }
        
    }
    
    NSString * file = [NSString stringWithFormat:@"%@.%@",defaultResourceName,bundleResourceExtension];
    NSString* filePath   =  [[self localAssetPath] stringByAppendingPathComponent:file];
    BOOL fileExist = [fm fileExistsAtPath:filePath];
    if (!fileExist){
        // file not exist  and next to unzip the decrypt zip to this destination path
        NSString * zipPath = [[NSBundle mainBundle] pathForResource:defaultBundleZipName ofType:@"zip"];
        
        NSString * unzippedFolderPath  = [self localAssetPath];
        
        NSError* error= nil;
        [SSZipArchive unzipFileAtPath:zipPath
                        toDestination:unzippedFolderPath overwrite:YES password:defaultBundleZipPassword error:&error];
        if (!error){
            NSLog(@"create the {%@} in {%@} successfully--->",file,unzippedFolderPath);
            NSString* retPath = [unzippedFolderPath stringByAppendingPathComponent:file];
            return [NSURL fileURLWithPath:retPath isDirectory:NO];
        }
        return nil;
        
    }
    
    NSString* retPath = [[self localAssetPath] stringByAppendingPathComponent:file];
    
    return [NSURL fileURLWithPath:retPath isDirectory:NO];
    
    
    
    
    
    
}





#pragma mark - Public Obj-C API

+ (NSURL *)binaryBundleURL
{
    return [bundleResourceBundle URLForResource:bundleResourceName
                                  withExtension:bundleResourceExtension
                                   subdirectory:bundleResourceSubdirectory];
}

+ (NSString *)bundleAssetsPath
{
    NSString *resourcePath = [bundleResourceBundle resourcePath];
    if (bundleResourceSubdirectory) {
        resourcePath = [resourcePath stringByAppendingPathComponent:bundleResourceSubdirectory];
    }
    
    return [resourcePath stringByAppendingPathComponent:[CodeFlyUpdateUtils assetsFolderName]];
}

+ (NSURL *)bundleURL
{
    return [self bundleURLForResource:bundleResourceName
                        withExtension:bundleResourceExtension
                         subdirectory:bundleResourceSubdirectory
                               bundle:bundleResourceBundle];
}

+ (NSURL *)bundleURLForResource:(NSString *)resourceName
{
    return [self bundleURLForResource:resourceName
                        withExtension:bundleResourceExtension
                         subdirectory:bundleResourceSubdirectory
                               bundle:bundleResourceBundle];
}

+ (NSURL *)bundleURLForResource:(NSString *)resourceName
                  withExtension:(NSString *)resourceExtension
{
    return [self bundleURLForResource:resourceName
                        withExtension:resourceExtension
                         subdirectory:bundleResourceSubdirectory
                               bundle:bundleResourceBundle];
}

+ (NSURL *)bundleURLForResource:(NSString *)resourceName
                  withExtension:(NSString *)resourceExtension
                   subdirectory:(NSString *)resourceSubdirectory
{
    return [self bundleURLForResource:resourceName
                        withExtension:resourceExtension
                         subdirectory:resourceSubdirectory
                               bundle:bundleResourceBundle];
}

+ (NSURL *)bundleURLForResource:(NSString *)resourceName
                  withExtension:(NSString *)resourceExtension
                   subdirectory:(NSString *)resourceSubdirectory
                         bundle:(NSBundle *)resourceBundle
{
    bundleResourceName = resourceName;
    bundleResourceExtension = resourceExtension;
    bundleResourceSubdirectory = resourceSubdirectory;
    bundleResourceBundle = resourceBundle;
    
    
    NSString *logMessageFormat = @"Loading JS bundle from %@";
    
    NSError *error;
    NSString *packageFile = [CodeFlyPackage getCurrentPackageBundlePath:&error];
    //    NSURL *binaryBundleURL = [self binaryBundleURL];
    
    if (error || !packageFile) {
        //        CodeFlyLog(logMessageFormat, binaryBundleURL);
        isRunningBinaryVersion = YES;
        return nil;
    }
    
    NSString *binaryAppVersion = [[CodeFlyConfig current] appVersion];
    NSDictionary *currentPackageMetadata = [CodeFlyPackage getCurrentPackage:&error];
    if (error || !currentPackageMetadata) {
        //        CodeFlyLog(logMessageFormat, binaryBundleURL);
        isRunningBinaryVersion = YES;
        return nil;
    }
    
    NSString *packageDate = [currentPackageMetadata objectForKey:BinaryBundleDateKey];
    NSString *packageAppVersion = [currentPackageMetadata objectForKey:AppVersionKey];
    
    if ([binaryAppVersion isEqualToString:packageAppVersion]) {
        // Return package file because it is newer than the app store binary's JS bundle
        NSURL *packageUrl = [[NSURL alloc] initFileURLWithPath:packageFile];
        CodeFlyLog(logMessageFormat, packageUrl);
        isRunningBinaryVersion = NO;
        return packageUrl;
    } else {
        BOOL isRelease = NO;
#ifndef DEBUG
        isRelease = YES;
#endif
        
        if (isRelease || ![binaryAppVersion isEqualToString:packageAppVersion]) {
            [CodeFly clearUpdates];
        }
        
        //        CodeFlyLog(logMessageFormat, binaryBundleURL);
        isRunningBinaryVersion = YES;
        //        return binaryBundleURL;
        
        
        // update 2021--7 --7 night
        return  packageFile;
    }
}

+ (NSString *)getApplicationSupportDirectory
{
    NSString *applicationSupportDirectory = [NSSearchPathForDirectoriesInDomains(NSApplicationSupportDirectory, NSUserDomainMask, YES) objectAtIndex:0];
    return applicationSupportDirectory;
}

+ (void)overrideAppVersion:(NSString *)appVersion
{
    [CodeFlyConfig current].appVersion = appVersion;
}

+ (void)setDeploymentKey:(NSString *)deploymentKey
{
    [CodeFlyConfig current].deploymentKey = deploymentKey;
}

/*
 * WARNING: This cleans up all downloaded and pending updates.
 */
+ (void)clearUpdates
{
    [CodeFlyPackage clearUpdates];
    [self removeFailedUpdates];
}


#pragma mark - Private API methods

@synthesize methodQueue = _methodQueue;
@synthesize pauseCallback = _pauseCallback;
@synthesize paused = _paused;

- (void)setPaused:(BOOL)paused
{
    if (_paused != paused) {
        _paused = paused;
        if (_pauseCallback) {
            _pauseCallback();
        }
    }
}



/*
 * This method is used by the React Native bridge to allow
 * our plugin to expose constants to the JS-side. In our case
 * we're simply exporting enum values so that the JS and Native
 * sides of the plugin can be in sync.
 */
- (NSDictionary *)constantsToExport
{
    // Export the values of the CodeFlyInstallMode and CodeFlyUpdateState
    // enums so that the script-side can easily stay in sync
    return @{
        @"CodeFlyInstallModeOnNextRestart":@(CodeFlyInstallModeOnNextRestart),
        @"CodeFlyInstallModeImmediate": @(CodeFlyInstallModeImmediate),
        @"CodeFlyInstallModeOnNextResume": @(CodeFlyInstallModeOnNextResume),
        @"CodeFlyInstallModeOnNextSuspend": @(CodeFlyInstallModeOnNextSuspend),
        
        @"CodeFlyUpdateStateRunning": @(CodeFlyUpdateStateRunning),
        @"CodeFlyUpdateStatePending": @(CodeFlyUpdateStatePending),
        @"CodeFlyUpdateStateLatest": @(CodeFlyUpdateStateLatest)
    };
};

+ (BOOL)requiresMainQueueSetup
{
    return YES;
}

- (void)dealloc
{
    // Ensure the global resume handler is cleared, so that
    // this object isn't kept alive unnecessarily
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (void)dispatchDownloadProgressEvent {
    // Notify the script-side about the progress
    [self sendEventWithName:DownloadProgressEvent
                       body:@{
        @"totalBytes" : [NSNumber
                         numberWithLongLong:_latestExpectedContentLength],
        @"receivedBytes" : [NSNumber
                            numberWithLongLong:_latestReceivedConentLength]
    }];
}

- (instancetype)init
{
    _allowed = YES;
    _restartInProgress = NO;
    
    
    self = [super init];
    
    return self;
}



/*
 * This method checks to see whether a specific package hash
 * has previously failed installation.
 */
+ (BOOL)isFailedHash:(NSString*)packageHash
{
    NSUserDefaults *preferences = [NSUserDefaults standardUserDefaults];
    NSMutableArray *failedUpdates = [preferences objectForKey:FailedUpdatesKey];
    if (failedUpdates == nil || packageHash == nil) {
        return NO;
    } else {
        for (NSDictionary *failedPackage in failedUpdates)
        {
            // Type check is needed for backwards compatibility, where we used to just store
            // the failed package hash instead of the metadata. This only impacts "dev"
            // scenarios, since in production we clear out old information whenever a new
            // binary is applied.
            if ([failedPackage isKindOfClass:[NSDictionary class]]) {
                NSString *failedPackageHash = [failedPackage objectForKey:PackageHashKey];
                if ([packageHash isEqualToString:failedPackageHash]) {
                    return YES;
                }
            }
        }
        
        return NO;
    }
}


- (void)loadBundle
{
    dispatch_async(dispatch_get_main_queue(), ^{
        // If the current bundle URL is using http(s), then assume the dev
        // is debugging and therefore, shouldn't be redirected to a local
        // file (since Chrome wouldn't support it). Otherwise, update
        // the current bundle URL to point at the latest update
        if (![super.bridge.bundleURL.scheme hasPrefix:@"http"]) {
            [super.bridge setValue:[CodeFly bundleURL] forKey:@"bundleURL"];
        }
        
        [super.bridge reload];
    });
}


/*
 * When an update failed to apply, this method can be called
 * to store its hash so that it can be ignored on future
 * attempts to check the server for an update.
 */
- (void)saveFailedUpdate:(NSDictionary *)failedPackage
{
    if ([[self class] isFailedHash:[failedPackage objectForKey:PackageHashKey]]) {
        return;
    }
    
    NSUserDefaults *preferences = [NSUserDefaults standardUserDefaults];
    NSMutableArray *failedUpdates = [preferences objectForKey:FailedUpdatesKey];
    if (failedUpdates == nil) {
        failedUpdates = [[NSMutableArray alloc] init];
    } else {
        // The NSUserDefaults sytem always returns immutable
        // objects, regardless if you stored something mutable.
        failedUpdates = [failedUpdates mutableCopy];
    }
    
    [failedUpdates addObject:failedPackage];
    [preferences setObject:failedUpdates forKey:FailedUpdatesKey];
    [preferences synchronize];
}

/*
 * This method is used to clear away failed updates in the event that
 * a new app store binary is installed.
 */
+ (void)removeFailedUpdates
{
    NSUserDefaults *preferences = [NSUserDefaults standardUserDefaults];
    [preferences removeObjectForKey:FailedUpdatesKey];
    [preferences synchronize];
}


- (NSArray<NSString *> *)supportedEvents {
    return @[DownloadProgressEvent];
}



#pragma mark - Application lifecycle event handlers

// These three handlers will only be registered when there is
// a resume-based update still pending installation.
- (void)applicationDidBecomeActive
{
    //    if (_installMode == CodeFlyInstallModeOnNextSuspend) {
    //        int durationInBackground = [self getDurationInBackground];
    //        // We shouldn't use loadBundle in this case, because _appSuspendTimer will call loadBundleOnTick.
    //        // We should cancel timer for _appSuspendTimer because otherwise, we would call loadBundle two times.
    //        if (durationInBackground < _minimumBackgroundDuration) {
    //            [_appSuspendTimer invalidate];
    //            _appSuspendTimer = nil;
    //        }
    //    }
}

- (void)applicationWillEnterForeground
{
    //    if (_installMode == CodeFlyInstallModeOnNextResume) {
    //        int durationInBackground = [self getDurationInBackground];
    //        if (durationInBackground >= _minimumBackgroundDuration) {
    //            [self restartAppInternal];
    //        }
    //    }
}

- (void)applicationWillResignActive
{
    // Save the current time so that when the app is later
    // resumed, we can detect how long it was in the background.
    //    _lastResignedDate = [NSDate date];
    //
    //    if (_installMode == CodeFlyInstallModeOnNextSuspend && [[self class] isPendingUpdate:nil]) {
    //        _appSuspendTimer = [NSTimer scheduledTimerWithTimeInterval:_minimumBackgroundDuration
    //                                                         target:self
    //                                                       selector:@selector(loadBundleOnTick:)
    //                                                       userInfo:nil
    //                                                        repeats:NO];
    //    }
}

-(void)loadBundleOnTick:(NSTimer *)timer {
    [self restartAppInternal];
}

#pragma mark - JavaScript-exported module methods (Public)

/*
 * This is native-side of the RemotePackage.download method
 */
RCT_EXPORT_METHOD(downloadUpdate:(NSDictionary*)updatePackage
                  notifyProgress:(BOOL)notifyProgress
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    NSDictionary *mutableUpdatePackage = [updatePackage mutableCopy];
    NSURL *binaryBundleURL = [CodeFly binaryBundleURL];
    
    
    if (binaryBundleURL != nil) {
        [mutableUpdatePackage setValue:[CodeFlyUpdateUtils modifiedDateStringOfFileAtURL:binaryBundleURL]
                                forKey:BinaryBundleDateKey];
    }
    
    if (notifyProgress) {
        // Set up and unpause the frame observer so that it can emit
        // progress events every frame if the progress is updated.
        _didUpdateProgress = NO;
        self.paused = NO;
    }
    
    NSString * publicKey = [[CodeFlyConfig current] publicKey];
    
    [CodeFlyPackage
     downloadPackage:mutableUpdatePackage
     expectedBundleFileName:[bundleResourceName stringByAppendingPathExtension:bundleResourceExtension]
     publicKey:publicKey
     operationQueue:_methodQueue
     // The download is progressing forward
     progressCallback:^(long long expectedContentLength, long long receivedContentLength) {
        // Update the download progress so that the frame observer can notify the JS side
        _latestExpectedContentLength = expectedContentLength;
        _latestReceivedConentLength = receivedContentLength;
        _didUpdateProgress = YES;
        
        // If the download is completed, stop observing frame
        // updates and synchronously send the last event.
        if (expectedContentLength == receivedContentLength) {
            _didUpdateProgress = NO;
            self.paused = YES;
            [self dispatchDownloadProgressEvent];
        }
    }
     // The download completed
     doneCallback:^{
        NSError *err;
        NSDictionary *newPackage = [CodeFlyPackage getPackage:mutableUpdatePackage[PackageHashKey] error:&err];
        
        if (err) {
            return reject([NSString stringWithFormat: @"%lu", (long)err.code], err.localizedDescription, err);
        }
        resolve(newPackage);
    }
     // The download failed
     failCallback:^(NSError *err) {
        if ([CodeFlyErrorUtils isCodeFlyError:err]) {
            [self saveFailedUpdate:mutableUpdatePackage];
        }
        
        // Stop observing frame updates if the download fails.
        _didUpdateProgress = NO;
        self.paused = YES;
        reject([NSString stringWithFormat: @"%lu", (long)err.code], err.localizedDescription, err);
    }];
}

- (void)restartAppInternal
{
    
    [self loadBundle];
    CodeFlyLog(@"Restarting app.");
}

/*
 * This is the native side of the CodeFly.getConfiguration method. It isn't
 * currently exposed via the "react-native-code-push" module, and is used
 * internally only by the CodeFly.checkForUpdate method in order to get the
 * app version, as well as the deployment key that was configured in the Info.plist file.
 */
RCT_EXPORT_METHOD(getConfiguration:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    NSDictionary *configuration = [[CodeFlyConfig current] configuration];
    resolve(configuration);
}

/*
 * This method is the native side of the CodeFly.getUpdateMetadata method.
 */
RCT_EXPORT_METHOD(getUpdateMetadata:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    NSError *error;
    NSMutableDictionary *package = [[CodeFlyPackage getCurrentPackage:&error] mutableCopy];
    
    if (error) {
        return reject([NSString stringWithFormat: @"%lu", (long)error.code], error.localizedDescription, error);
    } else if (package == nil) {
        // The app hasn't downloaded any CodeFly updates yet,
        // so we simply return nil regardless if the user
        // wanted to retrieve the pending or running update.
        return resolve(nil);
    }
    
    
    resolve(package);
    
}

/*
 * This method is the native side of the LocalPackage.install method.
 */
RCT_EXPORT_METHOD(installUpdate:(NSDictionary*)updatePackage
                  installMode:(CodeFlyInstallMode)installMode
                  minimumBackgroundDuration:(int)minimumBackgroundDuration
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    NSError *error;
    [CodeFlyPackage installPackage:updatePackage
               removePendingUpdate:YES
                             error:&error];
    
    if (error) {
        reject([NSString stringWithFormat: @"%lu", (long)error.code], error.localizedDescription, error);
    } else {
        
        if (!_hasResumeListener) {
            // Ensure we do not add the listener twice.
            // Register for app resume notifications so that we
            // can check for pending updates which support "restart on resume"
            [[NSNotificationCenter defaultCenter] addObserver:self
                                                     selector:@selector(applicationDidBecomeActive)
                                                         name:UIApplicationDidBecomeActiveNotification
                                                       object:RCTSharedApplication()];
            
            [[NSNotificationCenter defaultCenter] addObserver:self
                                                     selector:@selector(applicationWillEnterForeground)
                                                         name:UIApplicationWillEnterForegroundNotification
                                                       object:RCTSharedApplication()];
            
            [[NSNotificationCenter defaultCenter] addObserver:self
                                                     selector:@selector(applicationWillResignActive)
                                                         name:UIApplicationWillResignActiveNotification
                                                       object:RCTSharedApplication()];
            
            _hasResumeListener = YES;
        }
        
        // Signal to JS that the update has been applied.
        resolve(nil);
    }
}


/*
 * This method is the native side of the CodeFly.restartApp() method.
 */
RCT_EXPORT_METHOD(restartApp:(BOOL)onlyIfUpdateIsPending
                  resolve:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    [self restartAppInternal];
    resolve(nil);
}

/*
 * This method clears CodeFly's downloaded updates.
 * It is needed to switch to a different deployment if the current deployment is more recent.
 * Note: we don’t recommend to use this method in scenarios other than that (CodeFly will call this method
 * automatically when needed in other cases) as it could lead to unpredictable behavior.
 */
RCT_EXPORT_METHOD(clearUpdates) {
    CodeFlyLog(@"Clearing updates.");
    [CodeFly clearUpdates];
}

#pragma mark - JavaScript-exported module methods (Private)



#pragma mark - RCTFrameUpdateObserver Methods

- (void)didUpdateFrame:(RCTFrameUpdate *)update
{
    if (!_didUpdateProgress) {
        return;
    }
    
    [self dispatchDownloadProgressEvent];
    _didUpdateProgress = NO;
}

@end
