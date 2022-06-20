<template>
    <div class='content'>
        <div class="el-container">
            <el-row class="seatbox" :gutter="20">
                <el-col :span='6'>
                        <el-card class="box-card">
                            <el-tree
                                :data="deptList"
                                node-key="id"
                                :props="treeProps"
                                :default-expanded-keys='expandIds'
                                @check="deptClick"
                                show-checkbox
                            >
                            <span slot-scope="{node,data}" class="customize-tree-p">
                                <span class="el-icon-folder ffd23d"></span>
                                <span class='pl10'>{{ data.name }}</span>
                            </span>
                            </el-tree>
                        </el-card>
                </el-col>
                <el-col :span='18'>
                    <el-card class="box-card">
                    <div slot="header" class="clearfix title">
                        <span class='el-icon-paperclip title-leading'></span>
                        <span class='title'>员工列表</span>
                        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
                    </div>
                    <div class="search-box">
                        <el-form :inline="true" :model="listRequest" ref='listRequest'>
                            <el-form-item>
                                <el-input v-model="listRequest.keyword" placeholder="员工姓名/手机号" @keyup.enter.native="onSearch()"></el-input>
                            </el-form-item>
                            <el-form-item style='width:200px;'>
                                <el-button type="primary" size="medium" @click="onSearch()">
                                    <span class="el-icon-search"></span>
                                    搜索
                                </el-button>
                                <el-button type="default" size="medium" @click="clean('listRequest')">
                                    <span class="el-icon-search"></span>
                                    重置
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="datatable">
                          <el-table
                            border
                            ref="multipleTable"
                            :data="users"
                            tooltip-effect="dark"
                            style="width: 100%"
                           >
                            <el-table-column
                            type="selection"
                            width="55">
                            </el-table-column>
                            <el-table-column
                            label="id"
                            prop="id"
                            width="240">
                            </el-table-column>
                            <el-table-column
                            label="姓名"
                            prop="name"
                            width="120">
                            </el-table-column>
                            <el-table-column
                            label="所属部门"
                            show-overflow-tooltip
                            prop="depts"
                            width="120">
                            <template slot-scope="scope">
                              <span style="margin-left: 10px">{{ join(scope.row.depts) }}</span>
                            </template>
                            </el-table-column>
                            <el-table-column
                            label="手机号"
                            prop="mobile"
                            width="120">
                            </el-table-column>
                            <el-table-column
                            label="角色"
                            prop="mobile"
                            width="120">
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
                        :page-sizes="[1,20, 50, 100]"
                        layout="sizes, prev, pager, next"
                        >
                      </el-pagination>
                    </el-card>

                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import { listDepts, listUsers } from '@/api/addressbook'

export default {
    data() {
        return {
            listRequest: {
                keyword: '',
                page: 1,
                pageSize: 1,
                order: 'order',
                asc: true,
                deptIds: []
            },
            deptListRequest: {
                name: ''
            },
            deptList: [],
            count: 0,
            expandIds: [],
            activeDeptId: 0,
            treeProps: {
                children: 'children',
                label: 'name'
            },
            users: [],
            multipleSelection: []
        }
    },
    async created() {
        await this.initDeptList()
        await this.initUserList()
    },
    methods: {
        async initDeptList() {
            const data = await listDepts(this.deptListRequest)
            this.deptList = [data]
            this.expandIds = [data.id]
            this.listRequest.deptIds = [data.id]
        },
        async initUserList() {
            const users = await listUsers(this.listRequest)
            this.users = users.data
            this.count = users.count
            console.log(users.count)
        },
        onSearch() {
            this.initUserList()
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
        deptClick(_, checkedKeys, c) {
            this.listRequest.deptIds = checkedKeys.checkedKeys
            console.log(checkedKeys)
            this.initUserList()
        },
        onSizeChange(e) {
            if (e < 0) {
                return
            }
            this.listRequest.pageSize = e
            this.initUserList()
        },
        onCurrentChange(e) {
            this.listRequest.page = e
            this.initUserList()
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
</style>
