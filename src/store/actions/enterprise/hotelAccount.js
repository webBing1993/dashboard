/**
 * 企业酒店管理action
 */
module.exports = {
  //酒店账户余额
  getCorpids(ctx, param){
    ctx.dispatch('resource', {
      url: `/corpids`,
      method: 'GET',
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  }
  //酒店账户消费记录

}
