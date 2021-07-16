import { EntityRepository, Repository } from "typeorm";
import DeployEntity from "../entity/DeployEntity";

@EntityRepository(DeployEntity)
export default class DeployRepository extends Repository<DeployEntity>{

}