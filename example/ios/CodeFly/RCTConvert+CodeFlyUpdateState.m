#import "CodeFly.h"

// #if __has_include(<React/RCTConvert.h>)
// #import <React/RCTConvert.h>
// #else
// #import "RCTConvert.h"
// #endif

#import <React/RCTConvert.h>


// Extending the RCTConvert class allows the React Native
// bridge to handle args of type "CodeFlyUpdateState"
@implementation RCTConvert (CodeFlyUpdateState)

RCT_ENUM_CONVERTER(CodeFlyUpdateState, (@{ @"CodeFlyUpdateStateRunning": @(CodeFlyUpdateStateRunning),
                                            @"CodeFlyUpdateStatePending": @(CodeFlyUpdateStatePending),
                                            @"CodeFlyUpdateStateLatest": @(CodeFlyUpdateStateLatest)
                                          }),
                   CodeFlyUpdateStateRunning, // Default enum value
                   integerValue)

@end
