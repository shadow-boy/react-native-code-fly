package com.reactnativecodefly;

import android.app.Activity;
import android.os.AsyncTask;
import android.os.Handler;
import android.os.Looper;
import android.provider.Settings;
import android.view.View;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.JSBundleLoader;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.ChoreographerCompat;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.modules.core.ReactChoreographer;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CodeFlyNativeModule extends ReactContextBaseJavaModule {
    private String mBinaryContentsHash = null;
    private LifecycleEventListener mLifecycleEventListener = null;
    private int mMinimumBackgroundDuration = 0;

    private CodeFly mCodeFly;
    private SettingsManager mSettingsManager;
    private CodeFlyUpdateManager mUpdateManager;

    private  boolean _allowed = true;
    private  boolean _restartInProgress = false;
    private  ArrayList<Boolean> _restartQueue = new ArrayList<>();

    public CodeFlyNativeModule(ReactApplicationContext reactContext, CodeFly codeFly, CodeFlyUpdateManager codeFlyUpdateManager, SettingsManager settingsManager) {
        super(reactContext);

        mCodeFly = codeFly;
        mSettingsManager = settingsManager;
        mUpdateManager = codeFlyUpdateManager;

        // Initialize module state while we have a reference to the current context.
        mBinaryContentsHash = CodeFlyUpdateUtils.getHashForBinaryContents(reactContext, mCodeFly.isDebugMode());
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();

        constants.put("CodeFlyInstallModeImmediate", CodeFlyInstallMode.IMMEDIATE.getValue());
        constants.put("CodeFlyInstallModeOnNextRestart", CodeFlyInstallMode.ON_NEXT_RESTART.getValue());
        constants.put("CodeFlyInstallModeOnNextResume", CodeFlyInstallMode.ON_NEXT_RESUME.getValue());
        constants.put("CodeFlyInstallModeOnNextSuspend", CodeFlyInstallMode.ON_NEXT_SUSPEND.getValue());


        return constants;
    }

    @Override
    public String getName() {
        return "CodeFly";
    }

    private void loadBundleLegacy() {
        final Activity currentActivity = getCurrentActivity();
        if (currentActivity == null) {
            // The currentActivity can be null if it is backgrounded / destroyed, so we simply
            // no-op to prevent any null pointer exceptions.
            return;
        }
        mCodeFly.invalidateCurrentInstance();

        currentActivity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                currentActivity.recreate();
            }
        });
    }

    // Use reflection to find and set the appropriate fields on ReactInstanceManager. See #556 for a proposal for a less brittle way
    // to approach this.
    private void setJSBundle(ReactInstanceManager instanceManager, String latestJSBundleFile) throws IllegalAccessException {
        try {
            JSBundleLoader latestJSBundleLoader;
            if (latestJSBundleFile.toLowerCase().startsWith("assets://")) {
                latestJSBundleLoader = JSBundleLoader.createAssetLoader(getReactApplicationContext(), latestJSBundleFile, false);
            } else {
                latestJSBundleLoader = JSBundleLoader.createFileLoader(latestJSBundleFile);
            }

            Field bundleLoaderField = instanceManager.getClass().getDeclaredField("mBundleLoader");
            bundleLoaderField.setAccessible(true);
            bundleLoaderField.set(instanceManager, latestJSBundleLoader);
        } catch (Exception e) {
            CodeFlyUtils.log("Unable to set JSBundle - CodeFly may not support this version of React Native");
            throw new IllegalAccessException("Could not setJSBundle");
        }
    }

    private void loadBundle() {
        clearLifecycleEventListener();
        try {
            mCodeFly.clearDebugCacheIfNeeded(resolveInstanceManager());
        } catch(Exception e) {
            // If we got error in out reflection we should clear debug cache anyway.
            mCodeFly.clearDebugCacheIfNeeded(null);
        }

        try {
            // #1) Get the ReactInstanceManager instance, which is what includes the
            //     logic to reload the current React context.
            final ReactInstanceManager instanceManager = resolveInstanceManager();
            if (instanceManager == null) {
                return;
            }

            String latestJSBundleFile = mCodeFly.getJSBundleFileInternal(mCodeFly.getAssetsBundleFileName());

            // #2) Update the locally stored JS bundle file path
            setJSBundle(instanceManager, latestJSBundleFile);

            // #3) Get the context creation method and fire it on the UI thread (which RN enforces)
            new Handler(Looper.getMainLooper()).post(new Runnable() {
                @Override
                public void run() {
                    try {
                        // We don't need to resetReactRootViews anymore
                        // due the issue https://github.com/facebook/react-native/issues/14533
                        // has been fixed in RN 0.46.0
                        //resetReactRootViews(instanceManager);

                        instanceManager.recreateReactContextInBackground();
                    } catch (Exception e) {
                        // The recreation method threw an unknown exception
                        // so just simply fallback to restarting the Activity (if it exists)
                        loadBundleLegacy();
                    }
                }
            });

        } catch (Exception e) {
            // Our reflection logic failed somewhere
            // so fall back to restarting the Activity (if it exists)
            CodeFlyUtils.log("Failed to load the bundle, falling back to restarting the Activity (if it exists). " + e.getMessage());
            loadBundleLegacy();
        }
    }

    // This workaround has been implemented in order to fix https://github.com/facebook/react-native/issues/14533
    // resetReactRootViews allows to call recreateReactContextInBackground without any exceptions
    // This fix also relates to https://github.com/microsoft/react-native-code-push/issues/878
    private void resetReactRootViews(ReactInstanceManager instanceManager) throws NoSuchFieldException, IllegalAccessException {
        Field mAttachedRootViewsField = instanceManager.getClass().getDeclaredField("mAttachedRootViews");
        mAttachedRootViewsField.setAccessible(true);
        List<ReactRootView> mAttachedRootViews = (List<ReactRootView>)mAttachedRootViewsField.get(instanceManager);
        for (ReactRootView reactRootView : mAttachedRootViews) {
            reactRootView.removeAllViews();
            reactRootView.setId(View.NO_ID);
        }
        mAttachedRootViewsField.set(instanceManager, mAttachedRootViews);
    }

    private void clearLifecycleEventListener() {
        // Remove LifecycleEventListener to prevent infinite restart loop
        if (mLifecycleEventListener != null) {
            getReactApplicationContext().removeLifecycleEventListener(mLifecycleEventListener);
            mLifecycleEventListener = null;
        }
    }

    // Use reflection to find the ReactInstanceManager. See #556 for a proposal for a less brittle way to approach this.
    private ReactInstanceManager resolveInstanceManager() throws NoSuchFieldException, IllegalAccessException {
        ReactInstanceManager instanceManager = CodeFly.getReactInstanceManager();
        if (instanceManager != null) {
            return instanceManager;
        }

        final Activity currentActivity = getCurrentActivity();
        if (currentActivity == null) {
            return null;
        }

        ReactApplication reactApplication = (ReactApplication) currentActivity.getApplication();
        instanceManager = reactApplication.getReactNativeHost().getReactInstanceManager();

        return instanceManager;
    }

    private void restartAppInternal(boolean onlyIfUpdateIsPending) {
        if (this._restartInProgress) {
            CodeFlyUtils.log("Restart request queued until the current restart is completed");
            this._restartQueue.add(onlyIfUpdateIsPending);
            return;
        } else if (!this._allowed) {
            CodeFlyUtils.log("Restart request queued until restarts are re-allowed");
            this._restartQueue.add(onlyIfUpdateIsPending);
            return;
        }

        this._restartInProgress = true;
        if (!onlyIfUpdateIsPending || mSettingsManager.isPendingUpdate(null)) {
            loadBundle();
            CodeFlyUtils.log("Restarting app");
            return;
        }

        this._restartInProgress = false;
        if (this._restartQueue.size() > 0) {
            boolean buf = this._restartQueue.get(0);
            this._restartQueue.remove(0);
            this.restartAppInternal(buf);
        }
    }

    @ReactMethod
    public void allow(Promise promise) {
        CodeFlyUtils.log("Re-allowing restarts");
        this._allowed = true;

        if (_restartQueue.size() > 0) {
            CodeFlyUtils.log("Executing pending restart");
            boolean buf = this._restartQueue.get(0);
            this._restartQueue.remove(0);
            this.restartAppInternal(buf);
        }

        promise.resolve(null);
        return;
    }

    @ReactMethod
    public void clearPendingRestart(Promise promise) {
        this._restartQueue.clear();
        promise.resolve(null);
        return;
    }

    @ReactMethod
    public void disallow(Promise promise) {
        CodeFlyUtils.log("Disallowing restarts");
        this._allowed = false;
        promise.resolve(null);
        return;
    }

    @ReactMethod
    public void restartApp(boolean onlyIfUpdateIsPending, Promise promise) {
        try {
            restartAppInternal(onlyIfUpdateIsPending);
            promise.resolve(null);
        } catch(CodeFlyUnknownException e) {
            CodeFlyUtils.log(e);
            promise.reject(e);
        }
    }

    @ReactMethod
    public void downloadUpdate(final ReadableMap updatePackage, final boolean notifyProgress, final Promise promise) {
        AsyncTask<Void, Void, Void> asyncTask = new AsyncTask<Void, Void, Void>() {
            @Override
            protected Void doInBackground(Void... params) {
                try {
                    JSONObject mutableUpdatePackage = CodeFlyUtils.convertReadableToJsonObject(updatePackage);
                    mUpdateManager.downloadPackage(mutableUpdatePackage, mCodeFly.getAssetsBundleFileName(), new DownloadProgressCallback() {
                        private boolean hasScheduledNextFrame = false;
                        private DownloadProgress latestDownloadProgress = null;

                        @Override
                        public void call(DownloadProgress downloadProgress) {
                            if (!notifyProgress) {
                                return;
                            }

                            latestDownloadProgress = downloadProgress;
                            // If the download is completed, synchronously send the last event.
                            if (latestDownloadProgress.isCompleted()) {
                                dispatchDownloadProgressEvent();
                                return;
                            }

                            if (hasScheduledNextFrame) {
                                return;
                            }

                            hasScheduledNextFrame = true;
                            getReactApplicationContext().runOnUiQueueThread(new Runnable() {
                                @Override
                                public void run() {
                                    ReactChoreographer.getInstance().postFrameCallback(ReactChoreographer.CallbackType.TIMERS_EVENTS, new ChoreographerCompat.FrameCallback() {
                                        @Override
                                        public void doFrame(long frameTimeNanos) {
                                            if (!latestDownloadProgress.isCompleted()) {
                                                dispatchDownloadProgressEvent();
                                            }

                                            hasScheduledNextFrame = false;
                                        }
                                    });
                                }
                            });
                        }

                        public void dispatchDownloadProgressEvent() {
                            getReactApplicationContext()
                                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                                    .emit(CodeFlyConstants.DOWNLOAD_PROGRESS_EVENT_NAME, latestDownloadProgress.createWritableMap());
                        }
                    }, mCodeFly.getPublicKey());

                    JSONObject newPackage = mUpdateManager.getPackage(CodeFlyUtils.tryGetString(updatePackage, CodeFlyConstants.PACKAGE_HASH_KEY));
                    promise.resolve(CodeFlyUtils.convertJsonObjectToWritable(newPackage));
                } catch (CodeFlyInvalidUpdateException e) {
                    CodeFlyUtils.log(e);
                    mSettingsManager.saveFailedUpdate(CodeFlyUtils.convertReadableToJsonObject(updatePackage));
                    promise.reject(e);
                } catch (IOException | CodeFlyUnknownException e) {
                    CodeFlyUtils.log(e);
                    promise.reject(e);
                }

                return null;
            }
        };

        asyncTask.executeOnExecutor(AsyncTask.THREAD_POOL_EXECUTOR);
    }

    @ReactMethod
    public void getConfiguration(Promise promise) {
        try {
            WritableMap configMap =  Arguments.createMap();
            configMap.putString("appVersion", mCodeFly.getAppVersion());
            configMap.putString("clientUniqueId", "this is fake id for avoid to submit android software market in china");
            configMap.putString("deploymentKey", mCodeFly.getDeploymentKey());
            configMap.putString("serverUrl", mCodeFly.getServerUrl());

            // The binary hash may be null in debug builds
            if (mBinaryContentsHash != null) {
                configMap.putString(CodeFlyConstants.PACKAGE_HASH_KEY, mBinaryContentsHash);
            }

            promise.resolve(configMap);
        } catch(CodeFlyUnknownException e) {
            CodeFlyUtils.log(e);
            promise.reject(e);
        }
    }

    @ReactMethod
    public void getUpdateMetadata(Promise promise) {
        AsyncTask<Void, Void, Void> asyncTask = new AsyncTask<Void, Void, Void>() {
            @Override
            protected Void doInBackground(Void... params) {
                try {
                    JSONObject currentPackage = mUpdateManager.getCurrentPackage();

                    if (currentPackage == null) {
                        promise.resolve(null);
                        return null;
                    }

                  promise.resolve(CodeFlyUtils.convertJsonObjectToWritable(currentPackage));


                } catch (CodeFlyMalformedDataException e) {
                    // We need to recover the app in case 'codefly.json' is corrupted
                    CodeFlyUtils.log(e.getMessage());
                    clearUpdates();
                    promise.resolve(null);
                } catch(CodeFlyUnknownException e) {
                    CodeFlyUtils.log(e);
                    promise.reject(e);
                }

                return null;
            }
        };

        asyncTask.executeOnExecutor(AsyncTask.THREAD_POOL_EXECUTOR);
    }

    @ReactMethod
    public void installUpdate(final ReadableMap updatePackage, final int installMode, final int minimumBackgroundDuration, final Promise promise) {
        AsyncTask<Void, Void, Void> asyncTask = new AsyncTask<Void, Void, Void>() {
            @Override
            protected Void doInBackground(Void... params) {
                try {
                    mUpdateManager.installPackage(CodeFlyUtils.convertReadableToJsonObject(updatePackage), mSettingsManager.isPendingUpdate(null));

                    String pendingHash = CodeFlyUtils.tryGetString(updatePackage, CodeFlyConstants.PACKAGE_HASH_KEY);
                    if (pendingHash == null) {
                        throw new CodeFlyUnknownException("Update package to be installed has no hash.");
                    } else {
                        mSettingsManager.savePendingUpdate(pendingHash, /* isLoading */false);
                    }

                    if (installMode == CodeFlyInstallMode.ON_NEXT_RESUME.getValue() ||
                        // We also add the resume listener if the installMode is IMMEDIATE, because
                        // if the current activity is backgrounded, we want to reload the bundle when
                        // it comes back into the foreground.
                        installMode == CodeFlyInstallMode.IMMEDIATE.getValue() ||
                        installMode == CodeFlyInstallMode.ON_NEXT_SUSPEND.getValue()) {

                        // Store the minimum duration on the native module as an instance
                        // variable instead of relying on a closure below, so that any
                        // subsequent resume-based installs could override it.
                        CodeFlyNativeModule.this.mMinimumBackgroundDuration = minimumBackgroundDuration;

                        if (mLifecycleEventListener == null) {
                            // Ensure we do not add the listener twice.
                            mLifecycleEventListener = new LifecycleEventListener() {
                                private Date lastPausedDate = null;
                                private Handler appSuspendHandler = new Handler(Looper.getMainLooper());
                                private Runnable loadBundleRunnable = new Runnable() {
                                    @Override
                                    public void run() {
                                        CodeFlyUtils.log("Loading bundle on suspend");
                                        restartAppInternal(false);
                                    }
                                };

                                @Override
                                public void onHostResume() {
                                    appSuspendHandler.removeCallbacks(loadBundleRunnable);
                                    // As of RN 36, the resume handler fires immediately if the app is in
                                    // the foreground, so explicitly wait for it to be backgrounded first
                                    if (lastPausedDate != null) {
                                        long durationInBackground = (new Date().getTime() - lastPausedDate.getTime()) / 1000;
                                        if (installMode == CodeFlyInstallMode.IMMEDIATE.getValue()
                                                || durationInBackground >= CodeFlyNativeModule.this.mMinimumBackgroundDuration) {
                                            CodeFlyUtils.log("Loading bundle on resume");
                                            restartAppInternal(false);
                                        }
                                    }
                                }

                                @Override
                                public void onHostPause() {
                                    // Save the current time so that when the app is later
                                    // resumed, we can detect how long it was in the background.
                                    lastPausedDate = new Date();

                                    if (installMode == CodeFlyInstallMode.ON_NEXT_SUSPEND.getValue() && mSettingsManager.isPendingUpdate(null)) {
                                        appSuspendHandler.postDelayed(loadBundleRunnable, minimumBackgroundDuration * 1000);
                                    }
                                }

                                @Override
                                public void onHostDestroy() {
                                }
                            };

                            getReactApplicationContext().addLifecycleEventListener(mLifecycleEventListener);
                        }
                    }

                    promise.resolve("");
                } catch(CodeFlyUnknownException e) {
                    CodeFlyUtils.log(e);
                    promise.reject(e);
                }

                return null;
            }
        };

        asyncTask.executeOnExecutor(AsyncTask.THREAD_POOL_EXECUTOR);
    }

    @ReactMethod
    public void isFailedUpdate(String packageHash, Promise promise) {
        try {
            promise.resolve(mSettingsManager.isFailedHash(packageHash));
        } catch (CodeFlyUnknownException e) {
            CodeFlyUtils.log(e);
            promise.reject(e);
        }
    }


    @ReactMethod
    public void isFirstRun(String packageHash, Promise promise) {
        try {
            boolean isFirstRun = mCodeFly.didUpdate()
                    && packageHash != null
                    && packageHash.length() > 0
                    && packageHash.equals(mUpdateManager.getCurrentPackageHash());
            promise.resolve(isFirstRun);
        } catch(CodeFlyUnknownException e) {
            CodeFlyUtils.log(e);
            promise.reject(e);
        }
    }

    @ReactMethod
    public void notifyApplicationReady(Promise promise) {
        try {
            mSettingsManager.removePendingUpdate();
            promise.resolve("");
        } catch(CodeFlyUnknownException e) {
            CodeFlyUtils.log(e);
            promise.reject(e);
        }
    }



    @ReactMethod
    // Replaces the current bundle with the one downloaded from removeBundleUrl.
    // It is only to be used during tests. No-ops if the test configuration flag is not set.
    public void downloadAndReplaceCurrentBundle(String remoteBundleUrl) {
        try {
            if (mCodeFly.isUsingTestConfiguration()) {
                try {
                    mUpdateManager.downloadAndReplaceCurrentBundle(remoteBundleUrl, mCodeFly.getAssetsBundleFileName());
                } catch (IOException e) {
                    throw new CodeFlyUnknownException("Unable to replace current bundle", e);
                }
            }
        } catch(CodeFlyUnknownException | CodeFlyMalformedDataException e) {
            CodeFlyUtils.log(e);
        }
    }

    /**
     * This method clears CodeFly's downloaded updates.
     * It is needed to switch to a different deployment if the current deployment is more recent.
     * Note: we don’t recommend to use this method in scenarios other than that (CodeFly will call
     * this method automatically when needed in other cases) as it could lead to unpredictable
     * behavior.
     */
    @ReactMethod
    public void clearUpdates() {
        CodeFlyUtils.log("Clearing updates.");
        mCodeFly.clearUpdates();
    }
}
