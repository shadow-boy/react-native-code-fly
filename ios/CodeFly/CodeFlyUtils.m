#import "CodeFly.h"

void CFLog(NSString *formatString, ...) {
    va_list args;
    va_start(args, formatString);
    NSString *prependedFormatString = [NSString stringWithFormat:@"\n[CodeFly] %@", formatString];
    NSLogv(prependedFormatString, args);
    va_end(args);
}
