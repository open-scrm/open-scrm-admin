<template>
  <div>
      <el-drawer
        title="我是标题"
        :visible.sync="drawer"
        :direction="direction"
        :before-close="handleClose">
        <span>
          {{ id }}
        </span>
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
            drawer: false
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
  .svg-icon{
    margin-right:10px;
  }
}
</style>
