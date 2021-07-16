import { JsonController, Post, Res } from "routing-controllers";
import { InjectRepository } from "typeorm-typedi-extensions";
import EgameMatchEntity from "../entity/EgameMatchEntity";
import MatchEntity from "../entity/MatchEntity";
import EgameMatcRepository from "../repository/EgameMatcRepository";
import MatchRepository from "../repository/MatchRepository";
import EsportsMatchList from "./match/Esports";
import gameList from "./match/match";


@JsonController("/match")
export default class MatchController {

    @InjectRepository()
    matchRepository: MatchRepository
    @InjectRepository()
    egameMatcRepository: EgameMatcRepository

    /**
     * 导入体育比赛
     */
    async importData() {

        let allMatch: Array<MatchEntity> = []
        Object.values(gameList).forEach(arr => {
            arr.forEach(item => {
                allMatch.push(item)
            })
        })
        allMatch.forEach(async (item, index) => {
            let entity = new MatchEntity()
            Object.assign(entity, item)
            await entity.save()
            console.log(`${index}/${allMatch.length}`);

        })

    }

    /**
     * 导入电子竞技比赛
     */
    async importEsportsMatchList() {
        EsportsMatchList.forEach(async (item, index) => {

            let entity = new EgameMatchEntity()
            Object.assign(entity, item)
            await entity.save()
            console.log(`${index}/${EsportsMatchList.length}`);

        })
    }


    @Post("/list")
    async matchList(): Promise<Array<MatchEntity>> {
        let list = await this.matchRepository.find()
        return list
    }
    @Post("/egameList")
    async egameMatchList(): Promise<Array<EgameMatchEntity>> {
        let list = await this.egameMatcRepository.find()
        return list
    }


}