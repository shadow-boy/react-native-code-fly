package com.reactnativecodefly;

import java.net.MalformedURLException;

public class CodeFlyMalformedDataException extends RuntimeException {
    public CodeFlyMalformedDataException(String path, Throwable cause) {
        super("Unable to parse contents of " + path + ", the file may be corrupted.", cause);
    }
    public CodeFlyMalformedDataException(String url, MalformedURLException cause) {
        super("The package has an invalid downloadUrl: " + url, cause);
    }
}
