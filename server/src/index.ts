import express from "express"
import "reflect-metadata"
import DBManager from "./database/DBManager"
import { useContainer, useExpressServer } from "routing-controllers";
import { getFromContainer, useContainer as typeOrmUseContainer } from 'typeorm';

import SportsNewsController from "./controllers/SportsNewsController"
import { Container } from "typedi/Container";
import log4js from "./utils/log4js";
import WrapResponse from "./models/response/WrapResponse";
import config from "./config";
import MatchController from "./controllers/MatchController";
import path from "path";


const app = express()
const port = 3000

useContainer(Container)
typeOrmUseContainer(Container)


app.use('/manage', express.static(path.join(__dirname, '../public')));//后台管理端


useExpressServer(app, {
    controllers: [__dirname + '/controllers/*{.js,.ts}'],
    defaultErrorHandler: false,
    middlewares: [__dirname + '/middlewares/*{.js,.ts}'],
    interceptors: [__dirname + '/interceptors/*{.js,.ts}'],
})

log4js(app)





DBManager.share().then(res => {
    // let newsController = new SportsNewsController()
    // newsController.importData()

    // let matchController = new MatchController()
    // matchController.importData()

    // matchController.importEsportsMatchList()
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
