import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";
import TimeLogInterface from "./base";


export enum SportsTypeEnum {
    CBA = "CBA",
    FOOTBALL = "FOOTBALL",
    EGAME = "EGAME"
}

@Entity()
export default class NewsSports extends BaseEntity implements TimeLogInterface {

    @Column({ type: "enum", default: SportsTypeEnum.CBA, enum: SportsTypeEnum })
    sportsType: SportsTypeEnum

    @CreateDateColumn()
    createdTime: string;
    @UpdateDateColumn()
    modifiedTime: string;

    @PrimaryGeneratedColumn()
    newId: string

    @Column({unique:true})
    id: string

    @Column("text")
    uinnick: string


    @Column()
    uinname: string

    @Column()
    abstract: string

    @Column()
    title: string


    @Column()
    surl: string


    @Column()
    weiboid: string


    @Column()
    commentid: string


    @Column()
    url: string


    @Column()
    time: string


    @Column()
    timestamp: number


    @Column()
    articletype: string


    @Column("simple-array")
    thumbnails: string[]


    @Column()
    qishu: string


    @Column()
    source: string


    @Column()
    imagecount: number

    @Column()
    comment: string


    @Column()
    flag: string


    @Column("simple-array")
    tag: string[]


    @Column()
    videoTotalTime: string


    @Column("simple-array")
    thumbnails_qqnews: string[]


    @Column()
    voteId: string


    @Column()
    voteNum: string



    @Column()
    origUrl: string

    @Column()
    graphicLiveID: string
}