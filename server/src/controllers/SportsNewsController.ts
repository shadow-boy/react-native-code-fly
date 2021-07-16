import { Body, JsonController, Post } from "routing-controllers";
import { Inject } from "typedi";
import { getCustomRepository, Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions/decorators/InjectRepository";
import DBManager from "../database/DBManager";
import NewsSports, { SportsTypeEnum } from "../entity/NewsSports";
import NewsYingchao from "../entity/NewsYingchao";
import BaseReq from "../models/request/BaseReq";
import SportsNewListReq from "../models/request/news/SportsNewListReq";
import NewsSportsRepository from "../repository/NewsSportsRepository";
import NewsYingchaoRepository from "../repository/NewsYingchaoRepository";
import dataList_cba from "./news/basketball_cba";
import dataList_football from "./news/football";
import dataList_game from "./news/game";
import dataList_yinchao from "./news/yinchao";


@JsonController("/news")
export default class SportsNewsController {

    @InjectRepository()
    private newsSportsRepository: NewsSportsRepository

    @InjectRepository()
    private newsYingchaoRepository: NewsYingchaoRepository


    async importData() {

        let dataList = dataList_cba
        dataList.forEach(async (item, index) => {

            let news = new NewsSports()
            Object.assign(news, item)
            news.sportsType = SportsTypeEnum.CBA
            await news.save()
            console.log(`${index}/${dataList.length}`);


        })

    }

    @Post("/error")
    error() {
        throw new Error("默认错误")
    }

    @Post("/list")
    async newList(@Body() para: SportsNewListReq): Promise<Array<NewsSports>> {


        let news = await this.newsSportsRepository.
            createQueryBuilder("news").
            where("news.sportsType = :type",{type:para.type}).
            skip(para.page * para.size).
            take(para.size).
            getMany()
        return news

    }


    @Post("/yingchaolist")
    async newsyingchaoList(@Body() para: BaseReq): Promise<Array<NewsYingchao>> {


        let news = await this.newsYingchaoRepository.
            createQueryBuilder().
            skip(para.page * para.size).
            take(para.size).
            getMany()
        return news

    }

}