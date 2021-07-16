package com.reactnativecodefly;

import android.content.Context;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.res.Resources;
import android.util.Log;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.devsupport.DevInternalSettings;
import com.facebook.react.devsupport.interfaces.DevSupportManager;
import com.facebook.react.uimanager.ViewManager;

import org.jetbrains.annotations.NotNull;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.lang.reflect.Method;

public class CodeFly implements ReactPackage {

    private static boolean sIsRunningBinaryVersion = false;
    private static boolean sTestConfigurationFlag = false;
    private static String sAppVersion = null;

    private boolean mDidUpdate = false;

    private String mAssetsBundleFileName;

    // Helper classes.
    private CodeFlyUpdateManager mUpdateManager;
    private SettingsManager mSettingsManager;

    // Config properties.
    private String mDeploymentKey;
    private static String mServerUrl = "https://codefly.appcenter.ms/";

    private Context mContext;
    private final boolean mIsDebugMode;

    private static String mPublicKey;

    private static ReactInstanceHolder mReactInstanceHolder;
    private static CodeFly mCurrentInstance;

    public CodeFly(String deploymentKey, Context context) {
        this(deploymentKey, context, false);
    }

    public static String getServiceUrl() {
        return mServerUrl;
    }

    public CodeFly(String deploymentKey, Context context, boolean isDebugMode) {
        mContext = context.getApplicationContext();

        mUpdateManager = new CodeFlyUpdateManager(context.getFilesDir().getAbsolutePath());
        mDeploymentKey = deploymentKey;
        mIsDebugMode = isDebugMode;
        mSettingsManager = new SettingsManager(mContext);

        if (sAppVersion == null) {
            try {
                PackageInfo pInfo = mContext.getPackageManager().getPackageInfo(mContext.getPackageName(), 0);
                sAppVersion = pInfo.versionName;
            } catch (PackageManager.NameNotFoundException e) {
                throw new CodeFlyUnknownException("Unable to get package info for " + mContext.getPackageName(), e);
            }
        }

        mCurrentInstance = this;

        String publicKeyFromStrings = getCustomPropertyFromStringsIfExist("PublicKey");
        if (publicKeyFromStrings != null) mPublicKey = publicKeyFromStrings;

        String serverUrlFromStrings = getCustomPropertyFromStringsIfExist("ServerUrl");
        if (serverUrlFromStrings != null) mServerUrl = serverUrlFromStrings;

        clearDebugCacheIfNeeded(null);
    }

    public CodeFly(String deploymentKey, Context context, boolean isDebugMode, String serverUrl) {
        this(deploymentKey, context, isDebugMode);
        mServerUrl = serverUrl;
    }

    public CodeFly(String deploymentKey, Context context, boolean isDebugMode, int publicKeyResourceDescriptor) {
        this(deploymentKey, context, isDebugMode);

        mPublicKey = getPublicKeyByResourceDescriptor(publicKeyResourceDescriptor);
    }

    public CodeFly(String deploymentKey, Context context, boolean isDebugMode, String serverUrl, Integer publicKeyResourceDescriptor) {
        this(deploymentKey, context, isDebugMode);

        if (publicKeyResourceDescriptor != null) {
            mPublicKey = getPublicKeyByResourceDescriptor(publicKeyResourceDescriptor);
        }

        mServerUrl = serverUrl;
    }

    private String getPublicKeyByResourceDescriptor(int publicKeyResourceDescriptor){
        String publicKey;
        try {
            publicKey = mContext.getString(publicKeyResourceDescriptor);
        } catch (Resources.NotFoundException e) {
            throw new CodeFlyInvalidPublicKeyException(
                    "Unable to get public key, related resource descriptor " +
                            publicKeyResourceDescriptor +
                            " can not be found", e
            );
        }

        if (publicKey.isEmpty()) {
            throw new CodeFlyInvalidPublicKeyException("Specified public key is empty");
        }
        return publicKey;
    }

