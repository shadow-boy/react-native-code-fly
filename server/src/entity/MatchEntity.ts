import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import TimeLogInterface from "./base";


@Entity()
export default class MatchEntity extends BaseEntity implements TimeLogInterface {


    @CreateDateColumn()
    createdTime: string;
    @UpdateDateColumn()
    modifiedTime: string;


    @PrimaryColumn()
    game_id: number


    @Column({ nullable: true })
    pre_game_id: string


    @Column({ nullable: true })
    pre_home_id: string


    @Column({ nullable: true })
    pre_away_id: string


    @Column({ nullable: true })
    pre_home_score: string


    @Column({ nullable: true })
    pre_game_status: string


    @Column({ nullable: true })
    pre_away_score: string


    @Column({ nullable: true })
    league_id: number


    @Column({ nullable: true })
    season_id: number


    @Column({ nullable: true })
    home_id: number


    @Column({ nullable: true })
    home_logo_100x130: string


    @Column({ nullable: true })
    home_name: string


    @Column({ nullable: true })
    away_id: number


    @Column({ nullable: true })
    tbc: string


    @Column({ nullable: true })
    game_desc: string


    @Column({ nullable: true })
    away_logo_100x130: string

    @Column({ nullable: true })
    away_name: string


    @Column({ nullable: true })
    match_date: number


    @Column({ nullable: true })
    round_number: string


    @Column({ nullable: true })
    round_type: string


    @Column({ nullable: true })
    match_type: string


    @Column({ nullable: true })
    group_name: string


    @Column({ nullable: true })
    match_day: number


    @Column({ nullable: true })
    match_timezone: string


    @Column({ nullable: true })
    match_date_cn: number


    @Column({ nullable: true })
    away_score: string


    @Column({ nullable: true })
    home_score: string


    @Column({ nullable: true })
    half_score: string


    @Column({ nullable: true })
    away_shoot_out_score: string


    @Column({ nullable: true })
    home_shoot_out_score: string


    @Column({ nullable: true })
    game_status: number


    @Column({ nullable: true })
    game_period: number


    @Column({ nullable: true })
    game_time: string


    @Column({ nullable: true })
    period_1_start: string


    @Column({ nullable: true })
    period_2_start: string


    @Column({ nullable: true })
    period_3_start: string


    @Column({ nullable: true })
    period_4_start: string


    @Column({ nullable: true })
    period_5_start: string


    @Column({ nullable: true })
    away_formation: number


    @Column({ nullable: true })
    home_formation: number


    @Column({ nullable: true })
    away_team_official_id: number


    @Column({ nullable: true })
    home_team_official_id: number


    @Column({ nullable: true })
    sport_match_id: string


    @Column({ nullable: true })
    detail_id: string


    @Column({ nullable: true })
    weather: string


    @Column({ nullable: true })
    attendance: string


    @Column({ nullable: true })
    stadium_name: string


    @Column({ nullable: true })
    stadium_name_en: string


    @Column({ nullable: true })
    match_official_name: string


    @Column({ nullable: true })
    match_official_name_en: string


    @Column({ nullable: true })
    is_custom: number


    @Column({ nullable: true })
    home_logo_png_110x88: string


    @Column({ nullable: true })
    away_logo_png_110x88: string


    @Column({ nullable: true })
    game_period_cn: string


    @Column("simple-array")
    date: string[]

    @Column({ nullable: true })
    week: string


    @Column({ nullable: true })
    home_url: string


    @Column({ nullable: true })
    away_url: string


    @Column({ nullable: true })
    home_logo: string


    @Column({ nullable: true })
    away_logo: string


    @Column({ nullable: true })
    game_url: string

    @Column({ nullable: true })
    game_preview_url: string

    @Column({ nullable: true })
    leagueCN: string


}