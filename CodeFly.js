import { NativeEventEmitter } from "react-native";

let NativeCodeFly = require("react-native").NativeModules.CodeFly;



export default class CodeFly {

  /**
   * 检查更新
   * @param {*} deploymentKey 
   * @returns 
   */
  static async checkForUpdate(checkConfig = {}) {
    let { deploymentKey = null, serverUrl = "https://www.rnhotfix.xyz", encryptResponse = false } = checkConfig

    //native config
    const config = await getConfiguration()
    const native_pack_meta = await getUpdateMetadata()

    const headers = {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Encrypt": encryptResponse ? "1" : "0"
    };
    let action = "/codefly/update_check"

    if (!serverUrl) {
      serverUrl = config.serverUrl
    }

    if (!deploymentKey) {
      deploymentKey = config.deploymentKey
    }

    let requestBody = { "deployment_key": deploymentKey, "app_version": config.appVersion, "client_unique_id": config.clientUniqueId }
    const response = await fetch(serverUrl + action, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(requestBody)
    });

    if (response.status != 200) {
      throw new Error(response.statusText)
    }

    let res_json = await response.json()
    if (!res_json["success"]) {
      return null
    }
    let update_info = res_json["data"]
    let pack = new Package(update_info)
    pack.appVersion = config.appVersion;
    pack.deploymentKey = config.deploymentKey

    if (!native_pack_meta) {
      return pack;
    }
    //hash 已经使用了最新bunble
    if (native_pack_meta.packageHash == pack.packageHash && native_pack_meta.appVersion == pack.appVersion) {
      return null
    }


    return pack


  }


  /**
   * 清除更新
   */
  static clearUpdates() {
    NativeCodeFly.clearUpdates()


  }

  /**
   * 更新完毕、重启App
   */
  static restartApp(onlyIfUpdateIsPending = false) {
    NativeCodeFly.restartApp(onlyIfUpdateIsPending)

  }



}






const getConfiguration = async () => {
  let config;
  config = await NativeCodeFly.getConfiguration();
  return config;
};
const getUpdateMetadata = async () => {
  let meta = await NativeCodeFly.getUpdateMetadata()
  return meta;
}


/**
 *  
 */
export class Package {
  appVersion;
  deploymentKey;
  description;
  isMandatory;
  label;
  packageHash;
  packageSize;
  /**
   *本地加载的bundle path
   *
   * @memberof Package
   */
  bundlePath;


  downloadUrl;

  constructor(meta = {}) {
    this.downloadUrl = meta.download_url
    this.packageHash = meta.package_hash
    this.packageSize = meta.package_size
    this.isMandatory = meta.is_mandatory
    this.label = meta.label
    this.description = meta.description


  }

  /**
   * 下载远程包
   * @param {}} downloadProgressCallback 
   */
  async download(downloadProgressCallback) {

    if (!this.downloadUrl) {
      throw new Error("Cannot download an update without a download url");
    }


    let downloadProgressSubscription;


    let notifyProgress = false
    if (downloadProgressCallback) {
      const codeFlyEventEmitter = new NativeEventEmitter(NativeCodeFly);
      downloadProgressSubscription = codeFlyEventEmitter.addListener(
        "CodeFlyDownloadProgress",
        downloadProgressCallback
      )

      notifyProgress = true
    }

    try {
      const updatePackageCopy = Object.assign({}, this);
      Object.keys(updatePackageCopy).forEach((key) => (typeof updatePackageCopy[key] === 'function') && delete updatePackageCopy[key]);

      const downloadedPackage = await NativeCodeFly.downloadUpdate(updatePackageCopy, notifyProgress);
      this.bundlePath = downloadedPackage.bundlePath;
      return this
    }
    finally {
      downloadProgressSubscription && downloadProgressSubscription.remove();

    }



  }



  /**
   * 导入本地宝
   * @param {CodeFlyInstallMode} installMode 导入模式
   * @returns 
   */
  async install(installMode = CodeFlyInstallMode.IMMEDIATE, minimumBackgroundDuration = 0) {

    const localPackage = this;
    const localPackageCopy = Object.assign({}, localPackage);
    Object.keys(localPackageCopy).forEach((key) => (typeof localPackageCopy[key] === 'function') && delete localPackageCopy[key]);



    console.log("----install----");
    await NativeCodeFly.installUpdate(localPackageCopy, installMode, minimumBackgroundDuration)
    //立即重启
    NativeCodeFly.restartApp(true)
    return true

  }


}

/**
 * 导入模式
 */
const CodeFlyInstallMode = {
  IMMEDIATE: 0,
  ON_NEXT_RESTART: 1,
  ON_NEXT_RESUME: 2,
  ON_NEXT_SUSPEND: 3
}




