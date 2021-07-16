import { EntityRepository, Repository } from "typeorm";
import DeployPackageEntity from "../entity/DeployPackageEntity";

@EntityRepository(DeployPackageEntity)
export default class DeployPackageRepository extends Repository<DeployPackageEntity>{
    
}