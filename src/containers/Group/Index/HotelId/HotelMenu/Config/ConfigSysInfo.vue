<!--门店配置页-->
<template>
  <div class="module-wrapper">
    <div class="content-configinfo">
      <div class="content-title">
        <span>系统配置</span>
        <a @click="goSummary">查看配置汇总</a>
      </div>
      <el-row :gutter="20">
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.PMS)">
            <div class="item_img">
              <img src="../../../../../../assets/images/系统.png" alt="a">
            </div>
            <div class="item-text">
              <span>pms对接配置</span>
              <p>对接PMS的酒店必须开通该配置。</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !pmsId, 'tag_text_green': pmsId}">{{pmsId ? '已配置' : '未配置'}}</span>
          </button>
        </el-col>
        <el-col :span="8" v-if="!showReception">
          <button @click="dialogConfig(enumShowType.lvyeReportType)">
            <div class="item_img">
              <img src="../../../../../../assets/images/公安.png" alt="a">
            </div>
            <div class="item-text">
              <span>旅业系统配置</span>
              <p>必须开通该配置。</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red':lvyeType, 'tag_text_green': lvyeType}">{{lvyeType ? '已配置' : '未配置'}}</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.doorLock_unknown)">
            <div class="item_img">
              <img src="../../../../../../assets/images/门锁.png" alt="a">
            </div>
            <div class="item-text">
              <span>门锁配置</span>
              <p>必须开通该配置。</p>
            </div>
            <span class="tag_text">暂无</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.facein)">
            <div class="item_img">
              <img src="../../../../../../assets/images/人脸识别 BFR.png" alt="a">
            </div>
            <div class="item-text">
              <span>人脸识别配置</span>
              <p>必须开通该配置。</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !configData.facein_pass_value, 'tag_text_green': configData.facein_pass_value}">{{configData.facein_pass_value ? '已配置' : '未配置'}}</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.wechatPay)">
            <div class="item_img">
              <img src="../../../../../../assets/images/微信支付.png" alt="a">
            </div>
            <div class="item-text">
              <span>PMS支付配置</span>
              <p>配置PMS支付信息。</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': payCode, 'tag_text_green': payCode}">{{payCode ? '已配置' : '未配置'}}</span>
          </button>
        </el-col>

        <el-col :span="8">
          <button @click="depswitch()">
            <div class="item_img">
              <img src="../../../../../../assets/images/酒店.png" alt="a">
            </div>
            <div class="item-text">
              <span>生态酒店配置</span>
              <p>必须开通该配置,身份识别、旅业上报
                等接口需要用到。</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red':!configData.wx_hotel_id, 'tag_text_green': configData.wx_hotel_id}">{{configData.wx_hotel_id ? '已配置' : '未配置'}}</span>
          </button>
        </el-col>

        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.miniApp)">
            <div class="item_img">
              <img src="../../../../../../assets/images/小程序.png" alt="a">
            </div>
            <div class="item-text">
              <span>小程序配置</span>
              <p>关联小程序配置。</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red':appId , 'tag_text_green':appId}">{{appId ? '已配置' : '未配置'}}</span>
          </button>
        </el-col>
        <el-col :span="8" v-if="showReception">
          <button @click="dialogConfig(enumShowType.moreLvyeReportType)">
            <div class="item_img">
              <img src="../../../../../../assets/images/公安.png" alt="a">
            </div>
            <div class="item-text">
              <span>多旅业系统配置</span>
              <p>多旅业配置。</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !showMoreLvyeConfig, 'tag_text_green':showMoreLvyeConfig}">{{showMoreLvyeConfig ? '已配置' : '未配置'}}</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.customization)">
            <div class="item_img">
              <img src="../../../../../../assets/images/公安.png" alt="a">
            </div>
            <div class="item-text">
              <span>定制化配置</span>
              <p>酒店LOGO、酒店介绍</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !mirrorBrand||mirrorIntro, 'tag_text_green':mirrorBrand||mirrorIntro}">{{mirrorBrand||mirrorIntro ? '已配置' : '未配置'}}</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.accessServiceType)">
            <div class="item_img">
              <img src="../../../../../../assets/images/公安.png" alt="a">
            </div>
            <div class="item-text">
              <span>酒店开通业务类型配置</span>
              <p>业务类型配置</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !accessService, 'tag_text_green':accessService}">{{accessService? '已配置' : '未配置'}}</span>
          </button>
        </el-col>
      </el-row>


      <!--/弹框页-->
      <el-dialog
        :title="typeTitles[showType]"
        :visible.sync="showDialog"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="true"
      >
        <!--@close="closeMorelvye(showType)"-->
        <div class="dialog-content">
          <!--<span class="tip" v-if="setTip">* 旅业信息不能为空</span>-->
          <div v-if="showType === enumShowType.PMS">
            <div class="item-form">
              <span>PMS品牌</span>
              <el-select class="el-right" v-model="pmsId" placeholder="请选择PMS品牌">
                <el-option
                  v-for="(obj, index) of PMSBrandList"
                  :key="obj.id"
                  :label="obj.name"
                  :value="obj.id">
                </el-option>
              </el-select>
            </div>
            <div v-show="pmsId != ''">
              <div class="item-form">
                <span>酒店PMS编码</span>
                <el-input class="el-right" v-model="hotelPmsCode" placeholder="请输入酒店PMS编码"></el-input>
              </div>
              <div class="item-form">
                <span>酒店服务地址</span>
                <el-input class="el-right" v-model="hotelServiceUrl" placeholder="请输入酒店服务地址"></el-input>
              </div>
            </div>
            <div v-show="pmsType == '2' || pmsType == '7'|| pmsType == '11'||pmsType == '14'">
              <div class="item-form">
                <span>crsURL</span>
                <el-input class="el-right" v-model="crsURL" placeholder="请输入crsURL，选填"></el-input>
              </div>
              <div class="item-form">
                <span>hotelGroupCode</span>
                <el-input class="el-right" v-model="hotelGroupCode" placeholder="请输入hotelGroupCode，选填"></el-input>
              </div>
              <div class="item-form">
                <span>appKey</span>
                <el-input class="el-right" v-model="appKey" placeholder="请输入appkey，选填"></el-input>
              </div>
              <div class="item-form">
                <span>appSecret</span>
                <el-input class="el-right" v-model="PMSAppSecret" placeholder="请输入appSecret，选填"></el-input>
              </div>
              <div class="item-form">
                <span>用户名</span>
                <el-input class="el-right" v-model="userCode" placeholder="请输入用户名，选填"></el-input>
              </div>
              <div class="item-form">
                <span>密码</span>
                <el-input class="el-right" v-model="password" placeholder="请输入密码，选填"></el-input>
              </div>
            </div>
            <div v-show="pmsType == '1'">
              <div class="item-form">
                <span>账单服务地址</span>
                <el-input class="el-right" v-model="billServiceUrl" placeholder="请输入账单服务地址"></el-input>
              </div>
              <div class="item-form">
                <span>CRM服务地址</span>
                <el-input class="el-right" v-model="crmServiceUrl" placeholder="请输入CRM服务地址"></el-input>
              </div>
              <div class="item-form">
                <span>订单服务地址</span>
                <el-input class="el-right" v-model="orderServiceUrl" placeholder="请输入订单服务地址"></el-input>
              </div>
              <div class="item-form">
                <span>安全服务地址</span>
                <el-input class="el-right" v-model="secServiceUrl" placeholder="请输入安全服务地址"></el-input>
              </div>
              <div class="item-form">
                <span>渠道名称</span>
                <el-input class="el-right" v-model="userName" placeholder="请输入用户名"></el-input>
              </div>
              <div class="item-form">
                <span>渠道凭证</span>
                <el-input class="el-right" v-model="userPass" placeholder="请输入密码"></el-input>
              </div>
            </div>
            <div v-show="pmsType == '3'">
              <div class="item-form">
                <span>调用ID</span>
                <el-input class="el-right" v-model="cid" placeholder="请输入住哲分配的调用ID(cid)"></el-input>
              </div>
              <div class="item-form">
                <span>密钥</span>
                <el-input class="el-right" v-model="key" placeholder="请输入住哲分配的密钥(key)"></el-input>
              </div>
              <div class="item-form">
                <span>数据加密密钥</span>
                <el-input class="el-right" v-model="dataKey" placeholder="请输入住哲分配的数据加密密钥(datakey)"></el-input>
              </div>
              <div class="item-form">
                <span>用户名</span>
                <el-input class="el-right" v-model="adminName" placeholder="请输入用户名"></el-input>
              </div>
              <div class="item-form">
                <span>密码</span>
                <el-input class="el-right" v-model="adminPassword" placeholder="请输入密码"></el-input>
              </div>
              <div class="item-form">
                <span>品牌ID</span>
                <el-input class="el-right" v-model="brandId" placeholder="请输入品牌ID"></el-input>
              </div>
            </div>
            <div v-show="pmsType == '8'">
              <div class="item-form">
                <span>密钥</span>
                <el-input class="el-right" v-model="dcKey" placeholder="请输入东呈分配的密钥(key)"></el-input>
              </div>
            </div>
            <!--西软BS-->
            <div v-show="pmsType == '12'">
              <div class="item-form">
                <span>集团ID</span>
                <el-input class="el-right" v-model="xrbs_groupCode" placeholder="请输入集团ID"></el-input>
              </div>
              <div class="item-form">
                <span>平台appkey</span>
                <el-input class="el-right" v-model="xrbs_appkey" placeholder="请输入平台appkey"></el-input>
              </div>
              <div class="item-form">
                <span>平台授权码</span>
                <el-input class="el-right" v-model="xrbs_authCode" placeholder="请输入平台授权码"></el-input>
              </div>
              <div class="item-form">
                <span>返回语种信息</span>
                <el-input class="el-right" v-model="xrbs_infoLanguage" placeholder="请输入返回语种信息"></el-input>
              </div>
              <div class="item-form">
                <span>服务方法版本</span>
                <el-input class="el-right" v-model="xrbs_serviceVersion" placeholder="请输入服务方法版本"></el-input>
              </div>
              <div class="item-form">
                <span>渠道代码</span>
                <el-input class="el-right" v-model="xrbs_CRM" placeholder="请输入渠道代码"></el-input>
              </div>
              <div class="item-form">
                <span>站点ID</span>
                <el-input class="el-right" v-model="xrbs_siteId" placeholder="请输入站点ID"></el-input>
              </div>
              <div class="item-form">
                <span>工号</span>
                <el-input class="el-right" v-model="xrbs_employeeNum" placeholder="请输入工号"></el-input>
              </div>
              <div class="item-form">
                <span>模块号</span>
                <el-input class="el-right" v-model="xrbs_moduleNum" placeholder="请输入模块号"></el-input>
              </div>
            </div>
            <div class="item-form">
              <span>备注</span>
              <el-input class="el-right" v-model="remark" placeholder="备注"></el-input>
            </div>
            <div class="item-form">
              <span>是否对接退房接口</span>
              <el-switch
                v-model="checkout"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
            <div class="item-form">
              <span>微前台公号</span>
              <el-input class="el-right" v-model="wqtPublicNo" placeholder="请输入微前台公号"></el-input>
            </div>
            <div v-show="pmsType == '5'||pmsType == '7'||pmsType == '9'">
              <div class="item-form" v-for="(item,index) of urls">
                <span>代理（备选网址）</span>
                <el-input class="el-right" v-model="item.url"></el-input>
                <img src="../../../../../../assets/images/减少.png" class="reduceImg" @click="reduceAlterUrl(index)">
              </div>
              <div style="margin-left: 9rem">
                <el-button plain @click="addAlterUrl"> 添加一个备选网址</el-button>
              </div>
            </div>
          </div>

          <div v-if="showType === enumShowType.lvyeReportType">
            <div class="lvyeItem">
              <div class="item-form">
                <span>上传配置项</span>
                <el-select class="el-right" v-model="singlelvyeAutoReport" placeholder="请选择旅业系统类型">
                  <el-option
                    v-for="(obj, index) of LvyeConfigItemList"
                    :key="obj.index"
                    :label="obj.name"
                    :value="obj.value">
                  </el-option>
                </el-select>
              </div>
              <div class="item-form">
                <span>旅业系统类型</span>
                <el-select class="el-right" v-model="lvyeType" placeholder="请选择旅业系统类型">
                  <el-option
                    v-for="(obj, index) of rendLvyeTypeList"
                    :key="obj.index"
                    :label="obj.lvye_report_type_name"
                    :value="obj.lvye_report_type">
                  </el-option>
                </el-select>
              </div>
              <div class="item-form">
                <span>酒店公安ID</span>
                <el-input class="el-right" v-model="policeId" placeholder="请输入酒店公安ID"></el-input>
              </div>
              <div class="item-form">
                <span>公安类型</span>
                <el-input class="el-right" v-model="policeType" placeholder="请输入公安类型"></el-input>
              </div>
              <div v-show="isPoliceParam">
                <div class="item-form">
                  <span>公安参数</span>
                  <el-input class="el-right" v-model="policeParam" placeholder="请输入公安参数,正确的JSON字符串"></el-input>
                </div>
              </div>
            </div>
          </div>

          <div v-if="showType === enumShowType.doorLock_unknown">
            <h1>暂无</h1>
          </div>

          <div v-if="showType === enumShowType.facein">
            <div class="item-form">
              <span>人脸识别通道</span>
              <el-select class="el-right" v-model="faceTongdao" placeholder="请选择自动通过值">
                <el-option
                  v-for="(obj, index) of [{name:'腾讯优图',val:'YOUTO'},{name:'厦门身份宝',val:'SHENFENBAO'}]"
                  :key="index"
                  :label="obj.name"
                  :value="obj.name">
                </el-option>
              </el-select>
            </div>
            <div class="item-form" v-if="faceTongdao!=='腾讯优图' && faceTongdao==='厦门身份宝'">
              <span>身份宝账号</span>
              <el-input class="el-right" placeholder="请输入内容" v-model="identityAccount"></el-input>
              <span></span>
            </div>
            <div class="item-form" v-if="faceTongdao==='腾讯优图' && faceTongdao!=='厦门身份宝'">
              <span>自动通过值</span>
              <el-select class="el-right" v-model="faceinPassValue" placeholder="请选择自动通过值">
                <el-option
                  v-for="(obj, index) of [0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100]"
                  :key="index"
                  :label="obj"
                  :value="obj">
                </el-option>
              </el-select>
            </div>
            <div class="item-form" v-if="faceTongdao==='腾讯优图' && faceTongdao!=='厦门身份宝'">
              <span>自动拒绝值</span>
              <el-select class="el-right" v-model="faceinRejectValue" placeholder="请选择自动拒绝值">
                <el-option
                  v-for="(obj, index) of [0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100]"
                  :key="index"
                  :label="obj"
                  :value="obj">
                </el-option>
              </el-select>
            </div>
            <div class="item-form">
              <span>是否开启人脸识别</span>
              <el-switch
                v-model="faceEqu"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
            <div class="item-form">
              <span>是否自动人脸核验</span>
              <el-switch
                v-model="autoIdentityCheckVal"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
            <div class="item-form">
              <span>是否显示相似度对比值</span>
              <el-switch
                v-model="similarity"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
            <div class="item-form" v-if="faceTongdao!=='腾讯优图' && faceTongdao==='厦门身份宝'">
              <span>身份宝拒绝是否人工参与</span>
              <el-switch
                v-model="shenfenbaoRejectManual"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
            <article v-if="faceTongdao==='腾讯优图' && faceTongdao!=='厦门身份宝'">
              <ul>
                帮助：
                <li>大于自动通过值则自动通过公安验证。</li>
                <li>小于自动拒绝值则验证自动拒绝。</li>
                <li>在自动通过值和自动拒绝值之间需要人工参与核实。</li>
              </ul>
            </article>
          </div>

          <div v-if="showType === enumShowType.wechatPay">
            <div class="item_large">
              <span>微信支付方式</span>
              <div>
              <el-checkbox-group v-model="checkedStatus" @change="handleCheckedStatusChange">
                <el-checkbox v-for="sta in status" :label="sta" :key="sta">{{(sta=='2')?'刷脸支付(POS机)':((sta=='3')?'微信预授权':'刷脸支付(POS机)')}}</el-checkbox>
              </el-checkbox-group>
              </div>
            </div>
            <div class="item_large">
              <span>酒店微信账务收款代码</span>
              <el-input class="el-right" v-model="payCode" placeholder="请输入酒店微信账务收款代码"></el-input>
            </div>
            <div class="item_large">
              <span>酒店微信账务退款代码</span>
              <el-input class="el-right" v-model="refundCode" placeholder="请输入酒店微信账务退款代码"></el-input>
            </div>
            <div class="item_large">
              <span>酒店房租房费关键词</span>
              <el-input class="el-right" v-model="dayrentName" placeholder="请输入"></el-input>
            </div>
            <div class="item_large">
              <span>酒店微信支付项目名</span>
              <el-input class="el-right" v-model="payName" placeholder="请输入"></el-input>
            </div>
            <div class="item_large">
              <span>酒店微信退款项目名</span>
              <el-input class="el-right" v-model="refundName" placeholder="请输入"></el-input>
            </div>
          </div>

          <div v-if="showType === enumShowType.wxHotel && RegisterOk">
            <div class="item-form">
              <el-select class="el-right" v-model="optionvalue" placeholder="城市服务">
                <el-option
                  v-for="(obj, index) of renderList"
                  :key="index"
                  :label="obj.route_name"
                  :value="obj.route_code">
                </el-option>
              </el-select>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button class="reg" @click="dialogConfig(enumShowType.WxHotelRegister)">注册
              </el-button>
            </div>
          </div>

          <div v-if="showType === enumShowType.WxHotelRegister">
            <div style="font-size: 14px;font-weight: 400;color: #6d6e6e;margin-left: 35px;line-height: 2em">
              <p style="margin-top: 30px"><span style="margin-right: 20px">微信酒店ID:</span>
                <label v-if="RegistersWxHotelId">{{RegistersWxHotelId ? RegistersWxHotelId : '系统异常1'}}</label>
                <label v-if="wxHotelId">{{wxHotelId ? wxHotelId : '系统异常2'}}</label>
              </p>
              <div>
                <div v-if="1">
                  <el-button style="width: 200px;margin-top: 30px" @click="isDelete()">删除</el-button>
                </div>
              </div>
            </div>
          </div>

          <div v-if="showType === enumShowType.miniApp">
            <div class="item-form">
              <span>服务商模式</span>
              <el-switch
                v-model="provider"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
            <div class="item-form">
              <span>小程序app_id</span>
              <el-select class="el-right" v-model="appIdTemp" filterable placeholder="请选择小程序">
                <el-option
                  v-for="(obj, index) of miniAppList"
                  :key="obj.app_id"
                  :label="`${obj.app_id} | ${obj.app_name}`"
                  :value="`${obj.app_id} | ${obj.app_name}`">
                </el-option>
              </el-select>
            </div>
            <div class="item-form">
              <span>商户mch_id</span>
              <el-select class="el-right" v-model="mchIdTemp" filterable placeholder="请输入商户号">
                <el-option
                  v-for="(obj, index) of mchIdList"
                  :key="obj.value"
                  :label="obj.value"
                  :value="obj.value">
                </el-option>
              </el-select>
            </div>
            <div v-show="provider">
              <div class="item-form">
                <span>服务商app_id</span>
                <el-select class="el-right" v-model="providerAppIdTemp" filterable placeholder="请选择服务商app_id">
                  <el-option
                    v-for="(obj, index) of miniAppList"
                    :key="obj.app_id"
                    :label="`${obj.app_id} | ${obj.app_name}`"
                    :value="`${obj.app_id} | ${obj.app_name}`">
                  </el-option>
                </el-select>
              </div>
              <div class="item-form">
                <span>服务商mch_id</span>
                <el-select class="el-right" v-model="providerMchIdTemp" filterable placeholder="请选择服务商mch_id">
                  <el-option
                    v-for="(obj, index) of providerMchIdList"
                    :key="obj.value"
                    :label="obj.value"
                    :value="obj.value">
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>

          <!-- 定制化配置 -->
          <div v-if="showType === enumShowType.customization">
            <div class="item-form">
              <span>是否显示酒店的介绍</span>
              <el-switch
                v-model="mirrorIntro"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
            <div class="item-form">
              <span>显示酒店品牌的logo</span>
              <el-switch
                v-model="mirrorBrand"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
          </div>

          <!--开通酒店业务类型配置-->
          <div v-if="showType === enumShowType.accessServiceType">
            <div class="item-form">
              <span>格式化脚本</span>
              <el-input class="el-right" v-model="formatScript"></el-input>
              <el-upload
                class="upload-demo el-right"
                :action="scriptUpload"
                :headers="setHeader"
                :data="{'script_type':'format'}"
                :on-success="formatScriptSuccess"
                :before-upload='beforeUploadformat'
                :show-file-list=false
                :limit=1>
                <el-button size="small" type="primary">{{formatScript?'重新上传':'选择上传文件'}}</el-button>
              </el-upload>
            </div>
            <div class="item-form">
              <span>过滤脚本</span>
              <el-input class="el-right" v-model="filterScript"></el-input>
              <el-upload
                class="upload-demo el-right"
                :action="scriptUpload"
                :headers="setHeader"
                :data="{'script_type':'filter'}"
                :show-file-list=false
                :before-upload='beforeUploadfilter'
                :on-success="filterScriptSuccess"
                :limit=1>
                <el-button size="small" type="primary">{{filterScript?'重新上传':'选择上传文件'}}</el-button>
              </el-upload>
            </div>
            <div class="item-form">
              <span>是否开启</span>
              <el-switch
                v-model="enableAccessService"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
          </div>


        </div>
        <!--footer-->
        <div slot="footer" class="dialog-footer" v-if="switchName === 'close' && delName==='close'">
            <el-button @click="hideDialog">取 消</el-button>
            <el-button :disabled="!validateAll" type="primary" @click="submitDialog">确 定</el-button>
        </div>
        <!--footer-->
      </el-dialog>


      <el-dialog
        :title="typeTitles[showType]"
        :visible.sync="queryDel"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="true"
        @close="handleClose"
        center>
        <span>是否删除</span>
        <div slot="footer" class="dialog-footer">
          <el-button @click="deleteWxHotels(false)">取 消</el-button>
          <el-button type="primary" @click="deleteWxHotels(true)">确 定</el-button>
        </div>
      </el-dialog>

    </div>
  </div>
