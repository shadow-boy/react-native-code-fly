export default class CommonUtils {
    /**
     * 下划线转驼峰
     * @param name 
     * @returns 
     */
    static toHump(name: string) {
        return name.replace(/\_(\w)/g, function (all, letter) {
            return letter.toUpperCase();
        });
    }

    /**
     * 驼峰转下划线
     * @param name 
     * @returns 
     */
    static toLine(name: string) {
        return name.replace(/([A-Z])/g, "_$1").toLowerCase();
    }

    /**
     *  转化object 属性为驼峰
     * @param ojb 
     * @returns 
     */
    static convertObjectPropertytoHump(ojb: Object) {
        let ret = {}
        Object.keys(ojb).forEach((key) => {
            ret[CommonUtils.toHump(key)] = ojb[key]
        })
        return ret
    }

    /**
     *  转化object 属性为 下划线
     * @param ojb 
     * @returns 
     */
    static convertObjectPropertytoLine(ojb: Object) {
        let ret = {}
        Object.keys(ojb).forEach((key) => {
            ret[CommonUtils.toLine(key)] = ojb[key]
        })
        return ret
    }
}
