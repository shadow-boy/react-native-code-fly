package com.reactnativecodefly;

public final class CodeFlyNotInitializedException extends RuntimeException {

    public CodeFlyNotInitializedException(String message, Throwable cause) {
        super(message, cause);
    }

    public CodeFlyNotInitializedException(String message) {
        super(message);
    }
}
