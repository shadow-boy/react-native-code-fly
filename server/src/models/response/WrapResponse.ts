

/**
 * 返回客户端数据模型
 */
export default class WrapResponse<T>{
    success: boolean
    code: string
    message: string
    data: T

    /**
     * 成功
     * @param data 
     */
    static success(data: any): WrapResponse<any> {
        let res = new WrapResponse()
        res.data = data
        res.code = "200"
        res.success = true
        res.message = "success"
        return res
    }
}