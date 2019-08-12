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
                  :class="{'tag_text_red': !this.pmsId, 'tag_text_green': this.pmsId}">{{this.pmsId ? '已配置' : '未配置'}}</span>
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
                  :class="{'tag_text_red': (payCode), 'tag_text_green': (payCode)}">{{(payCode) ? '已配置' : '未配置'}}</span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.syncSpaceTime)">
            <div class="item_img">
              <img src="../../../../../../assets/images/同步.png" alt="a">
            </div>
            <div class="item-text">
              <span>PMS同步频率</span>
              <p>设置自动同步周期</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !syncSpaceTime, 'tag_text_green': syncSpaceTime}">{{syncSpaceTime ? '已配置' : '未配置'}}</span>
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
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.withoutCard)">
            <div class="item_img">
              <img src="../../../../../../assets/images/公安.png" alt="a">
            </div>
            <div class="item-text">
              <span>无证核验配置</span>
              <p>酒店是否开启无证核验，核验金额，充值金额配置</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !withoutCardConfig, 'tag_text_green': withoutCardConfig}">{{withoutCardConfig ? '已开通' : '未开通'}}</span>
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
          <button @click="dialogConfig(enumShowType.isShowPoliceHandeld)">
            <div class="item_img">
              <img src="../../../../../../assets/images/标签.png" alt="a">
            </div>
            <div class="item-text">
              <span>公安验证是否显示已处理列表配置</span>
              <p>企业微信公安验证是否显示已处理列表</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red':!showPoliceHandledList , 'tag_text_green': showPoliceHandledList}">{{showPoliceHandledList? '已开通' : '未开通'}}
            </span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.reviewRoomNum)">
            <div class="item_img">
              <img src="../../../../../../assets/images/标签.png" alt="a">
            </div>
            <div class="item-text">
              <span>旅业房间号核对配置</span>
              <p>匹配PMS，房间号手动输入旅业房间号</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !isHaveRoomNumReviewList, 'tag_text_green': isHaveRoomNumReviewList}">{{isHaveRoomNumReviewList ? '已配置' : '未配置'}}
            </span>
          </button>
        </el-col>
        <el-col :span="8">
          <button @click="dialogConfig(enumShowType.roomCard)">
            <div class="item_img">
              <img src="../../../../../../assets/images/卡.png" alt="a">
            </div>
            <div class="item-text">
              <span>房卡配置</span>
              <p>酒店房卡,对接门锁配置</p>
            </div>
            <span class="tag_text"
                  :class="{'tag_text_red': !supportRoomCard||issuedCardRuleVal, 'tag_text_green': supportRoomCard||issuedCardRuleVal}">{{supportRoomCard||issuedCardRuleVal ? '已配置' : '未配置'}}</span>
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
          <!--Pms对接配置弹框-->
          <div v-if="showType === enumShowType.PMS">
            <div class="item-form">
              <span>PMS品牌</span>
              <el-select class="el-right" v-model="pmsId" placeholder="请选择PMS品牌"  @change="changeOption">
                <el-option
                  v-for="(obj, index) of PMSBrandList"
                  :key="obj.id"
                  :label="obj.name"
                  :value="obj.id"
                 >
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
            <div v-show="pmsType == '2' || pmsType == '7'|| pmsType == '11'||pmsType == '14' ">
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
            <div  v-show="pmsType == '17' ">
              <div class="item-form">
                <span>key</span>
                <el-input class="el-right" v-model="userCode" placeholder="请输入key"></el-input>
              </div>
              <div class="item-form">
                <span>appKey</span>
                <el-input class="el-right" v-model="appKey" placeholder="请输入appKey"></el-input>
              </div>
              <div class="item-form">
                <span>domain</span>
                <el-input class="el-right" v-model="hotelGroupCode" placeholder="请输入domain"></el-input>
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
            <!--伯乐相马-->
            <div v-show="pmsType == '16' ">
              <div class="item-form">
                <span>用户名</span>
                <el-input class="el-right" v-model="userName" placeholder="请输入用户名，选填"></el-input>
              </div>
              <div class="item-form">
                <span>密码</span>
                <el-input class="el-right" v-model="password" placeholder="请输入密码，选填"></el-input>
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
            <div class="item-form">
              <span>pms接口是否支持续住</span>
              <el-switch
                v-model="pmsCheckIn"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
          </div>
          <!--PMS支付配置弹框-->
          <div v-if="showType === enumShowType.wechatPay">
            <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
              <el-tab-pane label="微信支付" name="first">
                <div class="item_large">
                  <span>支付方式</span>
                  <div>
                    <el-checkbox-group v-model="checkedStatus" @change="handleCheckedStatusChange">
                      <el-checkbox v-for="sta in status" :label="sta" :key="sta">{{(sta=='2')?'刷脸支付(POS机)':((sta=='3')?'微信预授权':'刷脸支付(POS机)')}}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
                <div class="item_large">
                  <span>账务收款代码</span>
                  <el-input class="el-right" v-model="payCode" placeholder="请输入酒店微信账务收款代码"></el-input>
                </div>
                <div class="item_large">
                  <span>账务退款代码</span>
                  <el-input class="el-right" v-model="refundCode" placeholder="请输入酒店微信账务退款代码"></el-input>
                </div>
                <div class="item_large">
                  <span>房租房费关键词</span>
                  <el-input class="el-right" v-model="dayrentName" placeholder="请输入"></el-input>
                </div>
                <div class="item_large">
                  <span>支付项目名</span>
                  <el-input class="el-right" v-model="payName" placeholder="请输入"></el-input>
                </div>
                <div class="item_large">
                  <span>退款项目名</span>
                  <el-input class="el-right" v-model="refundName" placeholder="请输入"></el-input>
                </div>
              </el-tab-pane>
              <el-tab-pane label="支付宝支付" name="second">
                <div class="item_large">
                  <span>支付方式</span>
                  <div>
                    <el-checkbox-group v-model="checkedStatus" @change="handleCheckedStatusChange">
                      <el-checkbox v-for="sta in statusa" :label="sta" :key="sta">{{(sta=='2')?'扫码支付':''}}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
                <div class="item_large">
                  <span>账务收款代码</span>
                  <el-input class="el-right" v-model="payCode" placeholder="请输入酒店微信账务收款代码"></el-input>
                </div>
                <div class="item_large">
                  <span>账务退款代码</span>
                  <el-input class="el-right" v-model="refundCode" placeholder="请输入酒店微信账务退款代码"></el-input>
                </div>
                <div class="item_large">
                  <span>房租房费关键词</span>
                  <el-input class="el-right" v-model="dayrentName" placeholder="请输入"></el-input>
                </div>
                <div class="item_large">
                  <span>支付项目名</span>
                  <el-input class="el-right" v-model="payName" placeholder="请输入"></el-input>
                </div>
                <div class="item_large">
                  <span>退款项目名</span>
                  <el-input class="el-right" v-model="refundName" placeholder="请输入"></el-input>
                </div>
              </el-tab-pane>
              <el-tab-pane label="微信预授权" name="three">
                <div class="item_large">
                  <span>支付方式</span>
                  <div>
                    <el-checkbox-group v-model="checkedStatus" @change="handleCheckedStatusChange">
                      <el-checkbox v-for="sta in status" :label="sta" :key="sta">{{(sta=='2')?'刷脸支付(POS机)':((sta=='3')?'微信预授权':'刷脸支付(POS机)')}}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
                <div class="item_large">
                  <span>账务收款代码</span>
                  <el-input class="el-right" v-model="payCode" placeholder="请输入酒店微信账务收款代码"></el-input>
                </div>
                <div class="item_large">
                  <span>账务退款代码</span>
                  <el-input class="el-right" v-model="refundCode" placeholder="请输入酒店微信账务退款代码"></el-input>
                </div>
                <div class="item_large">
                  <span>房租房费关键词</span>
                  <el-input class="el-right" v-model="dayrentName" placeholder="请输入"></el-input>
                </div>
                <div class="item_large">
                  <span>支付项目名</span>
                  <el-input class="el-right" v-model="payName" placeholder="请输入"></el-input>
                </div>
                <div class="item_large">
                  <span>退款项目名</span>
                  <el-input class="el-right" v-model="refundName" placeholder="请输入"></el-input>
                </div>
              </el-tab-pane>
              <el-tab-pane label="支付宝预授权" name="four">
                <div class="item_large">
                  <span>支付方式</span>
                  <div>
                    <el-checkbox-group v-model="checkedStatus" @change="handleCheckedStatusChange">
                      <el-checkbox v-for="sta in statusa" :label="sta" :key="sta">{{(sta=='2')?'扫码支付':''}}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
                <div class="item_large">
                  <span>账务收款代码</span>
                  <el-input class="el-right" v-model="payCode" placeholder="请输入酒店微信账务收款代码"></el-input>
                </div>
                <div class="item_large">
                  <span>账务退款代码</span>
                  <el-input class="el-right" v-model="refundCode" placeholder="请输入酒店微信账务退款代码"></el-input>
                </div>
                <div class="item_large">
                  <span>房租房费关键词</span>
                  <el-input class="el-right" v-model="dayrentName" placeholder="请输入"></el-input>
                </div>
                <div class="item_large">
                  <span>支付项目名</span>
                  <el-input class="el-right" v-model="payName" placeholder="请输入"></el-input>
                </div>
                <div class="item_large">
                  <span>退款项目名</span>
                  <el-input class="el-right" v-model="refundName" placeholder="请输入"></el-input>
                </div>
              </el-tab-pane>
              <el-tab-pane label="好码齐支付" name="five">
                <div class="item_large">
                  <span>支付方式</span>
                  <div>
                    <el-checkbox-group v-model="checkedStatus" @change="handleCheckedStatusChange">
                      <el-checkbox v-for="sta in statusa" :label="sta" :key="sta">{{(sta=='2')?'扫码支付':''}}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
                <div class="item_large">
                  <span>账务收款代码</span>
                  <el-input class="el-right" v-model="payCode" placeholder="请输入酒店微信账务收款代码"></el-input>
                </div>
                <div class="item_large">
                  <span>账务退款代码</span>
                  <el-input class="el-right" v-model="refundCode" placeholder="请输入酒店微信账务退款代码"></el-input>
                </div>
                <div class="item_large">
                  <span>房租房费关键词</span>
                  <el-input class="el-right" v-model="dayrentName" placeholder="请输入"></el-input>
                </div>
                <div class="item_large">
                  <span>支付项目名</span>
                  <el-input class="el-right" v-model="payName" placeholder="请输入"></el-input>
                </div>
                <div class="item_large">
                  <span>退款项目名</span>
                  <el-input class="el-right" v-model="refundName" placeholder="请输入"></el-input>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
          <!--Pms同步频率弹框-->
          <div v-if="showType === enumShowType.syncSpaceTime">
            <div class="item-form">
              <span>同步时间</span>
              <el-time-picker class="el-right"
                              is-range
                              v-model="syncTime" value-format="HH:mm:ss"
                              range-separator="至"
                              start-placeholder="开始时间"
                              end-placeholder="结束时间"
                              placeholder="选择时间范围">
              </el-time-picker>
            </div>
            <div class="item-form">
              <span>PMS同步频率</span>
              <el-select class="el-right" v-model="syncSpaceTime" placeholder="请选择PMS同步频率">
                <el-option
                  v-for="(obj, index) in syncSpaceTimeList"
                  :key="index"
                  :label="obj.name"
                  :value="obj.value">
                </el-option>
              </el-select>
            </div>
            <div class="item-form">
              <span>同步几天内的订单</span>
              <el-input class="el-right" v-model="inputOrderId" placeholder="1"></el-input>
            </div>
            <div class="item-form">
              <span>是否需要自动同步？</span>
              <el-switch
                v-model="scheduledSure"
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
          <!--无证核验配置-->
          <div v-if="showType === enumShowType.withoutCard">
            <div class="item-form">
              <span style="width: 155px">无证核验</span>
              <el-switch on-color="#13ce66"off-color="#ff4949" v-model="withoutCardConfig"></el-switch>
            </div>
            <!--<div class="item-form" v-if="withoutCardConfig">-->
            <!--<span style="width: 155px">充值金额（元）</span>-->
            <!--<el-input class="el-right" v-model="rangeMoney" style="display:block"></el-input>-->
            <!--</div>-->
            <div class="item-form" v-if="withoutCardConfig">
              <span style="width: 155px">付费来源</span>
              <div style="margin-left:20px">
                <!--<el-checkbox-group v-model="checkedMoney" @change="handleCheckedCitiesChange">-->
                <!--<el-checkbox v-for="sta in moneyStatus" :label="sta" :key="sta">{{(sta =='1')?'酒店付费':'顾客付费'}}</el-checkbox>-->
                <!--</el-checkbox-group>-->
                <el-radio v-model="checkedMoney" label="1">酒店付费</el-radio>
                <el-radio v-model="checkedMoney" label="2">顾客付费</el-radio>
              </div>
            </div>
            <div class="item-form" v-if="withoutCardConfig">
              <span style="width: 155px">无证核验金额（元）</span>
              <el-input class="el-right" v-model="checkMoney" style="display:block"></el-input>
            </div>
            <div class="item-form" v-if="withoutCardConfig">
              <span style="width: 155px">余额不足提醒金额（元）</span>
              <el-input class="el-right"v-model="balanceTip" style="display:block"></el-input>
            </div>
            <div class="item-form" v-if="withoutCardConfig">
              <span style="width: 155px">备注</span>
              <el-input class="el-right"v-model="beizhu" style="display:block" placeholder="关联到消费记录中的备注"></el-input>
            </div>
            <!--<div class="item-form" v-if="withoutCardConfig">-->
            <!--<span style="width: 155px">无证收费方式</span>-->
            <!--<el-select v-model="collectionManner" placeholder="请选择无证收费方式" style="width:60%;margin-left:16px!important">-->
            <!--<el-option v-for="(item, index) in collection" :key="index" :label="item.methods" :value="item.id">-->
            <!--</el-option>-->
            <!--</el-select>-->
            <!--</div>-->
          </div>
          <!--人脸识别配置弹框-->
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
          <!--公安验证显示已处理列表-->
          <div v-if="showType === enumShowType.isShowPoliceHandeld">
            <div class="item-form">
              <span>企业微信公安验证显示已处理列表</span>
              <el-switch
                v-model="showPoliceHandledList"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
          </div>
          <!--旅业房号核验配置-->
          <div v-if="showType === enumShowType.reviewRoomNum">
            <div class="item-form">
              <span>PMS房间号与旅业房间号核对:</span>
            </div>
            <div class="item-form">
              <table-roomNumReview :list="renderRoomNumReviewList" :page="page" :size="size"></table-roomNumReview>
            </div>
            <div class="item-form">
              <el-pagination
                v-show="total > size"
                @size-change="handleSizeChange"
                @current-change="handleCurrentPageChange"
                :current-page="page"
                :page-sizes="[10, 20, 30]"
                :page-size="size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
            </div>
          </div>
          <!--房卡配置-->
          <div v-if="showType === enumShowType.roomCard">
            <div class="item-form">
              <span>是否支持吞吐门卡？</span>
              <el-switch
                v-model="supportRoomCard"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
            <div class="item-form">
              <span>是否对接门锁</span>
              <el-switch
                v-model="inteRoomLock"
                on-color="#13ce66"
                off-color="#ff4949">
              </el-switch>
            </div>
            <div class="item-form">
              <span>选择分房卡类型</span>
              <el-select class="el-right" v-model="issuedCardRuleVal">
                <el-option
                  v-for="(item, index) in issuedCardRuleList"
                  :key="index"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <!--旅业系统配置弹框-->
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
              <div v-if="lvyeType=='SUZHOU'">
                <div class="item-form">
                  <span>旅业是否自动充值</span>
                  <el-switch
                    v-model="isLvyeAutoCharge"
                    on-color="#13ce66"
                    off-color="#ff4949">
                  </el-switch>
                </div>
                <div class="item-form" v-if="isLvyeAutoCharge">
                  <span>充值金额</span>
                  <el-input class="el-right" v-model="lvyeAmount" placeholder="请输入充值金额"></el-input>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--弹框footer-->
        <div slot="footer" class="dialog-footer" v-if="switchName === 'close' && delName==='close'">
            <el-button @click="hideDialog">取 消</el-button>
            <el-button :disabled="!validateAll" type="primary" @click="submitDialog">确 定</el-button>
        </div>
        <!--footer-->
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
    wechatPay: 2,  //PMS 支付配置
    syncSpaceTime:3, //PMS同步频率
    accessServiceType:4,  //酒店业务类型配置
    withoutCard:5,        //无证核验配置
    lvyeReportType:6,     //旅业配置
    facein:7,            //人脸识别配置
    isShowPoliceHandeld:8,  //公安核验是否显示已处理
    reviewRoomNum:9,       //旅业房号核验配置
    roomCard:10,     //房卡配置
    moreLvyeReportType:11,//多旅业系统配置
  }
  //弹框标题类型
  const typeTitles = ['是否删除',
    'PMS信息',
    '',
    'PMS同步频率',
    '酒店业务类型配置',
    '无证核验配置',
    '旅业配置',
    '人脸识别配置',
    '公安核验是否显示已处理',
    '旅业房号核验配置',
    '房卡配置',
    '多旅业系统配置',
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
        pmsCheckIn:false,
 // **********pms同步频率*********************
        syncSpaceTime: '30',
        scheduledSure: true,
        syncSpaceTimeList: [
          {name: '10分钟', value: '10'}, {name: '20分钟', value: '20'}, {name: '30分钟', value: '30'},
          {name: '1小时', value: '60'}, {name: '2小时', value: '120'}, {name: '3小时', value: '180'},
          {name: '6小时', value: '360'}, {name: '12小时', value: '720'}, {name: '24小时', value: '1440'}],
        inputOrderId:'1',  //同步几天内的订单
        syncTime:'', //同步时间
        startTime:'',//开始时间
        endTime:'',//结束时间

// **********无证核验*********************
        withoutCardConfig:false,
        openWithoutCard:true,
        // rangeMoney:'',
        checkMoney:'',
        balanceTip:'',
        // moneyStatus:['1','2'],
        checkedMoney:'1',
        beizhu:'',
        // collectionManner:'',
        // collection:[{'id':'1','methods':'向客人收费'},{'id':'2','methods':'向酒店收费'}]
 // **********旅业房号配置*********************
        showPoliceHandledList:false,
        //门卡配置
        supportRoomCard: true,
        issuedCardRuleVal: '',
        inteRoomLock: false,
        issuedCardRuleList: [
          {name: '一房一卡', value: 'OTO'},
          {name: '一房多卡', value: 'OTM'}
        ],
// **********旅业配置*********************
        lvyeTypeList: [],
        singlelvyeAutoReport: '',
        lvyeType: '',
        policeId: '',
        policeType: '',
        policeParam: '',
        LvyeConfigItemList:[{name:'全自动上传',value:'AUTO'},{name:'全手工上传',value:'MANUAL'},{name:'仅自动上传有房号的',value:'HAS_ROOM_NO'}],
        isPoliceParam:false,
        isLvyeAutoCharge:false, // 苏州旅业是否开启自动充值
        lvyeAmount:100000,//充值金额
//        值房通是否显示多房订单
        no_support_zft_mroom: false,
        showMoreRoomOrderKey: 'support_zft_mroom',
        showMoreRoomOrder: false,
        appPolice: false,
        appOrder: false,
        appIdentity: false,
        appLiveIn: false,
        appInvoice: false,
        appMoney: false,
        appAbnormal: false,
        appSuspicious: false,
        appDirtyRoom: false,
        order_hint_item_idFromPAD: '',
        apply_checkout_finish_idFromPAD: '',
        non_equipment_checkin_idFromPAD: '',
        checkout_failure_idFromPAD: '',
        roomNumReviewList: [],
        page: 1,
        size: 10,
        total: 0,
        isHaveRoomNumReviewList: false,
        showPoliceHandledList: false,
        enabledAdvancedLiveIn:false,  //入住规则

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
        checkedStatus:[],
        status:['2','3'],

        statusa:['2'],


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

        activeName2: 'first',
        isShowPMSDialog:true,

        queryDel:false,
      }

    },
    mounted() {
      this.getLvyes();
      this.getConfigs();
      this.initPMSPayConfig();
      this.getWxhotelCitysers();
      this.getPms();
      this.wechatList();
    //  this.WxhotelRegisters();
//      this.getRCConfigeds();

//      this.getPADMarkConfigs();
//      this.getRoomNumList()
      // this.getMoreLvye({hotel_id: this.$route.params.hotelid})
      this.getAccessServiceType();

    },
    computed: {
      ...mapState({
        pmsData: state => state.enterprise.pmsData,
        configData: state => state.enterprise.configData,
        lvyeData: state => state.enterprise.lvyeData,
        wechatAppData: state => state.enterprise.wechatAppData,
        hotelName: state => state.enterprise.tempHotelName,
        showReception: state => state.enterprise.showReception,
        showMoreLvyeConfig:  state => state.enterprise.showMoreLvyeConfig

      }),
      renderRoomNumReviewList(){
        return this.roomNumReviewList;
      },
      groupId(){
        return this.$route.params.id
      },
      hotelId(){
        return this.$route.params.hotelid
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
      validatePMS() {
        if (tool.isNotBlank(this.pmsId) && tool.isNotBlank(this.pmsType) && tool.isNotBlank(this.hotelPmsCode) && tool.isNotBlank(this.hotelServiceUrl)) {
          if (this.pmsType == '1') {
             return tool.isNotBlank(this.billServiceUrl) && tool.isNotBlank(this.crmServiceUrl) && tool.isNotBlank(this.orderServiceUrl) && tool.isNotBlank(this.secServiceUrl) && tool.isNotBlank(this.userName) && tool.isNotBlank(this.userPass)
          } else if (this.pmsType == '3') {
            return tool.isNotBlank(this.cid) && tool.isNotBlank(this.key) && tool.isNotBlank(this.dataKey)
          } else if (this.pmsType == '8') {
            return tool.isNotBlank(this.dcKey)
          } else if (this.pmsType == '17') {
            return tool.isNotBlank(this.userCode) && tool.isNotBlank(this.appKey) && tool.isNotBlank(this.hotelGroupCode)
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
          // if (tool.isNotBlank(this.policeId) && tool.isNotBlank(this.policeType) && isNaN(+this.policeParam)) {
          //   let flag = true;
          //   try {
          //     JSON.parse(this.policeParam);
          //   } catch (e) {
          //     flag = false;
          //   }
          //   return flag;
          // }
          // return false;
          return tool.isNotBlank(this.policeId) && tool.isNotBlank(this.policeType) && tool.isNotBlank(+this.policeParam);
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
       // if(this.activeName2=='first'){
          return tool.isNotBlank(this.payCode) && tool.isNotBlank(this.refundCode) && tool.isNotBlank(this.dayrentName) && tool.isNotBlank(this.payName) && tool.isNotBlank(this.refundName)&& tool.isNotBlank(this.checkedStatus);
        // }else{
        //   return tool.isNotBlank(this.payCodea) && tool.isNotBlank(this.refundCodea) && tool.isNotBlank(this.dayrentNamea) && tool.isNotBlank(this.payNamea) && tool.isNotBlank(this.refundNamea)&& tool.isNotBlank(this.checkedStatusa);
        // }

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
      validateWithoutCard(){
        if(
          // tool.isNotBlank(this.rangeMoney)&&
          tool.isNotBlank(this.checkMoney)&&tool.isNotBlank(this.balanceTip)){
          return false;
        }else {
          return true
        }
      },
      validateroomCard() {
        return tool.isNotBlank(this.issuedCardRuleVal);
      },
      validateAll() {
        let result = false;
        switch (this.showType) {
          case enumShowType.PMS:
            result = this.validatePMS;
            break;
          case enumShowType.wechatPay:
            result = this.validatewechatPay;
            break;
          case enumShowType.syncSpaceTime:
            result = true;
            break;
          case enumShowType.withoutCard:
            result = this.validateWithoutCard;
            break;
          case enumShowType.facein:
            result = this.validatefacein;
            break;
          case enumShowType.isShowPoliceHandeld:
            result = true;
            break;
          case enumShowType.reviewRoomNum:
            result = true;
            break
          case enumShowType.roomCard:
            result = this.validateroomCard;
            break;
          case enumShowType.lvyeReportType:
            result = this.validatelvyeReportType;
            break;
          case enumShowType.doorLock_unknown:
            result = this.validatedoorLock_unknown;
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
      pmsData() {
        if (tool.isNotBlank(this.pmsData)) {
          //PMS信息this.pmsData
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
      configData(){
        let configData = this.configData;
        console.log('configData:',configData)
        this.appId = configData
        if (tool.isNotBlank(configData)) {

          //微信支付配置
          this.mchId = configData;
          //小程序配置
          this.appId = configData;
          this.providerAppId = configData;
          this.providerMchId = configData;
          this.provider = configData.provider ? true : false;

          //pms同步频率
          this.syncSpaceTime = configData.sync_space_time;
          this.scheduledSure = configData.scheduled;
          this.inputOrderId = configData.max_order_day
          let extract_time = configData.extract_start_time+','+configData.extract_end_time
          this.syncTime =extract_time.split(',')

          //无证核验
          this.withoutCardConfig=configData.enable_identity_check_undocumented== 'true' ? true : false;
          // this.rangeMoney=configData.recharge_lowest;
          this.checkMoney=configData.nocard_used_pay;
          this.balanceTip=configData.nocard_money_insufficient;
          this.openWithoutCard= configData.enable_identity_check_undocumented == 'true' ? true : false;
          // this.collectionManner= configData.nocard_pay_mode
          this.beizhu = configData.nocard_remarks_content
          this.checkedMoney = configData.nocard_pay_mode

          //人脸识别配置
          this.faceinPassValue = configData.facein_pass_value ? +configData.facein_pass_value : 70;
          this.faceinRejectValue = configData.facein_reject_value ? +configData.facein_reject_value : 70;
          this.faceTongdao = configData.identity_check_channel === 'YOUTU' ? '腾讯优图' : '厦门身份宝';
          this.identityAccount = configData.shenfenbao_hotel_account;
          this.shenfenbaoRejectManual = configData.shenfenbao_reject_manual;
          this.faceEqu = configData.support_face_in;
          this.similarity=configData.show_similarity === 'true' ? true : false;
          this.autoIdentityCheckVal = configData.enabled_auto_identity_check === 'true' ? true : false;
          //公安验证是否显示已处理列表配置
          this.showPoliceHandledList = configData.enable_show_plice_processed == 'true' ? true : false


          //门卡配置
          this.supportRoomCard = configData.support_room_card == 'true' ? true : false;
          this.issuedCardRuleVal = configData.issued_card_rule;
          this.inteRoomLock = configData.integration_room_lock == 'true' ? true : false;


          //是否续住
          this.pmsCheckIn =configData.pms_enable_extension == 'true' ? true : false
          console.log('是否续住',this.pmsCheckIn)
          //门锁配置，暂无


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

          if(configData.lvye_auto_charge!=undefined){
            this.isLvyeAutoCharge=JSON.parse(configData.lvye_auto_charge); // 苏州旅业是否开启自动充值
            this.lvyeAmount=configData.lvye_auto_charge_amount/100;//充值金额
          }

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
          "getRoomNum",
//        "saveReviewRoomNum",
//        "editReviewRoomNum"
       'getPMSPayConfig'
      ]),
      //查询所以PMS房间号
      getRoomNumList(){
        this.getRoomNum({
          hotel_id: this.$route.params.hotelid,
          page: this.page,
          size: this.size,
          onsuccess: (body, headers) => {
            this.roomNumReviewList = body.data;
            if (body.data && body.data.length !== 0) {
              this.isHaveRoomNumReviewList = true
            } else {
              this.isHaveRoomNumReviewList = false
            }

            this.total = parseInt(headers['x-total'])
          }
        })
      },
      goSummary() {
        this.goto({
          name: 'ConfigSummary'
        })
      },
      handleSizeChange(val) {
        this.size = val;
        this.getRoomNumList();
      },
      handleCurrentPageChange(val){
        this.page = val;
        this.getRoomNumList();
      },
      changeOption(){
        this.wqtPublicNo='';
        //捷信达
        this.checkout =  false;
        // this.pmsType = this.pmsData.pms_type; //放在计算属性
        this.hotelPmsCode = "";
        this.remark = "";
        this.hotelServiceUrl = "";
        //绿云,西软
        this.crsURL = "";
        this.hotelGroupCode = "";
        this.appKey = "";
        this.PMSAppSecret = "";
        this.userCode = "";
        this.password = ""
        //别样红
        this.billServiceUrl = "";
        this.crmServiceUrl = "";
        this.orderServiceUrl = "";
        this.secServiceUrl ="";
        this.userName = "";
        this.userPass = "";
        //住哲
        this.cid = "";
        this.key = "";
        this.dataKey = "";
        this.adminName ="";
        this.adminPassword = "";
        this.brandId = "";
        //东呈
        this.dcKey = "";
        //西软BS
        this.xrbs_groupCode="";
        this.xrbs_appkey="";
        this.xrbs_authCode="";
        this.xrbs_serviceVersion="";
        this.xrbs_infoLanguage="";
        this.xrbs_CRM="";
        this.xrbs_siteId="";
        this.xrbs_employeeNum="";
        this.xrbs_moduleNum="";
      },
      initPMSPayConfig(){
        this.getPMSPayConfig({
          hotel_id: this.$route.params.hotelid,
          key:'pms_wechatpay_config',
          onsuccess:body=>{
            if(body.data!=null){
              this.payCode = body.data.pay_code;
              this.refundCode = body.data.refund_code;
              this.dayrentName = body.data.dayrent_name;
              this.payName = body.data.pay_name;
              this.refundName = body.data.refund_name;
              this.checkedStatus=body.data.pms_pay_method.split(',')
            }else{
              this.payCode = '';
              this.refundCode  = '';
              this.dayrentName  = '';
              this.payName = '';
              this.refundName = '';
              this.checkedStatus = [];
            }
          }
        });
      },
      handleClick(tab,event){
        let key='';
        console.log(tab.name);
        switch (tab.name) {
          case 'first' :
            key='pms_wechatpay_config'; break;
          case 'second' :
            key='pms_alipay_config' ; break;
          case 'three' :
            key='pms_wechat_authority_config';     break;
          case 'four' :
            key='pms_alipay_authority_config';     break;
          case 'five' :
            key='pms_how_much_config';             break;
        }
        this.getPMSPayConfig({
          hotel_id: this.$route.params.hotelid,
          key:key,
          onsuccess:body=>{
            if(body.data!=null){
              this.payCode = body.data.pay_code;
              this.refundCode = body.data.refund_code;
              this.dayrentName = body.data.dayrent_name;
              this.payName = body.data.pay_name;
              this.refundName = body.data.refund_name;
              this.checkedStatus=body.data.pms_pay_method.split(',')
            }else{
              this.payCode = '';
              this.refundCode  = '';
              this.dayrentName  = '';
              this.payName = '';
              this.refundName = '';
              this.checkedStatus = [];

            }
          }
        });
      },
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
        }else if (type === enumShowType.reviewRoomNum) {
          this.getRoomNumList();
        }else if (type === enumShowType.wechatPay) {
        // this.initPMSPayConfig();
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
          case enumShowType.wechatPay:
            this.initPMSPayConfig();
            break;
          case enumShowType.syncSpaceTime:
            this.syncSpaceTime = this.configData.sync_space_time;
            let extract_time = this.configData.extract_start_time+','+this.configData.extract_end_time
            this.syncTime = extract_time.split(',')
            this.inputOrderId = this.configData.max_order_day
            this.scheduledSure = this.configData.scheduled
            break;
          case enumShowType.withoutCard:
            this.appValue=this.configData.business_mode;
            break;
          case enumShowType.facein:
            this.faceinPassValue = this.configData.facein_pass_value ? +this.configData.facein_pass_value : 70;
            this.faceinRejectValue = this.configData.facein_reject_value ? +this.configData.facein_reject_value : 70;
            this.similarity=this.configData.show_similarity== 'true' ? true : false;
            this.autoIdentityCheckVal===this.configData.enabled_auto_identity_check ==='true' ? true : false;
            break;
          case enumShowType.isShowPoliceHandeld:
            this.showPoliceHandledList = this.configData.enable_show_plice_processed == 'true' ? true : false
            break;
          case enumShowType.roomCard:
            this.supportRoomCard = this.configData.support_room_card == 'true' ? true : false;
            this.issuedCardRuleVal = this.configData.issued_card_rule;
            this.inteRoomLock = this.configData.integration_room_lock == 'true' ? true : false;
            ;
            break;




          case enumShowType.lvyeReportType:
            this.singlelvyeAutoReport = this.lvyeData.lvye_auto_report;
            this.lvyeType = this.lvyeData.lvye_report_type;
            this.policeId = this.lvyeData.hotel_ga_id;
            this.policeType = this.lvyeData.police_type;
            this.policeParam = JSON.stringify(this.lvyeData.police_param);
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
              pms_worker_id:this.wqtPublicNo,
              pms_enable_extension:this.pmsCheckIn
            };
            if (this.pmsType == '7' || this.pmsType == '2'||this.pmsType == '11'||this.pmsType == '14' || this.pmsType == '17') {
              data = {
                ...paramData,
                crs_url: this.crsURL,
                hotel_group_code: this.hotelGroupCode,
                app_key: this.appKey,
                app_secret: this.PMSAppSecret,
                usercode: this.userCode,
                password: this.password,
              }
            } else if (this.pmsType == '1' ) {
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
            }else if (this.pmsType == '16' ){
              data = {
                ...paramData,
                "shift":"A",  //shift
                "user_name":this.userName, // 用户名
                "password":this.password, // 密码
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
          case enumShowType.wechatPay:
            let key='';
            switch (this.activeName2) {
              case 'first' :
                key='pms_wechatpay_config'; break;
              case 'second' :
                key='pms_alipay_config' ; break;
              case 'three' :
                key='pms_wechat_authority_config'     ; break;
              case 'four' :
                key='pms_alipay_authority_config'     ; break;
              case 'five' :
                key='pms_how_much_config';             break;
            }

            data = {
              "pms_config_key":key, // 类型：pms_wechatpay_config（微信支付）       // pms_alipay_config（支付宝支付）
              "pay_code":this.payCode, //收款代码
              "refund_code":this.refundCode, //退款代码
              "dayrent_name":this.dayrentName, // 租房费关键词
              "pay_name":this.payName, // 支付项目名
              "refund_name":this.refundName ,// 退款项目名
              pms_pay_method:this.checkedStatus.join(','),
            }
            break;
          case enumShowType.syncSpaceTime:
            console.log("this.inputOrderId",this.inputOrderId);
            data = {
              sync_space_time: this.syncSpaceTime,
              scheduled: this.scheduledSure,
              extract_start_time:this.syncTime[0],
              extract_end_time:this.syncTime[1],
              //max_order_day:(this.inputOrderId.replace(/\s*/g,"") == "") ? 1 : this.inputOrderId.replace(/\s*/g,"")
              max_order_day:this.inputOrderId!=(null || undefined || '') ? this.inputOrderId : '1',

            }
            break;
          case enumShowType.withoutCard://无证核验
            data = {
              "enable_identity_check_undocumented":this.withoutCardConfig.toString(),
              // "recharge_lowest":this.rangeMoney,
              "nocard_used_pay":this.checkMoney,
              "nocard_money_insufficient":this.balanceTip,
              //付费来源  checkedMoney
              "nocard_pay_mode":this.checkedMoney,
              // "nocard_pay_mode":this.collectionManner
              "nocard_remarks_content":this.beizhu, //备注
            }
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
          case enumShowType.isShowPoliceHandeld:
            data = {
              "enable_show_plice_processed": this.showPoliceHandledList.toString()
            };
            break;
          case enumShowType.reviewRoomNum:
          case enumShowType.roomCard:
            data = {
              support_room_card: this.supportRoomCard.toString(),
              issued_card_rule: this.issuedCardRuleVal,
              integration_room_lock: this.inteRoomLock.toString()
            };
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
            let lvyeAmount1=0;
            if(this.isLvyeAutoCharge==true){
              lvyeAmount1=this.lvyeAmount*100;
            }
           data={
             lvye_auto_charge: JSON.stringify(this.isLvyeAutoCharge), // 苏州旅业是否开启自动充值
             lvye_auto_charge_amount:lvyeAmount1,//充值金额
           }
            this.patchConfigData(data);
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
            .el-tabs__item{
              color:#39C240;
            }
            .el-tabs__item.is-active{
              background:#39C240;
              color:#fff;
            }
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
