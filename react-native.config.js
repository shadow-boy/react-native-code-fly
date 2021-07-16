module.exports = {
    dependency: {
        platforms: {
            android: {
                packageInstance:
                    "new CodeFly(getResources().getString(R.string.CodeFlyDeploymentKey), getApplicationContext(), BuildConfig.DEBUG, getResources().getString(R.string.CodeFlyServerURL))"
            }
        }
    }
};
