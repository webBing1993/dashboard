/**
 *企业账户管理action
 */
module.exports = {
  getVerifyList(ctx, param){
    ctx.dispatch('resource', {
      url: '/identityCheckGuests/hotels/'+param.hotelId + '/list',
      method:'GET',
      headers: {
        'X-Current-Page': param.page || '1',
        'X-Page-Size': param.size || '0'
      },
      params: param.data,
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess(body, headers) : null
      }
    })
  },

  getverifyDetail(ctx, param){
    ctx.dispatch('resource', {
      url: '/identityCheckGuests/'+param.identityCheckId,
      method:'GET',
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess(body, headers) : null
      }
    })
  },

  verifySave(ctx, param){
    let url = '/identityCheckGuests/'+param.identityCheckId;
    ctx.dispatch('resource', {
      url: url,
      method: 'PUT',
      params: param.action ? {action: param.action} : '',
      body: param.data,
      onSuccess: (body, headers) => {
        param.onsuccess ? param.onsuccess(body, headers) : null
      }
    })
  },
}
