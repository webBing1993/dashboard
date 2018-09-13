// 所有关于广告配置
module.exports = {
  // *************1：关于广告商管理部分**************************
  // 获取广告商模板列表
  AdvertiserList(ctx, param) {
    ctx.dispatch('resource', {
      url: `/advCompanies?page=${param.page}&pageSize=${param.pageSize}`,
      method: 'GET',
      onSuccess: body => (param.onsuccess ? param.onsuccess(body) : null)
    })
  },

// 添加广告商
  saveAdvertiser(ctx, param) {
    ctx.dispatch('resource', {
      url: '/advCompanies/advCompany',
      method: 'PUT',
      body: param.data,
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  // 修改广告商
  modifiAdvertiser(ctx, param) {
    ctx.dispatch('resource', {
      url: `/advCompanies/advCompany/${param.id}`,
      method: 'PUT',
      body: param.data,
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },

  // **************************2:关于素材管理部分**************************

// 获取素材列表
  MatterList(ctx, param) {
    ctx.dispatch('resource', {
      url: `/advInfos?page=${param.page}&pageSize=${param.pageSize}`,
      method: 'GET',
      onSuccess: body => (param.onsuccess ? param.onsuccess(body) : null)
    })
  },
  // 保存素材
  saveMatter(ctx, param) {
    ctx.dispatch('resource', {
      url: '/advInfos/advInfo',
      method: 'PUT',
      body: param.data,
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  // http://intg.fortrun.cn:8244/advInfos/advInfo/check/111
  // 检测修改素材
  checkMatter(ctx, param) {
    ctx.dispatch('resource', {
      url: `/advInfos/advInfo/check/${param.id}`,
      method: 'GET',
      body: param.data,
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  // 修改素材
  modifiMatter(ctx, param) {
    ctx.dispatch('resource', {
      url: `/advInfos/advInfo/${param.id}`,
      method: 'PUT',
      body: param.data,
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },

  // 查看素材
  viewMatter(ctx, param) {
    ctx.dispatch('resource', {
      url: `/advInfos/advInfo/${param.id}`,
      method: 'GET',
      body: param.data,
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },

  // 获取所有可选广告商http://intg.fortrun.cn:8244/advCompanies?page=1&pageSize=10

  allCanSelectedCom(ctx, param) {
    ctx.dispatch('resource', {
      url: `/advCompanies?page=1&pageSize=100`,
      method: 'GET',
      onSuccess: body => (param.onsuccess ? param.onsuccess(body) : null)
    })
  },

  // **************************3:分组管理***************************************
// 获取分组列表

  groupContList(ctx, param) {
    ctx.dispatch('resource', {
      url: `/advScopes`,
      method: 'GET',
      onSuccess: body => (param.onsuccess ? param.onsuccess(body) : null)
    })
  },
  // 获取酒店树GET hotel/adv/treedata
  hotelTree(ctx, param) {
    ctx.dispatch('resource', {
      url: `/hotel/adv/treedata`,
      method: 'GET',
      onSuccess: body => (param.onsuccess ? param.onsuccess(body) : null)
    })
  },
  // devicesList/adv/hotelId
  // 酒店获取设备
  devicesList(ctx, param) {
    ctx.dispatch('resource', {
      url: `/devicesList/adv/${param.hotelid}`,
      method: 'GET',
      onSuccess: body => (param.onsuccess ? param.onsuccess(body) : null)
    })
  },
// 保存
  saveGroup(ctx, param) {
    ctx.dispatch('resource', {
      url: '/advScopes/advScope',
      method: 'PUT',
      body: param.data,
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  // 修改
  modifyGroup(ctx, param) {
    ctx.dispatch('resource', {
      url: `/advScopes/advScope/${param.id}`,
      method: 'PUT',
      body: param.data,
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  // http://intg.fortrun.cn:8244/advScopes/advScope/3456789
// 获取详情
  groupDetail(ctx, param) {
    ctx.dispatch('resource', {
      url: `/advScopes/advScope/${param.id}`,
      method: 'GET',
      onSuccess: body => (param.onsuccess ? param.onsuccess(body) : null)
    })
  },
// **************************:投放策略***************************************
  putInList(ctx, param) {
    ctx.dispatch('resource', {
      url: `/advMaterialScopes?page=${param.page}&pageSize=${param.pageSize}`,
      method: 'GET',
      onSuccess: body => (param.onsuccess ? param.onsuccess(body) : null)
    })
  },

  // 获取素材列表  接口问题  分页写100
  matterInList(ctx, param) {
    ctx.dispatch('resource', {
      url: `/advInfos?page=1&pageSize=100`,
      method: 'GET',
      onSuccess: body => (param.onsuccess ? param.onsuccess(body) : null)
    })
  },
// 获取广告组
  advGroupList(ctx, param) {
    ctx.dispatch('resource', {
      url: `/advScopes`,
      method: 'GET',
      onSuccess: body => (param.onsuccess ? param.onsuccess(body) : null)
    })
  },

  // 获取广告位
  advshowLocal(ctx, param) {
    ctx.dispatch('resource', {
      url: `/advMaterialScopes/showtypes`,
      method: 'GET',
      onSuccess: body => (param.onsuccess ? param.onsuccess(body) : null)
    })
  },
  // 添加投放策略
  putInStrategy(ctx, param) {
    ctx.dispatch('resource', {
      url: `/advMaterialScopes/advMaterialScope`,
      headers: {"Content-Type": "application/json;charset=UTF-8"},
      method: 'PUT',
      body: param.data,
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
  // 修改投放策略
  modifiPutIn(ctx, param) {
    ctx.dispatch('resource', {
      url: `/advMaterialScopes/advMaterialScope/${param.id}`,
      method: 'PUT',
      body: param.data,
      onSuccess: body => {
        param.onsuccess ? param.onsuccess(body) : null
      }
    })
  },
}
