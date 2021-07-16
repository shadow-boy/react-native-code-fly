import { IsEmail, MinLength } from "class-validator"
import { Request, Response } from "express"
import { Body, BodyParam, JsonController, Post, QueryParams, Req, Res } from "routing-controllers"
import ExampleService from "../services/ExampleService"
import JWTUtils, { TokenUser } from "../utils/jwt"


export class User {
    name: string
    sex: string
    age: number
}

export class CheckUser {
    @IsEmail()
    email: string

    @MinLength(6)
    password: string
}


@JsonController("/user")
export default class UserController {
    constructor(private exampleService: ExampleService) { }

    @Post("/add")
    async add(@Req() req: Request, @Res() res: Response) {
        return req.query
    }
    @Post('/notice')
    async notice(@Body() user: User) {
        return user

    }
    @Post("/login")
    async login(@Body() user: CheckUser, @Res() res: Response) {
        this.exampleService.printMessage()
        if (user.email != "lanster.wang@hrpackage.com" && user.password != "lanterwang_315") {
            throw new Error("账号密码错误")
            return
        }
        let user_token: TokenUser = {
            user_id: "0",
            user_name: user.email,
            user_password: user.password
        }
        let token = JWTUtils.encode(user_token)
        console.log(token);

        res.setHeader("Authorization", token)
        return user

    }

    @Post("/appLogin")
    async appLogin(@Body() user: TokenUser, @Res() res: Response) {
        user.user_id = "0"
        let token = JWTUtils.encode(user)
        res.setHeader("Authorization", token)


        return user

    }

}