    private String getCustomPropertyFromStringsIfExist(String propertyName) {
        String property;

        String packageName = mContext.getPackageName();
        int resId = mContext.getResources().getIdentifier("CodeFly" + propertyName, "string", packageName);

        if (resId != 0) {
            property = mContext.getString(resId);

            if (!property.isEmpty()) {
                return property;
            } else {
                CodeFlyUtils.log("Specified " + propertyName + " is empty");
            }
        }

        return null;
    }

    private boolean isLiveReloadEnabled(ReactInstanceManager instanceManager) {
        // Use instanceManager for checking if we use LiveReload mode. In this case we should not remove ReactNativeDevBundle.js file
        // because we get error with trying to get this after reloading. Issue: https://github.com/microsoft/react-native-code-push/issues/1272
        if (instanceManager != null) {
            DevSupportManager devSupportManager = instanceManager.getDevSupportManager();
            if (devSupportManager != null) {
                DevInternalSettings devInternalSettings = (DevInternalSettings)devSupportManager.getDevSettings();
                Method[] methods = devInternalSettings.getClass().getMethods();
                for (Method m : methods) {
                    if (m.getName().equals("isReloadOnJSChangeEnabled")) {
                        try {
                            return (boolean) m.invoke(devInternalSettings);
                        } catch (Exception x) {
                            return false;
                        }
                    }
                }
            }
        }

        return false;
    }

    public void clearDebugCacheIfNeeded(ReactInstanceManager instanceManager) {
        if (mIsDebugMode && mSettingsManager.isPendingUpdate(null) && !isLiveReloadEnabled(instanceManager)) {
            // This needs to be kept in sync with https://github.com/facebook/react-native/blob/master/ReactAndroid/src/main/java/com/facebook/react/devsupport/DevSupportManager.java#L78
            File cachedDevBundle = new File(mContext.getFilesDir(), "ReactNativeDevBundle.js");
            if (cachedDevBundle.exists()) {
                cachedDevBundle.delete();
            }
        }
    }

    public boolean didUpdate() {
        return mDidUpdate;
    }

    public String getAppVersion() {
        return sAppVersion;
    }

    public String getAssetsBundleFileName() {
        return mAssetsBundleFileName;
    }

    public String getPublicKey() {
        return mPublicKey;
    }


    public String getPackageFolder() {
        JSONObject CodeFlyLocalPackage = mUpdateManager.getCurrentPackage();
        if (CodeFlyLocalPackage == null) {
            return null;
        }
        return mUpdateManager.getPackageFolderPath(CodeFlyLocalPackage.optString("packageHash"));
    }

    @Deprecated
    public static String getBundleUrl() {
        return getJSBundleFile();
    }

    @Deprecated
    public static String getBundleUrl(String assetsBundleFileName) {
        return getJSBundleFile(assetsBundleFileName);
    }

    public Context getContext() {
        return mContext;
    }

    public String getDeploymentKey() {
        return mDeploymentKey;
    }

    public static String getJSBundleFile() {
        return CodeFly.getJSBundleFile(CodeFlyConstants.DEFAULT_JS_BUNDLE_NAME);
    }

    public static String getJSBundleFile(String assetsBundleFileName) {
        if (mCurrentInstance == null) {
            throw new CodeFlyNotInitializedException("A CodeFly instance has not been created yet. Have you added it to your app's list of ReactPackages?");
        }

        return mCurrentInstance.getJSBundleFileInternal(assetsBundleFileName);
    }

