
import express, { ErrorRequestHandler, NextFunction, Request, RequestHandler, Response } from "express"
import { ExpressErrorMiddlewareInterface, Middleware } from "routing-controllers";
import WrapResponse from "../models/response/WrapResponse";

@Middleware({ type: "after" })
export default class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
    public error(error: Error, request: Request, response: Response, next: NextFunction): void {
        console.log(error);
        let resError = new WrapResponse()
        
        resError.code = "0"
        resError.success = false
        resError.message = error.message
        response.send(resError)
        next(error)
    }

}