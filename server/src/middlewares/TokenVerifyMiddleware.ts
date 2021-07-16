import express, { NextFunction, Request, RequestHandler, Response } from "express"
import { ExpressMiddlewareInterface, Middleware } from "routing-controllers"
import JWTUtils from "../utils/jwt"


const unlessTokenVerifyPaths = ["/user/login", "/user/appLogin", "/codefly/update_check"]

@Middleware({ type: "before" })
export default class TokenVerifyMiddleware {
    use(request: Request, response: Response, next: NextFunction) {


        // next()
        // return

        if (unlessTokenVerifyPaths.indexOf(request.path) > -1) {
            next()
            return
        }

        let authorization = request.headers.authorization
        if (!authorization) {
            let error = new Error("未登录")
            next(error)
            return
        }

        let user = JWTUtils.decode(authorization)

        if (!user) {
            let error = new Error("authorization校验失败")

            next(error)
            return
        }

        next()


    }
}