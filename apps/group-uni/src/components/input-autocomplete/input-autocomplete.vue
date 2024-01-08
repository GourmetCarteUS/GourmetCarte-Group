<template>
    <view class="pc_inputbox">
        <view class="pc_headsbox">
            <input class="pc_input" v-model="keyword" :placeholder="placeholder" :focus="focus" @click="cashfous(true)" @blur="cashfous(false)" />
            <view v-if="text.length > 0 && !focus && keyword == ''" class="pc_placeholder" @click="cashfous(true)">
                <view class="pc_place" :class="style.tran ? 'pc_transition' : ''" :style="'top:' + style.top + 'rpx;'">
                    {{ text[isIndex] }}
                </view>
            </view>
        </view>
        <view v-if="srclist.length > 0 && focus" class="pc_input_content" :style="'top:' + remtops + 'px;'">
            <view class="pc_baffle"></view>
            <view class="pc_cones">
                <view
                    class="pc_ellipsis"
                    v-for="(item, index) in srclist"
                    :key="index"
                    :class="index > 0 ? 'pc_topsbor' : ''"
                    v-html="item.html"
                    @click.stop="selectitem(item.name)"
                ></view>
            </view>
        </view>
    </view>
</template>
<script>
export default {
    name: 'pc-Inputbox',
    props: {
        modelValue: {
            type: String,
            default: '',
        },
        placeholder: {
            type: String,
            default: '请输入',
        },
        data: {
            type: Array,
            default: () => [],
        },
        text: {
            type: Array,
            default: () => [],
        },
        color: {
            type: String,
            default: '#F56C6C',
        },
        corner: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            keyword: '',
            isIndex: 0,
            focus: false,
            interval: null,
            remtops: '',
            srclist: [],
            style: {
                top: 0,
                tran: true,
            },
        };
    },
    created() {
        clearInterval(this.interval);
        this.interval = setInterval(() => {
            this.switchtext();
        }, 3000);
    },
    mounted() {
        let _this = this;
        let info = uni.createSelectorQuery().in(this).select('.pc_headsbox');
        info.boundingClientRect(function (data) {
            _this.remtops = Number(data.height) + 15;
        }).exec(function (res) {});
    },
    beforeDestroy() {
        console.log('销毁');
        clearInterval(this.interval);
    },
    watch: {
        keyword() {
            this.$emit('input', this.keyword);
            this.$emit('update:modelValue', this.keyword);
        },
        modelValue() {
            this.keyword = this.modelValue;
        },
        data() {
            this.textscreen();
        },
    },
    methods: {
        selectitem(name) {
            this.keyword = name;
            this.srclist = [];
            this.$emit('trigger', name);
        },
        cashfous(bool) {
            if (bool) {
                this.focus = bool;
                clearInterval(this.interval);
                this.$emit('focus');
            } else {
                setTimeout(() => {
                    this.focus = bool;
                    this.$emit('blur');
                }, 10);
                clearInterval(this.interval);
                this.interval = setInterval(() => {
                    this.switchtext();
                }, 3000);
            }
        },
        switchtext() {
            let that = this;
            that.style.top = -100;
            setTimeout(() => {
                that.isIndex = that.text[that.isIndex + 1] ? that.isIndex + 1 : 0;
                that.style.tran = false;
                that.style.top = 100;
                setTimeout(() => {
                    that.style.tran = true;
                    that.style.top = 0;
                }, 100);
            }, 200);
        },
        textscreen() {
            let that = this;
            let list = JSON.parse(JSON.stringify(that.data));
            that.srclist = [];
            if (!that.keyword) {
                return;
            }
            try {
                list.forEach((item) => {
                    // debugger
                    // if (item.toLowerCase().indexOf(that.keyword.toLowerCase()) > -1) {
                    let obj = { html: '', name: item };
                    let arr = item.split('');
                    arr.forEach((emt, index) => {
                        if (that.keyword.toLowerCase().indexOf(emt.toLowerCase()) > -1) {
                            if (that.keyword.length > 1) {
                                if (arr[index - 1] && that.keyword.toLowerCase().indexOf(arr[index - 1]) > -1) {
                                    obj.html += '<span style="color:red;">' + emt + '</span>';
                                } else if (arr[index + 1] && that.keyword.toLowerCase().indexOf(arr[index + 1]) > -1) {
                                    obj.html += '<span style="color:red;">' + emt + '</span>';
                                } else {
                                    obj.html += '<span>' + emt + '</span>';
                                }
                            } else {
                                obj.html += '<span style="color:red;">' + emt + '</span>';
                            }
                        } else {
                            obj.html += '<span>' + emt + '</span>';
                        }
                    });
                    that.srclist.push(obj);
                    // }
                });
            } catch {}
        },
    },
};
</script>
<style lang="scss" scoped>
.pc_inputbox {
    width: 100%;
    position: relative;
    margin-left: 20rpx;

    .pc_headsbox {
        position: relative;
        overflow: hidden;

        .pc_input {
            width: 100%;
            max-height: 100rpx;
            padding: 20rpx 0;
        }

        .pc_placeholder {
            position: absolute;
            left: calc(20px + 60upx);
            top: 25upx;
            z-index: 1;
            width: calc(100% - (40px + 120upx));

            .pc_place {
                width: 100%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 25upx;
                position: absolute;
                left: 0;
                top: 0;
                z-index: 5;
                color: #999;
            }

            .pc_transition {
                transition: 0.2s all;
            }
        }

        .pc_close {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 18px;
            min-width: 18px;
            height: 18px;
            border-radius: 50%;
            background-color: #999;
        }
    }

    .pc_input_content {
        position: absolute;
        background-color: #fff;
        z-index: 999;
        //width: 100%;
        padding: 15px 0;
        box-shadow: 0 0 5px #000;
        border-radius: 10upx;
        //height: 300rpx;

        .pc_cones {
            //width: 100%;
            height: 100%;
            padding: 0 40upx;
            overflow-y: auto;
            overflow-x: hidden;

            .pc_ellipsis {
                //width: 100%;
                //white-space: nowrap;
                //text-overflow: ellipsis;
                overflow: hidden;
                font-size: 25upx;
            }

            .pc_topsbor {
                margin-top: 20upx;
                border-top: 1px solid #f2f6fc;
                padding-top: 20upx;
            }
        }

        .pc_baffle {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 15px;
            background-color: #fff;
            border-radius: 10upx;
        }
    }

    .pc_input_content::before {
        content: '';
        position: absolute;
        top: -6px;
        left: 20px;
        border-top: 15px solid #fff;
        box-shadow: 0 0 5px #000;
        border-right: 15px solid transparent;
        transform: rotate(45deg);
    }
}
</style>
