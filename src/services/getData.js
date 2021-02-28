import { post , get } from "@/services/ajax";

//上传营业执照信息
export function SetShangHuXinXi(params){
    return post("/DianCanWaiMai/ShangHu/SetShangHuXinXi",params);
}
//上传图片/文件
export function BaoCunWenJianPrivate(params){
    return post("/Public/BaoCunWenJian",params);
}
export function getHello(){
    return get('http://www.gongjubaike.cn:8080/hello');
}
