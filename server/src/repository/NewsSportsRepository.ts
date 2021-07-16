import { ExpressDriver } from "routing-controllers";
import { Service } from "typedi";
import { EntityRepository, Repository } from "typeorm";
import NewsSports from "../entity/NewsSports";

// @Service()
@EntityRepository(NewsSports)
export default class NewsSportsRepository extends Repository<NewsSports>{

}