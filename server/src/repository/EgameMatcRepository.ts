import { EntityRepository, Repository } from "typeorm";
import EgameMatchEntity from "../entity/EgameMatchEntity";


@EntityRepository(EgameMatchEntity)
export default class EgameMatcRepository extends Repository<EgameMatchEntity>{

}