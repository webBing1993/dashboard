// const Mock = require('mockjs')

// const hotelModel = {
//    "id":"酒店id",
//    "group_id": "所属集团id",
//    "brand_id": "所属品牌id",
//    "name": "门店名称",
//    "code":"RUJA-JX-SHSH-ASD",
//    "tel": "021-213232132",
//    "province":"广东省",
//    "city":"深圳市",
//    "area":"南山区",
//    "address": "广东省深圳市南山区xxxx",
//    "longitude": "234.34",
//    "latitude": "23.34",
//    "pms_proxy_id": "",
//    "contact_name": "联系人",
//    "contact_phone": "13120933434",
//    "contact_position": "前台经理",
//    "status":"1"    //状态（只用在搜索接口返回）
// }

// Mock.mock(
//     /\/hotels/,
//     function(request){
//         console.log(request)
//         let re = {
//             "errcode": "0",
//             "errmsg": "ok"
//         }
//         switch (request.type) {
//             case 'POST': 
//                 re.data = hotelModel;
//                 break;
//             case 'PUT': 
//                 re.data = hotelModel;
//                 break;
//             case 'DELETE': 
                
//                 break;
//             case 'GET':
//                 if (/\/keyword/.test(request.url.split('?')[1]))
//                     re.data = hotelModel;
//                 else
//                     re.data = [hotelModel, hotelModel, hotelModel];
//                 break;
//             default :
//         }
//         return re;
//     }
// )
