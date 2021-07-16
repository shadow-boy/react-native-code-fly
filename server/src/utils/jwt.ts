import jwt, { SignOptions, VerifyOptions } from 'jsonwebtoken'
import config from '../config'

const { jwtSecret } = config

/**
 * token 生成字段参数
 */
export interface TokenUser {
  user_id: string
  user_name: string
  user_password: string
}


/**
 * jwt编码解码工具
 */
export default class JWTUtils {
  /**
   * jwt编码
   * @param data 
   */
  static encode(data: TokenUser): string {

    let signOptions: SignOptions = { expiresIn: "7d", algorithm: 'HS256' }
    return jwt.sign(data, jwtSecret, signOptions);
  }
  /**
   * jwt解码
   * @param token 
   */
  static decode(token: string): TokenUser {
    try {
      let verifyOptions: VerifyOptions = { algorithms: ["HS256"] }
      return jwt.verify(token, jwtSecret, verifyOptions) as TokenUser
    } catch (e) {
      console.log(`jwt_decode_error --`, e)
      return null
    }
  }
}

