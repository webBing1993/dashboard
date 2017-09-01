const Mock = require('mockjs')

const model = {
    "hotel_id":"0864f6731acb11e780ad5cb9018d9b5c", //酒店ID
    "device_id":"f690494dcf483c1b0b306d47e7364885", //设备ID
    "device_type":"32",                //设备类型 31 - 底座,32 - PAD
    "device_name":"开发 - Pad(王旭:IPad)", //设备名称
    "partner_id":"8669c4fcc26c4f4d8b7b30cbcf432fd5", //配对设备ID
    "enabled":""//设备状态 1-启用 0- 禁用
}

const model2 = {
    "hotel_id":"", //酒店ID
    "device_id":"f690494dcf483c1b0b306d47e7364885", //设备ID
    "device_type":"32",                //设备类型 31 - 底座,32 - PAD
    "device_name":"开发 - Pad(王旭:IPad)", //设备名称
    "partner_id":"8669c4fcc26c4f4d8b7b30cbcf432fd5", //配对设备ID
    "enabled":""//设备状态 1-启用 0- 禁用
}

Mock
// .mock(
//     /\/devices/,
//     function(request){
//         console.log(request)
//         let re = {
//             "errcode": "0",
//             "errmsg": "ok"
//         }
//         switch (request.type) {
//             case 'POST': 
//                 re.data = model;
//                 break;
//             case 'PUT': 
//                 re.data = model;
//                 break;
//             case 'DELETE': 
//                 re.data = null;
//                 break;
//             case 'GET':
//                 re.data = model;
//                 break;
//             default :
//         }
//         return re;
//     }
// )
.mock(
    /\/devicesList/,
    function(request){
        console.log(request)
        let re = {
            "errcode": "0",
            "errmsg": "okkkk",
            "data": [model,model,model]
        }
        return re;
    }
)
.mock(
    /\/vagrant/,
    function(request){
        console.log(request)
        let re = {
            "errcode": "0",
            "errmsg": "ok",
            "data": [model2,model2,model2]
        }
        return re;
    }
)
