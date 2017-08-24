const Mock = require('mockjs')

const roomModel = {
  "room_id":"00090117c8dc4c68ac1d5cd343cb59a4",
  "building_name":"1号楼", 
  "floor_name":"2层楼",
  "room_num":"0201",  
  "room_type_name":"大床房",
  "roomfeature_desc":[
    "可抽烟",
    "朝南"
  ]
}
Mock.mock(
    /\/hotels\/.+\/rooms$/,
    function(request){
        let re = {
            "errcode": "0",
            "errmsg": "ok",
            "data": [roomModel,roomModel,roomModel]
        }
        return re;
    }
)