    public String getJSBundleFileInternal(String assetsBundleFileName) {
        this.mAssetsBundleFileName = assetsBundleFileName;
        String binaryJsBundleUrl = CodeFlyConstants.ASSETS_BUNDLE_PREFIX + assetsBundleFileName;

        String packageFilePath = null;
        try {
            packageFilePath = mUpdateManager.getCurrentPackageBundlePath(this.mAssetsBundleFileName);
          CodeFlyUtils.log(packageFilePath);
        } catch (CodeFlyMalformedDataException e) {
            // We need to recover the app in case 'codefly.json' is corrupted
            CodeFlyUtils.log(e.getMessage());
            clearUpdates();
        }

        if (packageFilePath == null) {
            // There has not been any downloaded updates.
            CodeFlyUtils.logBundleUrl(binaryJsBundleUrl);
            sIsRunningBinaryVersion = true;
            return binaryJsBundleUrl;
        }

        JSONObject packageMetadata = this.mUpdateManager.getCurrentPackage();
        if (isPackageBundleLatest(packageMetadata)) {
            CodeFlyUtils.logBundleUrl(packageFilePath);
            sIsRunningBinaryVersion = false;
            return packageFilePath;
        } else {
            // The binary version is newer.
            this.mDidUpdate = false;
            if (!this.mIsDebugMode || hasBinaryVersionChanged(packageMetadata)) {
                this.clearUpdates();
            }

            CodeFlyUtils.logBundleUrl(binaryJsBundleUrl);
            sIsRunningBinaryVersion = true;
            return binaryJsBundleUrl;
        }
    }

    public String getServerUrl() {
        return mServerUrl;
    }



    void invalidateCurrentInstance() {
        mCurrentInstance = null;
    }

    boolean isDebugMode() {
        return mIsDebugMode;
    }

    boolean isRunningBinaryVersion() {
        return sIsRunningBinaryVersion;
    }

    private boolean isPackageBundleLatest(JSONObject packageMetadata) {
        try {
            String packageAppVersion = packageMetadata.optString("appVersion", null);
            boolean isLatesd = (isUsingTestConfiguration() || sAppVersion.equals(packageAppVersion));
            return  isLatesd;
        } catch (NumberFormatException e) {
            throw new CodeFlyUnknownException("Error in reading binary modified date from package metadata", e);
        }
    }

    private boolean hasBinaryVersionChanged(JSONObject packageMetadata) {
        String packageAppVersion = packageMetadata.optString("appVersion", null);
        return !sAppVersion.equals(packageAppVersion);
    }



    public static void overrideAppVersion(String appVersionOverride) {
        sAppVersion = appVersionOverride;
    }

    private void rollbackPackage() {
        JSONObject failedPackage = mUpdateManager.getCurrentPackage();
        mSettingsManager.saveFailedUpdate(failedPackage);
        mUpdateManager.rollbackPackage();
        mSettingsManager.removePendingUpdate();
    }


    /* The below 3 methods are used for running tests.*/
    public static boolean isUsingTestConfiguration() {
        return sTestConfigurationFlag;
    }

    public void setDeploymentKey(String deploymentKey) {
        mDeploymentKey = deploymentKey;
    }

    public static void setUsingTestConfiguration(boolean shouldUseTestConfiguration) {
        sTestConfigurationFlag = shouldUseTestConfiguration;
    }

    public void clearUpdates() {
        mUpdateManager.clearUpdates();
        mSettingsManager.removePendingUpdate();
        mSettingsManager.removeFailedUpdates();
    }

    public static void setReactInstanceHolder(ReactInstanceHolder reactInstanceHolder) {
        mReactInstanceHolder = reactInstanceHolder;
    }

    static ReactInstanceManager getReactInstanceManager() {
        if (mReactInstanceHolder == null) {
            return null;
        }
        return mReactInstanceHolder.getReactInstanceManager();
    }

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactApplicationContext) {
        CodeFlyNativeModule CodeFlyModule = new CodeFlyNativeModule(reactApplicationContext, this, mUpdateManager, mSettingsManager);

        List<NativeModule> nativeModules = new ArrayList<>();
        nativeModules.add(CodeFlyModule);
        return nativeModules;
    }

    // Deprecated in RN v0.47.
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return new ArrayList<>();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactApplicationContext) {
        return new ArrayList<>();
    }
}
