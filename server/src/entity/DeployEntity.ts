import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import TimeLogInterface from "./base";
/**
 *部署app deploy
 */
@Entity()
export default class DeployEntity extends BaseEntity implements TimeLogInterface {
    @Column()
    createdTime: string;
    @Column()
    modifiedTime: string;
    @PrimaryGeneratedColumn()
    id: number;


    /**
     * 部署的App
     *
     * @type {string}
     * @memberof DeployEntity
     */
    @Column({ nullable: false })
    appName: string

    /**
     *部署的key
     *
     * @type {string}
     * @memberof DeployEntity
     */
    @Column({ nullable: false,unique:true })

    deployKey: string

    /**
     *是否生产环境
     *
     * @type {boolean}
     * @memberof DeployEntity
     */
    @Column()
    isProduct: boolean


}