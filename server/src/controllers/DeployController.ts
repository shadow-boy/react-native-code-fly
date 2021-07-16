
import { Body, JsonController, Post } from "routing-controllers";
import { createQueryBuilder, FindManyOptions } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import DBManager from "../database/DBManager";
import DeployEntity from "../entity/DeployEntity";
import DeployPackageEntity from "../entity/DeployPackageEntity";
import DeployPackageRepository from "../repository/DeployPackageRepository";
import DeployRepository from "../repository/DeployRepository";

export class DeployCreateRequest {
    appName: string
    isProduct: boolean
}

export class PackageUpdateRequest {
    deployKey: string
    downloadUrl: string
    isAvailable: string
    targetBinaryRange: string
    packageHash: string
    label: string
    packageSize: number

    updateAppVersion: string
    isMandatory: boolean
}


export class QueryBundleRequest {
    deployKey: string
}
/**
 * 返回的数据结构
 */
export class ResBundleDto extends DeployPackageEntity {
    appName: string
    isProduct: boolean

}





@JsonController("/deploy")
export default class DeployController {
    @InjectRepository()
    deployRepository: DeployRepository

    @InjectRepository()
    packageRepository: DeployPackageRepository

    /**
     * 添加一个部署
     * @param request  
     * @returns 
     */
    @Post("/addDeploy")
    async addDeploy(@Body() request: DeployCreateRequest) {
        let entity = new DeployEntity()
        entity.appName = request.appName
        entity.createdTime = (new Date().getTime()).toString()
        entity.modifiedTime = (new Date().getTime()).toString()
        entity.isProduct = request.isProduct
        entity.deployKey = Math.random().toString(36).slice(-10) + Math.random().toString(36).slice(-10);
        return await entity.save()
    }

    /**
     * 查询部署deploy
     * @returns 
     */
    @Post("/queryDeployList")
    async queryDeploy() {
        let res = await this.deployRepository.find()
        return res
    }

    @Post("/queryBundleList")
    async queryBundleList(@Body() request: QueryBundleRequest): Promise<Array<ResBundleDto>> {
        // let list = await this.packageRepository.find({ deployKey: request.deployKey })
        // return list

        // let list = (await DBManager.share()).createQueryBuilder(DeployPackageEntity, "dpackage")
        //     // .leftJoinAndSelect("deploy_entity", "d", "d.deployKey = :deployKeyLink", { deployKeyLink: request.deployKey })
        //     .leftJoinAndSelect("deploy_entity", "d", "d.deployKey = :deployKeyLink", { deployKeyLink: request.deployKey })

        //     .where("dpackage.deployKey = :deployKey", { deployKey: request.deployKey })
        //     .getMany();

        // let sql = `SELECT dp.*, d.appName,d.isProduct FROM deploy_package_entity dp LEFT JOIN deploy_entity d ON dp.deployKey=d.deployKey WHERE dp.deployKey = '${request.deployKey}';`
        let sql = `SELECT dp.*, d.appName,d.isProduct FROM deploy_package_entity dp LEFT JOIN deploy_entity d ON dp.deployKey=d.deployKey WHERE dp.deployKey = ? ORDER BY createdTime DESC;`

        let newlist = await (await DBManager.share()).query(sql, [request.deployKey])

        return newlist


    }


    /**
     *  更新包
     */
    @Post("/updateBundle")
    async updateBundle(@Body() request: PackageUpdateRequest) {
        let entity = new DeployPackageEntity()
        entity.createdTime = (new Date().getTime()).toString()
        entity.modifiedTime = (new Date().getTime()).toString()
        entity.downloadUrl = request.downloadUrl
        entity.deployKey = request.deployKey
        entity.isAvailable = true
        entity.label = request.label
        entity.packageHash = request.packageHash
        entity.packageSize = request.packageSize
        entity.isMandatory = request.isMandatory
        entity.updateAppVersion = request.updateAppVersion
        entity.targetBinaryRange = request.targetBinaryRange
        return await entity.save()


    }


    /**
    *  更新包
    */
    @Post("/deleteBundle")
    async deleteBundle(@Body() request: { id: number }) {
        let entity = new DeployPackageEntity()
        this.packageRepository.delete({
            id: request.id
        })
        return true


    }









}

