import express, { NextFunction, Request, RequestHandler, Response } from "express"
import { ExpressMiddlewareInterface, Middleware } from "routing-controllers"


@Middleware({ type: "before" })
export default class LoggingMiddleware implements ExpressMiddlewareInterface {
    use(request: Request, response: Response, next: NextFunction) {
        let date = new Date()
        let currentTime = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

        let action = request.path
        let body = request.body
        

        console.log(`${currentTime} \nmethod=${request.method} \nurl=${action} \nquery=${body} \n`);
        console.log(`---------------------------------------------------------------------------------------------------------`);

        next()
    }

}