</template>

<script>
  import ElDialog from "../../../../../../../node_modules/element-ui/packages/dialog/src/component.vue";

  var QRCode = require('qrcode')
  const empty={
      emptyArr:[]
  }
  //弹框类型
  const enumShowType = {
    checkDel: 0,
    PMS: 1, //PMS信息
    lvyeReportType: 2,  //旅业系统配置
    doorLock_unknown: 3, //门锁配置
    facein: 4,  //人脸识别配置
    wechatPay: 5,  //微信支付配置
    wxHotel: 6,  //微信生态酒店配置
    miniApp: 7,  //小程序配置
    customization:8,
    accessServiceType:9,
    WxHotelRegister: 10,//微信生态酒店——城市服务注册

  }

  //弹框标题类型
  const typeTitles = ['是否删除',
    'PMS信息',
    '旅业系统配置',
    '门锁配置',
    '人脸识别配置',
    '微信支付配置',
    '微信生态酒店配置',
    '小程序配置',
    '定制化配置',
    '酒店开通业务类型配置',
    '微信生态酒店配置',


  ]

  import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'
  import ElInput from "../../../../../../../node_modules/element-ui/packages/input/src/input";
  import tool from '@/assets/tools/tool.js'

  export default {
    components: {
      ElDialog,
      ElInput
    },
    name: 'ConfigInfo',
    data() {
      return {
//*********************PMS配置*********************
        wqtPublicNo:'',
        PMSBrandList: [],
        checkout: true,
        urls: [],
        //捷信达
        pmsId: '',
        // pmsType: '', //放在计算属性
        hotelPmsCode: '',
        hotelServiceUrl: '',
        remark: '',
        //西软BS
        xrbs_groupCode:'',
        xrbs_appkey:'',
        xrbs_authCode:'',
        xrbs_serviceVersion:'',
        xrbs_infoLanguage:'',
        xrbs_CRM:'',
        xrbs_siteId:'',
        xrbs_employeeNum:'',
        xrbs_moduleNum:'',
        //绿云,西软
        crsURL: '',
        hotelGroupCode: '',
        appKey: '',
        PMSAppSecret: '',
        userCode: '',
        password: '',
        //别样红
        billServiceUrl: '',
        crmServiceUrl: '',
        orderServiceUrl: '',
        secServiceUrl: '',
        userName: '',
        userPass: '',
        //住哲
        cid: '',
        key: '',
        dataKey: '',
        adminName: '',
        adminPassword: '',
        brandId: '',
        //东呈
        dcKey: '',
// **********旅业配置*********************
        lvyeTypeList: [],
        singlelvyeAutoReport: '',
        lvyeType: '',
        policeId: '',
        policeType: '',
        policeParam: '',
        LvyeConfigItemList:[{name:'全自动上传',value:'AUTO'},{name:'全手工上传',value:'MANUAL'},{name:'仅自动上传有房号的',value:'HAS_ROOM_NO'}],
        isPoliceParam:false,
//*********************门锁配置，暂无*********************

//**********人脸识别配置**********************
        faceEqu: true,
        autoIdentityCheckVal: false,
        similarity:false,
        faceTongdao: '腾讯优图',
        identityAccount: null,
        shenfenbaoRejectManual: "false",
        faceinPassValue: 70,
        faceinRejectValue: 70,
 //**********************微信支付配置**********************
        payCode: '',
        refundCode: '',
        dayrentName: '',
        payName: '',
        refundName: '',
        checkedStatus:['1','2'],
        status:['2','3'],
 //**********************微信生态酒店配置**********************
        wxHotelId: '',
        wxhotelCityserList: [],
        RegistersWxHotelId: '',//注册返回的微信酒店id
        deleteList: '',//删除微信酒店后返回
        optionvalue: '',//微信生态酒店配置列表初始化
        RegisterOk:true,
        queryDel: false,
        //**********************小程序配置**********************
        miniAppList: [],
        provider: false,
        appIdTemp: '',
        mchIdTemp: '',
        providerAppIdTemp: '',
        providerMchIdTemp: '',
//**********************定制化配置**********************
        mirrorIntro:false,
        mirrorBrand:false,
//**********************酒店开通业务类型配置**********************
        filter:'',
        format:'',
        formatScript:"",
        filterScript:"",
        enableAccessService:false,

//**********************开关设置**********************
        accessService:false,
        switchName: 'close',//微信生态酒店配置按钮
        delName: 'close',
        enumShowType: enumShowType,
        typeTitles: typeTitles,
        showType: '',
        showDialog: false,
      }

    },
    mounted() {
      this.getLvyes();
      this.getConfigs();
      this.getWxhotelCitysers();
      this.getPms();
      this.wechatList();
      this.WxhotelRegisters();
//      this.getRCConfigeds();
      this.getAccessServiceType();
//      this.getPADMarkConfigs();
//      this.getRoomNumList()
      // this.getMoreLvye({hotel_id: this.$route.params.hotelid})
    },
    computed: {
      ...mapState({
        configData: state => state.enterprise.configData,
        pmsData: state => state.enterprise.pmsData,
        lvyeData: state => state.enterprise.lvyeData,
        wechatAppData: state => state.enterprise.wechatAppData,
        hotelName: state => state.enterprise.tempHotelName,
        showReception: state => state.enterprise.showReception,

      }),
//      rcgethotelid() {
//        return "/virgo/fileUpload/" + this.$route.params.hotelid
//      },
      scriptUpload(){
        return "/virgo/scriptupload/"+ this.$route.params.hotelid
      },
      setHeader() {
        return {
          Session: sessionStorage.getItem('session_id'),
          enctype: "multipart/form-data"
//           Access-Control-Allow-Origin: *
        }
      },

      rendLvyeTypeList() {
        return this.lvyeTypeList;
      },
//      renderDeskList(){
//        return this.deskList;
//      },
      renderList() {
        return this.wxhotelCityserList;
      },
//      renderMoreLvyeList() {
//        return this.moreLvyeList;
//      },
//      renderRoomNumReviewList(){
//        return this.roomNumReviewList;
//      },
      providerMchIdList() {
        return this.providerList.map(v => {
          let obj = {
            value: `${v.mch_id} | ${v.mch_name}`
          }
          return obj
        })
      },
      mchIdList() {
        return this.unProviderList.map(v => {
          let obj = {
            value: `${v.mch_id} | ${v.mch_name}`
          }
          return obj
        })
      },
      appName() {
        if (!this.appIdTemp) return '';
        return this.appIdTemp.split(' | ')[1];
      },
      appId: {
        get() {
          if (!this.appIdTemp) return '';
          return this.appIdTemp.split(' | ')[0];
        },
        set(val) {
          val.app_id ? this.appIdTemp = `${val.app_id} | ${val.app_name}` : this.appIdTemp = '';
        }
      },
      mchName() {
        if (!this.mchIdTemp) return '';
        return this.mchIdTemp.split(' | ')[1];
      },
      mchId: {
        get() {
          if (!this.mchIdTemp) return '';
          return this.mchIdTemp.split(' | ')[0];
        },
        set(val) {
          val.mch_id ? this.mchIdTemp = `${val.mch_id} | ${val.mch_name}` : this.mchIdTemp = '';
        }
      },
      providerAppName() {
        if (!this.providerAppIdTemp) return '';
        return this.providerAppIdTemp.split(' | ')[1];
      },
      providerAppId: {
        get() {
          if (!this.providerAppIdTemp) return '';
          return this.providerAppIdTemp.split(' | ')[0];
        },
        set(val) {
          val.provider_app_id ? this.providerAppIdTemp = `${val.provider_app_id} | ${val.provider_app_name}` : this.providerAppIdTemp = '';
        }
      },
      providerMchName() {
        if (!this.providerMchIdTemp) return '';
        return this.providerMchIdTemp.split(' | ')[1];
      },
      providerMchId: {
        get() {
          if (!this.providerMchIdTemp) return '';
          return this.providerMchIdTemp.split(' | ')[0];
        },
        set(val) {
          val.provider_app_id ? this.providerMchIdTemp = `${val.provider_mch_id} | ${val.provider_mch_name}` : this.providerMchIdTemp = '';
        }
      },
      pmsType() {
        let obj = this.PMSBrandList.find(v => v.id == this.pmsId);
        if (tool.isNotBlank(obj))
          return obj.type;
        return '';
      },
//      invoiceNameList() {
//        return this.invoiceName.filter(v => v != '');
//      },
//      invoiceCodeList() {
//        return this.invoiceCode.filter(v => v != '');
//      },
//      roomTagsList() {
//        return this.roomTags.filter(v => v != '');
//      },

      //无数个validate
      validatePMS() {
        if (tool.isNotBlank(this.pmsId) && tool.isNotBlank(this.pmsType) && tool.isNotBlank(this.hotelPmsCode) && tool.isNotBlank(this.hotelServiceUrl)) {
          if (this.pmsType == '1') {
            return tool.isNotBlank(this.billServiceUrl) && tool.isNotBlank(this.crmServiceUrl) && tool.isNotBlank(this.orderServiceUrl) && tool.isNotBlank(this.secServiceUrl) && tool.isNotBlank(this.userName) && tool.isNotBlank(this.userPass)
          } else if (this.pmsType == '3') {
            return tool.isNotBlank(this.cid) && tool.isNotBlank(this.key) && tool.isNotBlank(this.dataKey)
          } else if (this.pmsType == '8') {
            return tool.isNotBlank(this.dcKey)
          }
          else {
            return true;
          }
        } else {
          return false;
        }
      },

      validatelvyeReportType() {
        if (!this.isPoliceParam) {
            console.log(888)
          return tool.isNotBlank(this.policeId) && tool.isNotBlank(this.policeType);
        } else if (this.isPoliceParam) {
            console.log(999)
          if (tool.isNotBlank(this.policeId) && tool.isNotBlank(this.policeType) && isNaN(+this.policeParam)) {
            let flag = true;
            try {
              JSON.parse(this.policeParam);
            } catch (e) {
              flag = false;
            }
            return flag;
          }
          return false;
        } else if (this.lvyeType == 'NONE') {
            return true;
        } else {
          return false;
        }
      },

      validateMore() {
        return true;
      },

      validatefacein() {
        // return tool.isNotBlank(this.faceinPassValue) && tool.isNotBlank(this.faceinRejectValue);
        return (typeof this.faceinPassValue === 'number') && (typeof this.faceinRejectValue === 'number');
      },

      validatewechatPay() {
        return tool.isNotBlank(this.payCode) && tool.isNotBlank(this.refundCode) && tool.isNotBlank(this.dayrentName) && tool.isNotBlank(this.payName) && tool.isNotBlank(this.refundName)&& tool.isNotBlank(this.checkedStatus);
      },

      validatewxHotel() {
        return tool.isNotBlank(this.wxHotelId);
      },

      validateminiApp() {
        if (!this.provider) {
          return tool.isNotBlank(this.appId) && tool.isNotBlank(this.mchId);
        }
        return tool.isNotBlank(this.appId) && tool.isNotBlank(this.mchId) && tool.isNotBlank(this.providerAppId) && tool.isNotBlank(this.providerMchId);
      },

      validateCustomization(){
        return true;
      },

      validateAccessService(){
        return (tool.isNotBlank(this.filterScript)||tool.isNotBlank(this.formatScript));
      },

      validatewxHotelReg() {
        this.optionvalue && this.optionvalue.length > 0 ? true : false;
      },

      validateAll() {
        let result = false;
        switch (this.showType) {
          case enumShowType.PMS:
            result = this.validatePMS;
            break;
          case enumShowType.lvyeReportType:
            result = this.validatelvyeReportType;
            break;
          case enumShowType.doorLock_unknown:
            result = this.validatedoorLock_unknown;
            break;
          case enumShowType.facein:
            result = this.validatefacein;
            break;
          case enumShowType.wechatPay:
            result = this.validatewechatPay;
            break;
          case enumShowType.wxHotel:
            result = this.validatewxHotel;
            break;
          case enumShowType.miniApp:
            result = this.validateminiApp;
            break;
          case enumShowType.customization:
            result = this.validateCustomization;
            break;
          case enumShowType.accessServiceType:
            result=this.validateAccessService;
            break;
          default:
            result = false;
        }
        return result;
      }
    },
    watch: {

      configData(){
        let configData = this.configData;
        console.log('configData:',configData)
        if (tool.isNotBlank(configData)) {
          //门锁配置，暂无
          //人脸识别配置
          this.faceinPassValue = configData.facein_pass_value ? +configData.facein_pass_value : 70;
          this.faceinRejectValue = configData.facein_reject_value ? +configData.facein_reject_value : 70;
          this.faceTongdao = configData.identity_check_channel === 'YOUTU' ? '腾讯优图' : '厦门身份宝';
          this.identityAccount = configData.shenfenbao_hotel_account;
          this.shenfenbaoRejectManual = configData.shenfenbao_reject_manual;
          this.faceEqu = configData.support_face_in;
          this.similarity=configData.show_similarity === 'true' ? true : false;
          this.autoIdentityCheckVal = configData.enabled_auto_identity_check === 'true' ? true : false;
          //微信支付配置
          this.mchId = configData;
          // this.mchId = configData.child_mch_id;
          this.payCode = configData.pay_code;
          this.refundCode = configData.refund_code;
          this.dayrentName = configData.dayrent_name,
            this.payName = configData.pay_name,
            this.refundName = configData.refund_name,
            //微信生态酒店配置
            this.wxHotelId = configData.wx_hotel_id;

            this.checkedStatus=configData.pms_pay_method.split(',')


          //小程序配置
          this.appId = configData;
          this.providerAppId = configData;
          this.providerMchId = configData;
          this.provider = configData.provider ? true : false;

          //定制化配置
          this.mirrorIntro=configData.enabled_mirror_introduce=='true'?true:false;
          this.mirrorBrand=configData.enabled_mirror_brand=='true'?true:false;
          this.rcStatus=configData.rc_status=='true'?true:false;
          //应用功能配置
          this.appValue=configData.business_mode;
          //应用功能配置二
          let wqtMainCtl=configData.wqt_main_control?JSON.parse(configData.wqt_main_control):'';
          // console.log('wqtMainCtl:',wqtMainCtl)
          this.appPolice=wqtMainCtl.identity_check_view;
          this.appOrder=wqtMainCtl.order_view;
          this.appIdentity=wqtMainCtl.room_status_view;
          this.appLiveIn=wqtMainCtl.check_in_identity_check_view;
          this.appInvoice=wqtMainCtl.invoice_view;
          this.appMoney=wqtMainCtl.order_bill_view;
          this.appAbnormal=wqtMainCtl.exception_view;
          this.appSuspicious=wqtMainCtl.suspicious_person_view;
          this.appDirtyRoom=wqtMainCtl.dirty_room_view;
          //公安验证是否显示已处理列表配置
          this.showPoliceHandledList=configData.enable_show_plice_processed== 'true' ? true : false
        };
      },

      pmsData() {
        if (tool.isNotBlank(this.pmsData)) {
          //PMS信息
          //捷信达
          this.wqtPublicNo=this.pmsData.pms_worker_id;
          this.urls=this.pmsData.urls;
          this.pmsId = this.pmsData.pms_id;
          this.checkout = this.pmsData.checkout == 'true' ? true : false;
          // this.pmsType = this.pmsData.pms_type; //放在计算属性
          this.hotelPmsCode = this.pmsData.hotel_pmscode;
          this.remark = this.pmsData.remark;
          this.hotelServiceUrl = this.pmsData.hotel_service_url;
          //绿云,西软
          this.crsURL = this.pmsData.crs_url;
          this.hotelGroupCode = this.pmsData.hotel_group_code;
          this.appKey = this.pmsData.app_key;
          this.PMSAppSecret = this.pmsData.app_secret;
          this.userCode = this.pmsData.usercode;
          this.password = this.pmsData.password;
          //别样红
          this.billServiceUrl = this.pmsData.bill_service_url;
          this.crmServiceUrl = this.pmsData.crm_service_url;
          this.orderServiceUrl = this.pmsData.order_service_url;
          this.secServiceUrl = this.pmsData.sec_service_url;
          this.userName = this.pmsData.user_name;
          this.userPass = this.pmsData.user_pass;
          //住哲
          this.cid = this.pmsData.cid;
          this.key = this.pmsData.key;
          this.dataKey = this.pmsData.datakey;
          this.adminName = this.pmsData.admin_name;
          this.adminPassword = this.pmsData.admin_password;
          this.brandId = this.pmsData.brand_id;
          //东呈
          this.dcKey = this.pmsData.key;
          //西软BS
          this.xrbs_groupCode=this.pmsData.hotelGroupCode;
          this.xrbs_appkey=this.pmsData.appKey;
          this.xrbs_authCode=this.pmsData.secret;
          this.xrbs_serviceVersion=this.pmsData.ver;
          this.xrbs_infoLanguage=this.pmsData.loc;
          this.xrbs_CRM=this.pmsData.cmmcode;
          this.xrbs_siteId=this.pmsData.pcid;
          this.xrbs_employeeNum=this.pmsData.empno;
          this.xrbs_moduleNum=this.pmsData.modu;
        }
      },

      lvyeData() {
        // 旅业配置
        if (tool.isNotBlank(this.lvyeData)) {
          this.singlelvyeAutoReport = this.lvyeData.lvye_auto_report;
          this.lvyeType = this.lvyeData.lvye_report_type;
          console.log('this.lvyeType:',this.lvyeType)
          this.policeId = this.lvyeData.hotel_ga_id;
          this.policeType = this.lvyeData.police_type;
          this.policeParam = JSON.stringify(this.lvyeData.police_param);
        }
      },

      faceinPassValue(val) {
        val < this.faceinRejectValue ? this.faceinRejectValue = this.faceinPassValue : null;
      },

      faceinRejectValue(val) {
        val > this.faceinPassValue ? this.faceinPassValue = this.faceinRejectValue : null;
      },

      lvyeType(val){
          this.lvyeTypeList.forEach(obj=>{
              if(val==obj.lvye_report_type){
                  this.isPoliceParam=obj.enable_police_param;
                  console.log(this.isPoliceParam)
              };
          })
      },
    },
    methods: {
      ...mapActions([
        'getConfig',
        'getWxhotelCityser',
        'WxhotelRegister',
        'deleteWxHotel',
        'getlvyeTypeList',
        'getFaceEqu',
        'patchConfig',
        'getPMS',
        'modifyPMS',
        'getPMSBrandList',

        'getLvye',
        'modifyLvye',
//        'modifyMoreLvye',
//        'deleteMoreLvye',
        'getMiniAppList',
//        'getWechatpayList',
        'getWechatpayProvider',
        'showtoast',
        'showalert',
        'goto',
//        'RCconfig',
//        "setRCconfig",
//        "getRCConfiged",
        "saveScriptUpload",
        "getServiceTypeScript",
//        "getPADMarkConfig",
//        "savePADMarkConfig",
//        "getRoomNum",
//        "saveReviewRoomNum",
//        "editReviewRoomNum"
      ]),
      handleCheckedStatusChange(value) {
        console.log('选中后的值',value)
        console.log(this.checkedStatus)
      },
      getLvyes() {
        this.getLvye({
          hotel_id: this.$route.params.hotelid,
          onsuccess:body=>{
            this.getlvyeTypeLists();
          }
        })
      },
      getlvyeTypeLists() {
        this.getlvyeTypeList({
          onsuccess: body => {
            this.lvyeTypeList = [...body.data];
            this.lvyeTypeList.forEach(item => {
              if (this.lvyeType === item.lvye_report_type) {
                this.isPoliceParam = item.enable_police_param;
                console.log(this.isPoliceParam)
              }
              ;
            })
            console.log('旅业类型列表', this.lvyeTypeList)
          }
        })
      },
      getAccessServiceType(){
          this.getServiceTypeScript({
              hotel_id: this.$route.params.hotelid,
              onsuccess: body => {
                 this.filterScript=body.data.filter_script_name ;
                 this.formatScript=body.data.format_script_name ;
                 this.enableAccessService=body.data.enabled_script;
                  if(this.filterScript||this.formatScript){
                      this.accessService=true;
                  }
              }
          })
      },
      saveAccessServiceType(data){
         this.saveScriptUpload({
             hotel_id: this.$route.params.hotelid,
             body:data,
             onsuccess: body => {
                 this.showDialog = false;
                 this.accessService=true;
             }
         });
      },
      beforeUploadformat(){
          this.fileList1=[]
      },
      beforeUploadfilter(){
          this.fileList2=[]
      },
      filterScriptSuccess(res,file,list){
        if(res.data) {
            this.filterScript = res.data.script_name;
        }
      },
      formatScriptSuccess(res,file,list){
          if(res.data) {
              this.formatScript = res.data.script_name;
          }
      },
      addAlterUrl(){
          console.log('============')
          console.log(this.urls)
        this.urls.push({url:''});
      },
      reduceAlterUrl(index){
        this.urls.splice(index,1);
      },

      goSummary() {
        this.goto({
          name: 'ConfigSummary'
        })
      },
      depswitch() {
          console.log(this.wxHotelId)
        if (this.wxHotelId) {
//            console.log('11111111111')
          this.delName = 'open';
          this.dialogConfig(enumShowType.WxHotelRegister)
        } else {
//          console.log('22222222222')
          this.delName = 'open';
          this.switchName = 'open';
          this.dialogConfig(enumShowType.wxHotel)
        }
      },
      dialogConfig(type) {
          console.log('------>',type)
        this.showType = type;
        if (type === enumShowType.PMS && this.PMSBrandList.length == 0) {
          this.getPMSBrandLists();
        } else if (type === enumShowType.wxHotel) {
          this.WxhotelRegisters()
        } else if (type === enumShowType.WxHotelRegister) {
          this.WxhotelRegisters()
          this.hideDialog();
        } else if (type === enumShowType.miniApp) {
          this.getMiniAppLists();
          this.wechatList();
        } else if (type === enumShowType.moreLvyeReportType){
          this.goto({name: 'moreLvyeConfig'});
          return;
        }
          this.showDialog = true;
      },
      wechatList() {
//        this.getWechatpayList({
//          onsuccess: (body, headers) => {
//            if (body.data && Array.isArray(body.data)) {
//              this.wechatpayList = body.data;
//            }
//          }
//        })
        this.getWechatpayProvider({
          provider: '0',
          onsuccess: (body, headers) => {
            if (body.data && Array.isArray(body.data)) {
              this.unProviderList = body.data;
            }
          }
        })
        this.getWechatpayProvider({
          provider: '1',
          onsuccess: (body, headers) => {
            if (body.data && Array.isArray(body.data)) {
              this.providerList = body.data;
            }
          }
        })

      },
      handleClose() {
        this.delName = 'close';
        this.switchName = 'close';
      },
        //弹框取消按钮
      hideDialog() {
        this.showDialog = false;
        switch (this.showType) {
          case enumShowType.PMS:
            this.wqtPublicNo=this.pmsData.pms_worker_id;
            //捷信达
            this.pmsId = this.pmsData.pms_id;
            this.checkout = this.pmsData.checkout == 'true' ? true : false;
            // this.pmsType = this.pmsData.pms_type; //放在计算属性
            this.hotelPmsCode = this.pmsData.hotel_pmscode;
            this.remark = this.pmsData.remark;
            this.hotelServiceUrl = this.pmsData.hotel_service_url;
            //绿云,西软
            this.crsURL = this.pmsData.crs_url;
            this.hotelGroupCode = this.pmsData.hotel_group_code;
            this.appKey = this.pmsData.app_key;
            this.PMSAppSecret = this.pmsData.app_secret;
            this.userCode = this.pmsData.usercode;
            this.password = this.pmsData.password;
            //别样红
            this.billServiceUrl = this.pmsData.bill_service_url;
            this.crmServiceUrl = this.pmsData.crm_service_url;
            this.orderServiceUrl = this.pmsData.order_service_url;
            this.secServiceUrl = this.pmsData.sec_service_url;
            this.userName = this.pmsData.user_name;
            this.userPass = this.pmsData.user_pass;
            //住哲
            this.cid = this.pmsData.cid;
            this.key = this.pmsData.key;
            this.dataKey = this.pmsData.datakey;
            this.adminName = this.pmsData.admin_name;
            this.adminPassword = this.pmsData.admin_password;
            this.brandId = this.pmsData.brand_id;
            //东呈
            this.dcKey = this.pmsData.key;
            //西软BS
            this.xrbs_groupCode=this.pmsData.hotelGroupCode;
            this.xrbs_appkey=this.pmsData.appKey;
            this.xrbs_authCode=this.pmsData.secret;
            this.xrbs_serviceVersion=this.pmsData.ver;
            this.xrbs_infoLanguage=this.pmsData.loc;
            this.xrbs_CRM=this.pmsData.cmmcode;
            this.xrbs_siteId=this.pmsData.pcid;
            this.xrbs_employeeNum=this.pmsData.empno;
            this.xrbs_moduleNum=this.pmsData.modu;
            break;
          case enumShowType.lvyeReportType:
            this.singlelvyeAutoReport = this.lvyeData.lvye_auto_report;
            this.lvyeType = this.lvyeData.lvye_report_type;
            this.policeId = this.lvyeData.hotel_ga_id;
            this.policeType = this.lvyeData.police_type;
            this.policeParam = JSON.stringify(this.lvyeData.police_param);
            break;
          case enumShowType.facein:
            this.faceinPassValue = this.configData.facein_pass_value ? +this.configData.facein_pass_value : 70;
            this.faceinRejectValue = this.configData.facein_reject_value ? +this.configData.facein_reject_value : 70;
            this.similarity=this.configData.show_similarity== 'true' ? true : false;
            this.autoIdentityCheckVal===this.configData.enabled_auto_identity_check ==='true' ? true : false;
            break;
          case enumShowType.wechatPay:
            this.payCode = this.configData.pay_code;
            this.refundCode = this.configData.refund_code;
            break;
          case enumShowType.wxHotel:
            this.wxHotelId = this.configData.wx_hotel_id;
            break;
          case enumShowType.miniApp:
            this.appId = this.configData;
            this.mchId = this.configData;
            this.providerAppId = this.configData;
            this.providerMchId = this.configData;
            this.provider = this.configData.provider ? true : false;
            break;
          case enumShowType.customization:
            this.mirrorIntro=this.configData.enabled_mirror_introduce=='true'?true:false;
            this.mirrorBrand=this.configData.enabled_mirror_brand=='true'?true:false;
            break;
          default:
        }
      },
      submitDialog() {
        let data;
        switch (this.showType) {
          case enumShowType.PMS: {
            let paramData = {
              pms_id: this.pmsId,
              checkout: this.checkout.toString(),
              pms_type: this.pmsType,
              hotel_pmscode: this.hotelPmsCode,
              remark: this.remark,
              hotel_service_url: this.hotelServiceUrl,
              urls:this.urls,
              pms_worker_id:this.wqtPublicNo
            };
            if (this.pmsType == '7' || this.pmsType == '2'||this.pmsType == '11'||this.pmsType == '14') {
              data = {
                ...paramData,
                crs_url: this.crsURL,
                hotel_group_code: this.hotelGroupCode,
                app_key: this.appKey,
                app_secret: this.PMSAppSecret,
                usercode: this.userCode,
                password: this.password,
              }
            } else if (this.pmsType == '1') {
              data = {
                ...paramData,
                bill_service_url: this.billServiceUrl,
                crm_service_url: this.crmServiceUrl,
                order_service_url: this.orderServiceUrl,
                sec_service_url: this.secServiceUrl,
                user_name: this.userName,
                user_pass: this.userPass,
              }
            } else if (this.pmsType == '3') {
              data = {
                ...paramData,
                cid: this.cid,
                key: this.key,
                datakey: this.dataKey,
                admin_name: this.adminName,
                admin_password: this.adminPassword,
                brand_id: this.brandId,
              }
            } else if (this.pmsType == '8') {
              data = {
                ...paramData,
                key: this.dcKey
              }
            }else if (this.pmsType == '12'){
              data = {
                  ...paramData,
                  hotelGroupCode:this.xrbs_groupCode,
                  appKey:this.xrbs_appkey,
                  secret:this.xrbs_authCode,
                  ver:this.xrbs_serviceVersion,
                  loc:this.xrbs_infoLanguage,
                  cmmcode:this.xrbs_CRM,
                  pcid:this.xrbs_siteId,
                  empno:this.xrbs_employeeNum,
                  modu:this.xrbs_moduleNum
              }
            }
            else {
              data = {
                ...paramData
              }
            }
            this.modifyPms(data);
            return;
          }
            break;
          case enumShowType.lvyeReportType: {
            let tempData = {
              lvye_auto_report: this.singlelvyeAutoReport,
              lvye_report_type: this.lvyeType,
              hotel_ga_id: this.policeId,
              police_type: this.policeType
            }
            if (!this.isPoliceParam) {
              data = {
                ...tempData
              }
            }else if(this.isPoliceParam){
              data = {
                ...tempData,
                police_param: JSON.parse(this.policeParam)
              }
            }
            this.modifyLvyes(data);
            return;
          }
          case enumShowType.doorLock_unknown:
            break;
          case enumShowType.facein:
            if (this.faceTongdao === '腾讯优图') {
                this.identity_check_channel = 'YOUTU';
            }
            if (this.faceTongdao === '厦门身份宝') {
                this.identity_check_channel = 'SHENFENBAO';
            }
            data = {
              facein_pass_value: this.faceinPassValue,//自动通过值
              facein_reject_value: this.faceinRejectValue,//自动拒绝值
              identity_check_channel: this.faceTongdao === '腾讯优图' ? 'YOUTU' : 'SHENFENBAO',
              shenfenbao_hotel_account: this.identityAccount,
              support_face_in: this.faceEqu,//是否支持人脸识别
              shenfenbao_reject_manual: this.shenfenbaoRejectManual,//身份宝拒绝是否人工参与
              show_similarity:this.similarity.toString(), //相似度
              enabled_auto_identity_check: this.autoIdentityCheckVal.toString()
            }
            break;
          case enumShowType.wechatPay:
            data = {
              pay_code: this.payCode,
              refund_code: this.refundCode,
              dayrent_name: this.dayrentName,
              pay_name: this.payName,
              refund_name: this.refundName,
              pms_pay_method:this.checkedStatus.join(',')
            }
            break;
          case enumShowType.wxHotel:
            data = {
              wx_hotel_id: this.wxHotelId
            }
            break;
          case enumShowType.miniApp: {
            if (this.provider) {
              data = {
                app_id: this.appId,
                mch_id: this.mchId,
                provider: this.provider,
                provider_app_id: this.providerAppId,
                provider_mch_id: this.providerMchId,
                app_name: this.appName,
                mch_name: this.mchName,
                provider_app_name: this.providerAppName,
                provider_mch_name: this.providerMchName
              }
            } else {
              data = {
                app_id: this.appId,
                mch_id: this.mchId,
                provider: this.provider,
                app_name: this.appName,
                mch_name: this.mchName
              }
            }
          }
            break;
          case enumShowType.customization:
            data = {
              "enabled_mirror_introduce": this.mirrorIntro.toString(),
              "enabled_mirror_brand": this.mirrorBrand.toString()
            }
            break;
          case enumShowType.accessServiceType:
            let tempData={
              enabled_script:this.enableAccessService
            };
            this.saveAccessServiceType(tempData);
            return;
            data = {
//                qrcode:this.serviceType,
//                qrcode:this.qrcode,
//                qrcode:this.qrName,
//                qrcode:this.remark
            }
            break;
          default:null
        };
        this.patchConfigData(data);
      },

      getConfigs() {
        this.getConfig({
          hotel_id: this.$route.params.hotelid
        })
      },
      getWxhotelCitysers() {
        this.getWxhotelCityser({
          onsuccess: body => (this.wxhotelCityserList = [...body.data])
        })
      },

      WxhotelRegisters() {
        this.WxhotelRegister({
          hotel_id: this.$route.params.hotelid,
          route_code: this.optionvalue,
          onsuccess: body => {
            this.RegistersWxHotelId = body.data.wx_hotel_id;
            this.switchName = 'close';
          }
        })
        this.showtoast({
          text: '注册成功',
          type: 'success'
        })
      },
      //删除微信生态酒店配置
      isDelete() {
        this.showDialog = false;
        this.queryDel = true;
        this.delName = 'close';
        this.switchName = 'close';
      },
      deleteWxHotels(flag) {
        if (flag) {
          this.deleteWxHotel({
            hotel_id: this.$route.params.hotelid,
            wx_hotel_id: this.wxHotelId||this.RegistersWxHotelId,
            onsuccess: (body, header) => {
              this.showtoast({
                text: '删除成功',
                type: 'success'
              })
            }
          });
        };
        this.queryDel = false;
        this.hideDialog();
      },

      //修改服务端数据
      patchConfigData(data) {
          console.log('debug:------->patchConfigData：',data)
        this.patchConfig({
          hotel_id: this.$route.params.hotelid,
          data: data,
          onsuccess: body => {
            this.showDialog = false;
          }
        })
      },
      getPms() {
        this.getPMS({
          hotel_id: this.$route.params.hotelid
        })

      },
      // 修改PMS
      modifyPms(data) {
        this.modifyPMS({
          hotel_id: this.$route.params.hotelid,
          data: data,
          onsuccess: body => {
            this.showDialog = false;
          }
        })
      },
      getPMSBrandLists() {
        this.getPMSBrandList({
          onsuccess: body => {
            if (body.data.length > 0) {
              this.PMSBrandList = body.data;
            } else {
              this.showtoast({
                text: '无PMS品牌',
                type: 'warning'
              })
            }
          }
        })
      },

      modifyLvyes(data) {
        this.modifyLvye({
          hotel_id: this.$route.params.hotelid,
          data: data,
          onsuccess: body => {
            this.showDialog = false;
          }
        })
      },
      getMiniAppLists() {
        this.getMiniAppList({
          onsuccess: (body, headers) => {
            this.miniAppList = body.data;
            if (this.miniAppList.length === 0) {
              this.showalert({
                code: 0,
                content: '小程序列表为空，请先添加小程序!'
              });
            }
          }
        })
      },
//      addInvoiceCode() {
//        this.invoiceCode.push('');
//      },
//      subtractInvoiceCode() {
//        if (this.invoiceCode.length == 1) return;
//        this.invoiceCode.pop();
//      },

//      saveFile(data, filename) {
//        var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
//        save_link.href = data;
//        save_link.download = filename;
//
//        var event = document.createEvent('MouseEvents');
//
//        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
//        save_link.dispatchEvent(event);
//      },

    }
  }
