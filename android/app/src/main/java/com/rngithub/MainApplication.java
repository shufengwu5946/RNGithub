package com.rngithub;

import android.app.Application;
import com.rngithub.browserOpen.BrowserOpenPackage;
import com.rngithub.cardview.RNCardViewPackage;
import com.rngithub.share.SharePackage;
import com.facebook.react.ReactApplication;
import com.oblador.vectoricons.VectorIconsPackage;
import com.horcrux.svg.SvgPackage;
import com.burnweb.rnsendintent.RNSendIntentPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import ca.jaysoo.extradimensions.ExtraDimensionsPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new VectorIconsPackage(),
            new SvgPackage(),
            new RNSendIntentPackage(),
            new ReanimatedPackage(),
            new RNGestureHandlerPackage(),
            new FastImageViewPackage(),
            new ExtraDimensionsPackage(),
            new ReactNativeConfigPackage(),
            new AsyncStoragePackage(),
            new RNCardViewPackage(),
            new SharePackage(),
            new BrowserOpenPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
