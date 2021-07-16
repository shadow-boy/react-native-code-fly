import { EntityRepository, Repository } from "typeorm";
import MatchEntity from "../entity/MatchEntity";


@EntityRepository(MatchEntity)
export default class MatchRepository extends Repository<MatchEntity>
{

}