#import "CodeFly.h"

void CodeFlyLog(NSString *formatString, ...) {
#if DEBUG
    va_list args;
    va_start(args, formatString);
    NSString *prependedFormatString = [NSString stringWithFormat:@"\n[CodeFly] %@", formatString];
    NSLogv(prependedFormatString, args);
    va_end(args);
    
#endif
}
