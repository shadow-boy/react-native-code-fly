import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import TimeLogInterface from "./base";

@Entity()
export default class NewsYingchao extends BaseEntity implements TimeLogInterface {

    @CreateDateColumn()
    createdTime: string;
    @UpdateDateColumn()
    modifiedTime: string;

    @PrimaryGeneratedColumn()
    newId: string

    @Column({unique:true})
    id: string

    @Column()
    app_id: string
    @Column()
    intro: string


    @Column()
    article_type: string


    @Column()
    bimg: string


    @Column()
    category: string

    @Column()
    category1_chn: string


    @Column()
    category1_id: string


    @Column()
    category2_chn: string


    @Column()
    category2_id: string

    //体育
    @Column()
    category_chn: string


    @Column()
    category_id: string


    @Column()
    comment_id: string


    @Column()
    comment_num: string


    @Column()
    duration: string

    @Column("simple-json")
    ext: JSON


    @Column()
    flag: string


    @Column()
    fm_url: string





    @Column()
    img: string


    @Column()
    img_count: string


    @Column()
    img_type: string


    @Column("simple-json")
    imgs: JSON


    @Column("simple-json")
    irs_imgs: JSON

    //克洛普;萨拉赫;利物浦;莱斯特城
    @Column()
    keywords: string


    @Column()
    media_icon: string


    @Column()
    mini_img: string


    @Column("simple-json")
    multi_imgs: string[]


    @Column()
    news_level: string


    @Column()
    play_url_high: string


    @Column()
    play_url_medium: string


    @Column()
    play_url_small: string


    @Column()
    pool_type: string


    @Column()
    publish_time: string


    @Column("text")
    report: string


    @Column()
    s_group: string


    @Column()
    showtype: string

    @Column()
    source: string


    @Column()
    source_fans: string


    @Column()
    source_id: string


    @Column()
    source_logo: string


    @Column()
    strategy: string


    @Column()
    surl: string


    @Column("simple-array")
    tag_label: string[]

    //克洛普;萨拉赫;新冠;利物浦;莱斯特城
    @Column()
    tags: string

    // 克洛普确认：萨拉赫新冠检测转阴，可以参加全队合练
    @Column()
    title: string


    @Column()
    ts: string


    @Column()
    update_time: string


    @Column()
    url: string


    @Column()
    view_count: string


    @Column()
    vurl: string

}