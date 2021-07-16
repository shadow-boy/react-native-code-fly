import {Get, JsonController} from "routing-controllers";


@JsonController("/banner")
export default class BannerController {
    @Get()
    getAllBanner() {
        console.log("bannercontroller");
        
        return resResult

    }

}

let resResult = {
    banner: [
        {
            "title": "法甲彩经：马赛难胜斯特拉斯堡",
            "createtime": "2020-11-06 13:20:07",
            "image": "http://tu.duoduocdn.com/uploads/day_200619/5eeccde09107c_thumb.jpg",
            "content": [
                {
                    "type": "image",
                    "image_url": "http://tu.duoduocdn.com/uploads/day_200619/5eeccde09107c_thumb.jpg"
                }
            ]
        },
        {
            "title": "赖特：战曼城我会选择若塔首发，红军需要解决菲米的进球问题",
            "createtime": "2020-11-06 12:49:28",
            "image": "http://tu.duoduocdn.com/uploads/day_201106/5fa4d55b52d68_thumb.jpg",
            "content": [
                {
                    "type": "image",
                    "image_url": "http://tu.duoduocdn.com/uploads/day_201106/5fa4d55b52d68_thumb.jpg"
                }
            ]
        },
        {
            "title": "AC米兰vs里尔首发：伊布、卡7先发，迪亚斯、达洛特出战",
            "createtime": "2020-11-06 02:42:55",
            "image": "http://tu.duoduocdn.com/uploads/day_201105/202011052327306991_thumb.jpg",
            "content": [
                {
                    "type": "image",
                    "image_url": "http://tu.duoduocdn.com/uploads/day_201105/202011052327306991_thumb.jpg"
                }
            ]
        }
    ]
}
