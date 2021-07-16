
import { Interceptor, InterceptorInterface, Action } from 'routing-controllers';
import WrapResponse from '../models/response/WrapResponse';

/**
 * 统一返回数据格式拦截器
 */
@Interceptor()
export default class FormatResponseInterceptor implements InterceptorInterface {
    intercept(action: Action, content: any) {
        return WrapResponse.success(content)
    }
}