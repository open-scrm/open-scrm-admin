<style lang='scss' >
.pr-10 {
    padding-right: 10px;
}
.cus-detail {
    font-size: 13px;
    background: #f6f9fd;
    .basic-info{
      margin-bottom: 20px;
      border-radius: 0 !important;
    }
    .tags .el-tag {
        margin-left: 10px;
    }
}
</style>

<template>
  <div>
    <el-drawer
      :visible.sync="drawer"
      :direction="direction"
      :with-header="false"
      :before-close="handleClose"
      size='50%'
    >
    <div class="cus-detail">
      <el-card class="basic-info">
        <el-descriptions
        :title="customer.name"

        :column="3"
        :size="size"
        border
      >
        <template slot="extra">
          <el-button
            type="primary"
            size="small"
          >
            <i class="el-icon-star-on"></i>已关注
          </el-button>
          <el-button
            type="primary"
            size="small"
          >编辑</el-button>
        </template>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            昵称
          </template>
          {{ customer.name }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            手机号
          </template>
          {{ customer.mobiles }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            描述
          </template>
          {{ customer.description }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-tickets"></i>
            备注
          </template>
          {{ customer.remark }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            客户类型
          </template>
          默认类型
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            联系地址
          </template>
          江苏省苏州市吴中区吴中大道 1188
        </el-descriptions-item>

        <el-descriptions-item span='1'>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            企业标签
          </template>
          <div class="tags">
            <el-tag>11</el-tag>
            <el-tag>11</el-tag>
            <el-tag>11</el-tag>
            <el-tag>11</el-tag>
            <el-tag>11</el-tag>
            <el-tag>11</el-tag>
            <el-tag>11</el-tag>
            <el-tag>11</el-tag>
            <el-tag>11</el-tag>
            <el-tag>11</el-tag>
            <el-tag>11</el-tag>
            <el-tag>11</el-tag>
            <el-tag>11</el-tag>
            <el-tag>11</el-tag>
          </div>
        </el-descriptions-item>

      </el-descriptions>
      </el-card>

      <el-tabs type="border-card">
        <el-tab-pane label="客户待办">客户待办</el-tab-pane>
        <el-tab-pane label="客户旅程">客户旅程</el-tab-pane>
        <el-tab-pane label="基本资料">基本资料</el-tab-pane>
        <el-tab-pane label="销售机会">销售机会</el-tab-pane>
      </el-tabs>
    </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
    props: {
        id: Number
    },
    data() {
        return {
            direction: 'rtl',
            drawer: false,

            customer: {
                name: '我的名字',
                mobiles: ['110', '120'],
                description: '这个客户有意成单',
                remark: '成都分公司员工'
            }
        }
    },
    methods: {
        show() {
            this.drawer = true
        },
        close() {
            this.drawer = false
        },
        handleClose(done) {
            done()
        }
    }
}
</script>

<style lang='scss'>
.menu-container {
    .svg-icon {
        margin-right: 10px;
    }
}
</style>
