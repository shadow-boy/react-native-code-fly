import { Service } from "typedi";
import { EntityRepository, Repository } from "typeorm";
import NewsYingchao from "../entity/NewsYingchao";


@Service()
@EntityRepository(NewsYingchao)
export default class NewsYingchaoRepository extends Repository<NewsYingchao>{

}