package com.rngithub.cardview;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

public class RNCardViewModule  extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public RNCardViewModule (ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "RNCardView";
    }
}
