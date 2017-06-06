const Mock = require('mockjs')

const groupModel = {
    "id":"1",
    "name": "如家集团",
    "memo": "企业简介企业简介企业简介企业简介",
    "website": "http://www.baidu.com",
    "hotel_num":23   //门店数量（只用在搜索接口返回）
}

Mock.mock(
    /\/groups/,
    function(request){
        // console.log(request)
        let re = {
            "errcode": "0",
            "errmsg": "ok"
        }
        switch (request.type) {
            case 'POST': 
                re.data = groupModel;
                break;
            case 'PUT': 
                re.data = groupModel;
                break;
            case 'DELETE': 
                
                break;
            case 'GET':
                if (/\/keyword/.test(request.url.split('?')[1]))
                    re.data = groupModel;
                else
                    re.data = [groupModel, groupModel, groupModel];
                break;
            default :
        }
        return re;
    }
)
