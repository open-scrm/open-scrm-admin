<template>
    <div class='content'>
        <div class="el-container">
            <el-row class="seatbox" :gutter="20">
                <el-col :span='24'>
                    <el-card class="box-card">
                    <div slot="header" class="clearfix title">
                        <span class='el-icon-paperclip title-leading'></span>
                        <span class='title'>客户列表</span>
                        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
                    </div>
                    <div class="search-box">
                        <el-form :inline="true" :model="listRequest" ref='listRequest'>
                            <el-form-item>
                                <el-input
                                  size="mini"
                                  v-model="listRequest.name"
                                  placeholder="联系人名称/备注"
                                  @keyup.enter.native="onSearch()"
                                ></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input
                                  size="mini"
                                  v-model="listRequest.corpName"
                                  placeholder="公司名称"
                                  @keyup.enter.native="onSearch()"
                                ></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input
                                  size="mini"
                                  v-model="listRequest.mobile"
                                  placeholder="电话"
                                  @keyup.enter.native="onSearch()"
                                ></el-input>
                            </el-form-item>

                            <el-form-item style='width:200px;'>
                                <el-button type="primary" size="mini" @click="onSearch()">
                                    <span class="el-icon-search"></span>
                                    搜索
                                </el-button>
                                <el-button type="default" size="mini" @click="clean('listRequest')">
                                    <span class="el-icon-search"></span>
                                    重置
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                        <el-divider></el-divider>

                    <div class="datatable">
                          <el-table
                            ref="multipleTable"
                            :data="list"
                            stripe
                            tooltip-effect="dark"
                            style="width: 100%"
                             height="480"
                           >
                            <el-table-column
                            type="selection"
                            width="50">
                            </el-table-column>

                            <el-table-column
                            label="联系人名称"
                            show-overflow-tooltip
                            prop="name"
                            fixed
                            width="160">
                            <template slot-scope="scope">
                              <div @click="opendetail(scope.row.id)">
                                <img class='avatar' :src="scope.row.avatar"  >
                                <span class='nickname'  v-if="scope.row.type == 1" style="margin-left: 10px">{{ scope.row.name }} <span class='wechat'>@微信</span> </span>
                                <span class='nickname' v-if="scope.row.type == 2" style="margin-left: 10px">{{ scope.row.name }} <span class='wxwork'>@企微</span> </span>
                              </div>
                            </template>
                            </el-table-column>
                            <el-table-column
                            label="备注名"
                            prop="remark"
                            show-overflow-tooltip
                            width="120">
                            <template slot-scope="scope">
                              <span style="margin-left: 10px">{{ emptyOr(scope.row.remark, '-') }}</span>
                            </template>
                            </el-table-column>

                            <el-table-column
                            label="电话"
                            width="200">
                            <template slot-scope="scope">
                              <span style="margin-left: 10px">{{ join(scope.row.mobiles,",") }}</span>
                            </template>
                            </el-table-column>

                            <el-table-column
                            label="企业"
                            prop="corpFullName"
                            show-overflow-tooltip
                            width="150">
                            <template slot-scope="scope">
                              <span style="margin-left: 10px">{{ emptyOr(scope.row.corpFullName, '-') }}</span>
                            </template>
                            </el-table-column>

                            <el-table-column
                            label="职务"
                            prop="position"
                            width="150">
                            <template slot-scope="scope">
                              <span style="margin-left: 10px">{{ emptyOr(scope.row.position, '-') }}</span>
                            </template>
                            </el-table-column>

                            <el-table-column
                            label="跟进员工"
                            width="120">
                            <template slot-scope="scope">
                              <span style="margin-left: 10px">{{ scope.row.ownerInfo.name }}</span>
                            </template>
                            </el-table-column>

                            <el-table-column
                            label="获取联系人时间"
                            prop="addTime"
                            width="200">
                            </el-table-column>

                            <el-table-column
                            label="创建时间"
                            prop="createTime"
                            width="200">
                            </el-table-column>

                            <el-table-column
                            label="地址"
                            prop="address"
                            width="200">
                            <template slot-scope="scope">
                              <span style="margin-left: 10px">{{ emptyOr(scope.row.address, '-') }}</span>
                            </template>
                            </el-table-column>

                            <el-table-column
                            label="省市县"
                            prop="addTime"
                            width="200">
                            <template slot-scope="scope">
                              <span style="margin-left: 10px">{{ scope.row.ownerInfo.province }}</span>
                            </template>
                            </el-table-column>

                        </el-table>
                    </div>
                    </el-card>
                    <br>

                     <el-card class="box-card">
                       <el-pagination
                        :page-size="listRequest.pageSize"
                        :total="count"
                        @size-change="onSizeChange"
                        @current-change="onCurrentChange"
                        :page-sizes="[20, 50, 100]"
                        layout="sizes, prev, pager, next"
                        >
                      </el-pagination>
                    </el-card>

                </el-col>
            </el-row>
        </div>
        <customerdetail
          ref="csdetail"
          :id='drawerId'
         >
        </customerdetail>
    </div>
