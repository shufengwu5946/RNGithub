package com.rngithub.share;

import android.content.Intent;
import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import javax.annotation.Nonnull;

public class ShareModule extends ReactContextBaseJavaModule {
    public ShareModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Nonnull
    @Override
    public String getName() {
        return "ShareAndroid";
    }

    @ReactMethod
    public void share(String message) {
        Intent textIntent = new Intent(Intent.ACTION_SEND);
        textIntent.setType("text/plain");
        textIntent.putExtra(Intent.EXTRA_TEXT, message);
        getReactApplicationContext().startActivity(Intent.createChooser(textIntent, "分享"));
    }
}
