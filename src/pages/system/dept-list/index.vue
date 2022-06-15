<template>
    <div>
        <el-card class="box-card">
            <div class="search-bar">
                <el-form :inline="true" :model="listRequest" class="fl">
                    <el-input style="display: none"></el-input>
                    <el-form-item label="部门名称">
                        <el-input
                            v-model="listRequest.keyword"
                            placeholder="部门名称"
                            @keyup.enter.native="onSearch()"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <div class="fl">
                    <el-button type="text" @click="handleReset">重置</el-button>
                    <el-button
                        type="primary"
                        icon="el-icon-search"
                        @click="onSearch"
                        >查询</el-button
                    >
                </div>
            </div>
            <div></div>
        </el-card>
        <el-card class="box-card mt20">
            <el-table :data="list" border style="width: 100%">
                <el-table-column prop="id" label="id" width="60">
                </el-table-column>
                <el-table-column prop="name" label="名称" width="180">
                </el-table-column>
            </el-table>

            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="listRequest.page"
                :page-sizes="[20, 50, 100]"
                :page-size="20"
                layout="total, sizes, prev, pager, next, jumper"
                class="mt20"
                :total="count">
                </el-pagination>
        </el-card>
    </div>
</template>

<script>
import { listDepts } from '@/api/addressbook'

export default {
    data() {
        return {
            listRequest: {
                keyword: '',
                page: 1,
                pageSize: 20,
                order: 'order',
                asc: true
            },
            list: [],
            count: 0
        }
    },
    created() {
        this.initList()
    },
    methods: {
        async initList() {
            const data = await listDepts(this.listRequest)
            console.log(data)
            this.list = data.data
            this.count = data.count
        },
        onSearch() {
            this.initList()
        },
        handleReset() {
            this.listRequest.keyword = ''
        },
        handleSizeChange(e) {
            this.listRequest.pageSize = e
            this.initList()
        },
        handleCurrentChange(e) {
            this.listRequest.page = e
            this.initList()
        }
    }
}
</script>

<style lang="scss">
.fr {
    float: right;
}
.fl {
    float: left;
}
.search-bar {
    overflow: hidden;
}
</style>

<style>
.tools-bar {
    margin-bottom: 20px;
}
.mt20{
    margin-top: 20px;
}
</style>
