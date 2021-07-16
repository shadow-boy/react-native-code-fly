#import "CodeFly.h"

@implementation CodeFlyErrorUtils

static NSString *const CodeFlyErrorDomain = @"CodeFlyError";
static const int CodeFlyErrorCode = -1;

+ (NSError *)errorWithMessage:(NSString *)errorMessage
{
    return [NSError errorWithDomain:CodeFlyErrorDomain
                               code:CodeFlyErrorCode
                           userInfo:@{ NSLocalizedDescriptionKey: NSLocalizedString(errorMessage, nil) }];
}

+ (BOOL)isCodeFlyError:(NSError *)err
{
    return err != nil && [CodeFlyErrorDomain isEqualToString:err.domain];
}

@end
