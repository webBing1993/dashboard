// 所有关于广告配置
module.exports = {
  // 1：关于广告商管理
  // 获取广告商模板列表
  MatterList(ctx, param) {
    ctx.dispatch('resource', {
      url: `/advCompanies?page=${param.page}&pageSize=${param.pageSize}`,
      method: 'GET',
      onSuccess: body => (param.onsuccess ? param.onsuccess(body) : null)
    })
  },

// 添加广告商
  saveMatter(ctx, param) {
    ctx.dispatch('resource', {
      url: '/advCompanies/advCompany',
      method: 'PUT',
      body: param.data,
      // body: {
      //   address: param.address,
      //   description: param.description,
      //   isDelete: param.isDelete,
      //   name: param.name,
      //   status: param.status,
      //   tel: param.tel,
      //   userName: param.userName,
      // },
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  // 修改广告商
  modifiMatter(ctx, param) {
    ctx.dispatch('resource', {
      url: `/advCompanies/advCompany/${param.id}`,
      method: 'PUT',
      body: param.data,
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },

  // advCompanies/advCompany/a9620a4c419c47c5aa2944b1a599eb0a

}
