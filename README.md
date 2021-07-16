# react-native-code-fly

## 中国版code-push （私有化部署服务端）

## 安装

```sh
yarn add react-native-code-fly@https://github.com/shadow-boy/react-native-code-fly
```

## 用法

```js
import CodeFly from "react-native-code-fly";

// ...

CodeFly.checkForUpdate().then(async remote_pack => {
      console.log(`remote_pack----${remote_pack}`);
      if (remote_pack) {
        let local_package = await remote_pack.download(({ receivedBytes, totalBytes }) => {
          let progress = Number(receivedBytes) / Number(totalBytes);
          console.log(`progress---${progress.toFixed(2)}`);

        })
        if (local_package) {
          local_package.install()
        }

      }

    }).catch(error => {
    })
```

## JS bundle 打包脚本 自行上传到私有bundle包部署后台

```
  "bunldle-android": "react-native bundle --assets-dest ./out/android/bundle --bundle-output ./out/android/bundle/index.android.bundle --dev false --entry-file index.tsx --platform android",
    "bundle-ios": "react-native bundle --entry-file index.tsx --platform ios  --dev false --bundle-output ./out/ios/bundle/index.jsbundle --assets-dest ./out/ios/bundle"
```

## 原生端配置
### android原生配置
`build.gradle`
```
buildTypes {
    debug {
      signingConfig signingConfigs.debug
      resValue "string", "CodeFlyDeploymentKey", '"#{CodeFlyDeploymentKey}"'
      resValue "string", "CodeFlyServerURL", '"#{CodeFlyServerURL}"'



    }
    release {
      resValue "string", "CodeFlyDeploymentKey", '"#{CodeFlyDeploymentKey}"'
      resValue "string", "CodeFlyServerURL", '"#{CodeFlyServerURL}"'


      // Caution! In production, you need to generate your own keystore file.
      // see https://reactnative.dev/docs/signed-apk-android.
      signingConfig signingConfigs.release
      minifyEnabled enableProguardInReleaseBuilds
      proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
    }
  }
```
#### 如果配置了 'productFlavors' 则需要不同渠道中配置
```
 version_test {
            buildConfigField "int", "ENV_TYPE", "2"
            applicationId 'applicationId'
            dimension "version"
            manifestPlaceholders = [
                   ...

            ]
            resValue("string", "CodeFlyDeploymentKey", "999ntr9j8rcragibxnzj")

        }
```

配置sourceSets
```
 sourceSets {
        version_test.res.srcDirs = ['src/main/res-flavors/version_test']
        version_pro.res.srcDirs = ['src/main/res-flavors/version_pro']
    }
```


#### 最后在MAinApplication中配置
`MainApplication.java`
```
 protected String getJSBundleFile() {
        String bundleFile = CodeFly.getJSBundleFile();
         return bundleFile;
      }
```

### ios原生配置
`info.plist`

```
	<key>CodeFlyDeploymentKey</key>
	<string>#{CodeFlyDeploymentKey}</string>
	<key>CodeFlyServerURL</key>
	<string>#{CodeFlyServerURL}</string>
```
`AppDelegate.m`
```
#import "CodeFly.h"
//...

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge{
#if DEBUG
 //...
#else
  NSURL * url_code_fly =  [CodeFly bundleURLForResource:@"index"];
  if (url_code_fly){
    return  url_code_fly;
  }
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}
```





