import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import TimeLogInterface from "./base";


@Entity()
export default class DeployPackageEntity extends BaseEntity implements TimeLogInterface {
    @Column()
    createdTime: string;
    @Column()
    modifiedTime: string;

    @PrimaryGeneratedColumn()
    id: number;

    /**
     *关联的部署对象
     *
     * @type {string}
     * @memberof DeployPackageEntity
     */
    @Column({ nullable: false })
    deployKey: string


    /**
     *下载地址
     *
     * @type {string}
     */
    @Column({ nullable: false })
    downloadUrl: string
    /**
     *是否可用
     *
     * @type {string}
     */
    @Column({ nullable: true })
    isAvailable: boolean

    /**
     * 原生app 的版本
     *
     * @type {string}
     */
    targetBinaryRange: string

    /**
     * 更新的bundle hash 必须保证 唯一性
     *
     * @type {string}
     */
    @Column({ nullable: true })
    packageHash: string
    /**
     * 显示备注 通常 v1 v2 v3 
     *
     * @type {string}
     */
    @Column({ nullable: true })
    label: string
    /**
     *包大小size
     暂时不用
     * @type {number}
     */
    @Column({ nullable: true })
    packageSize: number

    @Column({ nullable: true })
    updateAppVersion: string
    /**
     *是否强制
     */
    @Column({ nullable: true })
    isMandatory: boolean


}