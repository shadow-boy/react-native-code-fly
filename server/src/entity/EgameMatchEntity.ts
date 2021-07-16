import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm"
import TimeLogInterface from "./base"


@Entity()
export default class EgameMatchEntity extends BaseEntity implements TimeLogInterface {

    @CreateDateColumn()
    createdTime: string;
    @UpdateDateColumn()
    modifiedTime: string;

    /// 

    @PrimaryColumn()
    matchId: string

    /// 完美世界S2
    @Column({ nullable: true })
    tournamentName: string

    /// 
    @Column({ nullable: true })
    tournamentId: string

    /// 
    @Column({ nullable: true })
    tournamentNameEn: string

    /// 完美世界S2
    @Column({ nullable: true })
    tournamentNameZh: string

    /// 
    @Column({ nullable: true })
    homeName: string

    /// 
    @Column({ nullable: true })
    homeLogo: string

    /// 
    @Column({ nullable: true })
    homeScore: string

    /// 
    @Column({ nullable: true })
    homeId: string

    /// 
    @Column({ nullable: true })
    awayName: string

    /// 
    @Column({ nullable: true })
    awayLogo: string

    /// 
    @Column({ nullable: true })
    awayScore: string

    /// 
    @Column({ nullable: true })
    awayId: string

    /// 
    @Column({ nullable: true })
    box: string

    /// 
    @Column({ nullable: true })
    boxNum: string

    /// 
    @Column({ nullable: true })
    status: string

    /// 
    @Column({ nullable: true })
    matchTime: string

    /// 

    @Column("simple-json",{nullable:true})
    home: JSON

    /// 
    @Column("simple-json",{nullable:true})
    away: JSON

    /// 
    @Column({ nullable: true })
    isFocus: string

    /// 
    @Column({ nullable: true })
    isBp: string

    /// 
    @Column("simple-json",{nullable:true})
    timer: JSON

    /// 
    @Column({ nullable: true })
    isLive: string

    /// 
    @Column({ nullable: true })
    mapName: string
}
