<template>
<popup v-model="value" maskShow noMaskTouch :top="86">
  <div class="vux-alert" v-show="value">
      <div class="weui_dialog_hd"><strong class="weui_dialog_title">{{title}}</strong></div>
      <div class="weui_dialog_bd"><slot></slot></div>
      <div class="weui_dialog_ft">
        <a href="javascript:;" class="weui_btn_dialog primary" @click="onHide">{{buttonText}}</a>
      </div>
  </div>
</popup>
</template>

<script>

    export default {
        props: {
            value: null,
            title: {
                type: String,
                default: '提示'
            },
            buttonText: {
                type: String,
                default: '确定'
            },
        },
        methods: {
            onHide() {
                this.$emit('input', false)
            }
        },
        watch: {
            value(val) {
                this.$emit(val ? 'on-show' : 'on-hide')
            }
        }
    }
</script>

<style lang="less" scoped>
    .vux-alert {
        width: 400px;
        height: 172px;
        background: #fff;
        text-align: center;
        border-radius: 5px;
        z-index: 1000;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        .weui_dialog_hd {
            font-size: 20px;
            color: #212121;
            margin: 20px 0 15px 0;
        }
        .weui_dialog_bd {
            font-size: 14px;
            color: #757575;
            line-height: 22px;
            padding: 0 24px;
        }
        .primary {
            width: 100%;
            height: 44px;
            line-height: 44px;
            border-radius: 0 0 5px 5px;
            border-top: 1px solid #eee;
            position: absolute;
            right: 0;
            bottom: 0;
            text-decoration: none;
            color: #41BCA0;
            &:hover {
                background: #F0FAF8;
            }
            &:active {
                background: #E0E0E0;
            }
        }
    }
</style>