<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <i class="el-icon-user-solid card-panel-icon"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            今日新增用户
          </div>
          <count-to :start-val="0" :end-val="userNum" :duration="2600" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-money">
          <i class="el-icon-coin card-panel-icon"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            今日交易金额
          </div>
          <count-to :start-val="0" :end-val="priceNum" :duration="3200" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <div class="card-panel-icon-wrapper icon-message">
          <i class="el-icon-s-order card-panel-icon"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            今日新增订单
          </div>
          <count-to :start-val="0" :end-val="orderNum" :duration="3000" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <i class="el-icon-set-up card-panel-icon"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            待处理订单
          </div>
          <count-to :start-val="0" :end-val="conductNum" :duration="3600" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getDayData } from '@/api/table'
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  },
  data() {
    return {
      userNum: 0,
      orderNum: 0,
      priceNum: 0,
      conductNum: 0
    }
  },
  created: function() {
    this.getData()
  },
  methods: {
    getData() {
      const that = this
      getDayData().then(response => {
        that.userNum = response.data.userNum
        that.orderNum = response.data.orderNum
        that.priceNum = response.data.priceNum / 100
        that.conductNum = response.data.conductNum
      })
    },
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
      switch (type) {
        case 'newVisitis':
          this.$router.push('/user/index')
          break
        case 'purchases':
          this.$router.push('/order/index')
          break
        case 'messages':
          this.$router.push('/order/index')
          break
        case 'shoppings':
          this.$router.push('/order/index')
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px 26px 26px 0;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
