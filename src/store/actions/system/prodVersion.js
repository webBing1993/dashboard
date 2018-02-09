/**
* 产品版本action
*/
module.exports={
    getProdVersionList(ctx, param) {
        ctx.dispatch('resource', {
            url: `/grayrelease?offset=`+param.offset+`&limit=`+param.limit,
            method:'GET',
            onSuccess: body => {
                ctx.dispatch('showtoast', {text: '操作成功', type: 'success'});
                param.onsuccess ? param.onsuccess(body) : null
            }
        })
    },
    saveProdVersionList(ctx, param){
        ctx.dispatch('resource', {
            url: `/grayrelease`,
            body:param.data,
            method:'POST',
            onSuccess: body => {
                ctx.dispatch('showtoast', {text: '保存成功', type: 'success'});
                param.onsuccess ? param.onsuccess(body) : null
            }
        })
    },
    modifyProdVersionList(ctx, param){
        ctx.dispatch('resource', {
            url: `/grayrelease/`+param.id,
            body:param.data,
            method:'PUT',
            onSuccess: body => {
                ctx.dispatch('showtoast', {text: '保存成功', type: 'success'});
                param.onsuccess ? param.onsuccess(body) : null
            }
        })
    },
    delProdVersion(ctx, param){
        ctx.dispatch('resource', {
            url: `/grayrelease/`+param.id,
            method:'DELETE',
            onSuccess: body => {
                ctx.dispatch('showtoast', {text: '删除成功', type: 'success'});
                param.onsuccess ? param.onsuccess(body) : null
            }
        })
    }
}