</script>
<style lang="less">
  .morelvyeCheckbox {
    .el-checkbox {
      margin-left: 0;
      margin-right: 1.5rem;
    }
  }
  .tip{
    color: #ff2b1c;
    font-size: 16px;
    margin-left: 9rem;
  }
  .module-wrapper {
    .content-configinfo {
      padding: 24px 20px 0 8px;
      .content-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 16px;
        margin-bottom: 18px;
        padding: 0 0 0 12px;
        i {
          font-size: 12px;
          font-style: normal;
        }
        a {
          color: #39C240;
          cursor: pointer;
        }
      }
      .el-row {
        padding-right: 20px;
        .el-col-8 {
          margin-bottom: 20px;
          button {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            background-color: #ffffff;
            border: solid 1px #E5E5E5;
            outline: none;
            color: #4A4A4A;
            padding: 12px 6px;
            position: relative;
            height: 110px;
            .item_img {
              width: 42px;
              height: 42px;
              text-align: center;
              border: solid 1px #E5E5E5;
              background-color: #FBFBFB;
              border-radius: 50%;
              padding: 10px;
              display: flex;
              align-items: center;
              -webkit-align-items: center;
              img {
                width: 38px;
                height: 38px;
              }
            }
            .item-text {
              text-align: start;
              margin-left: 10px;
              span {
                font-size: 16px;
              }
              p {
                font-size: 12px;
                margin-top: 5px;
              }
            }
            .tag_text {
              position: absolute;
              top: 5px;
              right: 5px;
              font-size: 16px;
            }
            .tag_text_red {
              color: #D0011B;
            }
            .tag_text_green {
              color: #39C240;
            }
            .tag_text_gray {
              color: #9B9B9B;
            }
          }
        }
        button {
          width: 100%;
          height: 90px;
        }
      }
      .el-right {
        width: 300px;
        margin-left: 16px;
      }
      .el-dialog {
        width: 68%;
        .el-dialog__header {
          padding: 0 20px;
          border-bottom: solid 1px #979797;
          .el-dialog__title {
            line-height: 43px;
            font-size: 16px;
            font-weight: 400;
            color: #4A4A4A;
          }
        }
        .lvyeItem {
          border-bottom: 1px solid #979797;;
        }
        .el-dialog__body {
          padding: 22px 20px 33px;
          .dialog-content {
            font-size: 14px;
            font-weight: 400;
            color: #4A4A4A;
            .item-form {
              position: relative;
              display: flex;
              align-items: center;
              margin-bottom: 10px;
              & > span {
                display: inline-block;
                min-width: 110px;
                text-align: end;
              }
              .el-select {
                width: 100%;
                .el-input {
                  width: 69.5%;
                }
              }
              .el-input {
                width: 60%;
              }
              .el-transfer{
                .el-input{
                  width: 100%;
                }
              }

              .el-switch {
                margin-left: 16px;
              }
              .el-radio {
                margin-left: 16px;
              }
            }
            article {
              ul {
                font-size: 14px;
                color: #9B9B9B;
                margin-left: 41px;
                line-height: 22px;
                li {
                  margin-left: 20px;
                }
              }
            }
            .item_large {
              display: flex;
              align-items: center;
              margin-bottom: 10px;
              span {
                min-width: 194px;
                text-align: end;
              }
              .el-input {
                width: 60%;
              }
            }
            .item-tag2 {
              display: flex;
              align-items: center;
              margin-bottom: 10px;
              & > span {
                display: inline-block;
                min-width: 110px;
                text-align: end;
              }
              .tag-input {
                position: relative;
                margin-left: 16px;
                width: 70%;
                .el-input {
                  width: 100%;
                  margin: 0 0 12px 0;
                }
                .tag-btn {
                  position: absolute;
                  bottom: 20px;
                  right: -62px;
                  button {
                    border-radius: 50px;
                    outline: none;
                    border: solid 1px;
                    margin-left: 5px;
                    padding-bottom: 2px;
                    background-color: #ffffff;
                    height: 20px;
                    width: 20px;
                  }
                }
              }
            }

            .item-tag {
              display: flex;
              align-items: flex-start;
              padding-left: 20px;
              span {
                width: 60px;
                text-align: end;
                line-height: 40px;
              }
              .tag-input {
                position: relative;
                margin-left: 16px;
                width: 70%;
                .el-input {
                  width: 100%;
                  margin: 0 0 12px 0;
                }
                .tag-btn {
                  position: absolute;
                  bottom: 20px;
                  right: -62px;
                  button {
                    border-radius: 50px;
                    outline: none;
                    border: solid 1px;
                    margin-left: 5px;
                    padding-bottom: 2px;
                    background-color: #ffffff;
                    height: 20px;
                    width: 20px;
                  }
                }
              }
            }
          }
        }
        .delLv {
          color: red;
          position: absolute;
          right: 0;
          display: inline-block;
          cursor: pointer;
        }
        .el-dialog__footer {
          padding: 10px 20px 28px;
          .dialog-footer {
            text-align: center;
            .el-button {
              width: 246px;
              border-radius: 0;
              line-height: 18px;
              margin: 0;
              &:nth-child(1) {
                margin-right: 22px;
              }
              &:nth-child(2) {
                background-color: #39C240;
                border-color: #39C240;
                color: #ffffff;
              }
            }
            .el-button--primary {
              background-color: transparent;
              border: solid 1px #979797;
              color: #4A4A4A;
            }
          }
        }
      }
    }
  }

  .el-autocomplete {
    width: 60%;
    margin-left: 16px;
  }

  .el-autocomplete .el-input {
    width: 100% !important;
  }

  .qrcode-img {
    display: flex;
    justify-content: center;
  }

  //我的
  .el-dialog__headerbtn {

  }

  .reg {
    display: block;
    width: 200px;
    margin-top: 25px;
    margin-left: 35px;
  }
  .bottoomLine{
    padding-top: 2rem;
    border-bottom: 1px solid #000000;
  }
  .el-transfer-panel__filter {
    padding: 0.2rem 1rem 1.1rem 1rem;
    width: 100%;
  }
  .reduceImg{
    display: inline-block;
    width:2rem;
    height: 2rem;
    margin-left: 1rem;
  }
  .module-wrapper .content-configinfo .el-dialog .el-dialog__body .dialog-content .item_large .el-checkbox-group{
    margin-left:16px;
    span{
      min-width:0;
    }
  }

</style>
