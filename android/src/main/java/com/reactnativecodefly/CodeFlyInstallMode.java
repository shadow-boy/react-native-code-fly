package com.reactnativecodefly;

public enum CodeFlyInstallMode {
    IMMEDIATE(0),
    ON_NEXT_RESTART(1),
    ON_NEXT_RESUME(2),
    ON_NEXT_SUSPEND(3);

    private final int value;
    CodeFlyInstallMode(int value) {
        this.value = value;
    }
    public int getValue() {
        return this.value;
    }
}
