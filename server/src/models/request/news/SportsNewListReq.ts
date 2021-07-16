import { SportsTypeEnum } from "../../../entity/NewsSports";
import BaseReq from "../BaseReq";

export default class SportsNewListReq extends BaseReq{

    /**
     * SportsTypeEnum
     *
     * @type {string}
     * @memberof SportsNewListReq
     */
    type:SportsTypeEnum
}