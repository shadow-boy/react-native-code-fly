#import "CodeFly.h"

// #if __has_include(<React/RCTConvert.h>)
// #import <React/RCTConvert.h>
// #else
// #import "RCTConvert.h"
// #endif


#import <React/RCTConvert.h>


// Extending the RCTConvert class allows the React Native
// bridge to handle args of type "CodeFlyInstallMode"
@implementation RCTConvert (CodeFlyInstallMode)

RCT_ENUM_CONVERTER(CodeFlyInstallMode, (@{ @"CodeFlyInstallModeImmediate": @(CodeFlyInstallModeImmediate),
                                            @"CodeFlyInstallModeOnNextRestart": @(CodeFlyInstallModeOnNextRestart),
                                            @"CodeFlyInstallModeOnNextResume": @(CodeFlyInstallModeOnNextResume),
                                            @"CodeFlyInstallModeOnNextSuspend": @(CodeFlyInstallModeOnNextSuspend) }),
                   CodeFlyInstallModeImmediate, // Default enum value
                   integerValue)

@end
