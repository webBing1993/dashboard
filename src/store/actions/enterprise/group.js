/**
 *企业账户管理action
 */
module.exports = {
  addGroup(ctx, param) {
    ctx.dispatch('resource', {
      url: '/groups',
      method:'POST',
      body: {
        name: param.name,
        code: param.code,
        memo: param.memo,
        website: param.website,
        contact_name: param.contact_name,
        contact_phone: param.contact_phone,
        contact_position: param.contact_position
      },
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  getGroup(ctx, param) {
    // ctx.dispatch('resource', {
    //   url: `/groups/${param.id}`,
    //   method:'GET',
    //   onSuccess: body => {
    //     param.onsuccess ? param.onsuccess(body) : null
    //   }
    // })
  },
  modifyGroup(ctx, param) {
    ctx.dispatch('resource', {
      url: `/groups/${param.id}`,
      method:'PUT',
      body: {
        code: param.code,
        name: param.name,
        memo: param.memo,
        website: param.website,
        contact_name: param.contact_name,
        contact_phone: param.contact_phone,
        contact_position: param.contact_position
      },
      onSuccess: body => {
        ctx.dispatch('showtoast', {text: '修改成功', type:'success'});
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  removeGroup(ctx, param) {
    ctx.dispatch('resource', {
      url: `/groups/${param.id}`,
      method:'DELETE',
      onSuccess: body => {
        ctx.dispatch('showtoast', {text: '删除成功', type:'success'});
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  getGroupList(ctx, param){
    ctx.dispatch('resource', {
      url: '/groups',
      method:'GET',
      headers: {
        'X-Current-Page': param.page || '1',
        'X-Page-Size': param.size || '0'
      },
      // params: {
      //   keyword: param.keyword || ''
      // },
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess(body, headers) : null
      }
    })
  }
}
