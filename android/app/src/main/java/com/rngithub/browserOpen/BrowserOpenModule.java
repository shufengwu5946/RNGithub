package com.rngithub.browserOpen;

import android.content.Intent;
import android.net.Uri;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import javax.annotation.Nonnull;

public class BrowserOpenModule extends ReactContextBaseJavaModule {
    public BrowserOpenModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Nonnull
    @Override
    public String getName() {
        return "BrowserOpenAndroid";
    }

    @ReactMethod
    public void open(String url) {
        Intent intent = new Intent();
        intent.setData(Uri.parse(url));//Url 就是你要打开的网址
        intent.setAction(Intent.ACTION_VIEW);
        getReactApplicationContext().startActivity(intent); //启动浏览器
    }
}