</template>

<script>
import { listCustomer } from '@/api/customer'
import customerdetail from '@/components/customerdetail/index'

export default {
    components: {
        customerdetail
    },
    data() {
        return {
            listRequest: {
                page: 1,
                pageSize: 20,
                order: 'order',
                asc: true,
                type: 0,
                name: '',
                corpName: '',
                mobile: '',
                addWay: 0,
                createTimeGte: 0,
                createTimeLte: 0,
                tags: []
            },
            list: [],
            count: 0,
            drawer: false,
            drawerId: 0
        }
    },
    async created() {
        await this.initList()
    },
    methods: {
        async initList() {
            const list = await listCustomer(this.listRequest)
            this.list = list.data
            this.count = list.count
        },
        onSearch() {
            this.initList()
        },
        handleReset() {
            this.listRequest.keyword = ''
        },
        clean(formName) {
            console.log(this.$refs[formName])
            this.$refs[formName].resetFields()
        },
        join(arr) {
            return arr.join(',')
        },
        emptyOr(a, def) {
            return a === '' ? def : a
        },
        onSizeChange(e) {
            if (e < 0) {
                return
            }
            this.listRequest.pageSize = e
            this.initList()
        },
        onCurrentChange(e) {
            this.listRequest.page = e
            this.initList()
        },
        opendetail(id) {
            this.drawerId = id
            this.$refs.csdetail.show()
        }
    }
}
</script>

<style scoped>
html{
    height: 100%;
}
.fr {
    float: right;
}
.fl {
    float: left;
}
.search-bar {
    overflow: hidden;
}
.tools-bar {
    margin-bottom: 20px;
}
.mt20{
    margin-top: 20px;
}
.seatbox{
    min-height:100%;
    width:100%;
}
.seat-left{
    overflow: auto;
    height: 100%;
    width: 300px;
    position: relative;
    border-right: 1px solid #e8e8e8;
}
.seat-right{
    position: relative;
    height: calc(100% - 38px);
    padding: 12px 20px 20px;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    width: 0;
}
/deep/.coloricon {
  box-sizing: border-box;
  background-size: 100%;
  background-repeat: no-repeat;
}
/deep/.el-tree-node__expand-icon {
 transform: rotate(-90deg);
}
/deep/.el-tree-node__expand-icon.expanded {
  transform: rotate(0deg);
  color: #ccc;
}
/deep/.el-tree-node__content {
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    position: relative;
    cursor: pointer;
    margin: 0 10px;
}
/deep/.ffd23d{
    color:#ffd23d;
}
/deep/.pl10{
    padding-left: 10px;
}
.title-leading{
    color:#047ae2;
}
.title{
    font-size: 16px;
    font-weight: 500;
    color: #262626;
    line-height: 22px;
}
.search-box .el-form-item {
    width: 150px;
}
/deep/.nickname{
  color: #009cff;
  cursor: pointer;
}
/deep/.wechat{
  color: #00ae83;
  cursor: pointer;
}
/deep/.wxwork{
  color: #ff873d
}
/deep/.avatar{
    width: 28px;
    height: 28px;
    vertical-align: middle;
    border-radius: 4px;
    font-size: 28px;
    text-align: center;
    line-height: 28px;
    margin-right: 6px;
}
/deep/.search-box .el-form-item{
  margin-bottom: 0 !important;
}
</style>
