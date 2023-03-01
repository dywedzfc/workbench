<template>
  <el-container class="container-wrapper">
    <el-container class="container-wrapper">
      <el-main class="container-body">Main</el-main>
      <el-footer class="container-footer" height="250px">Footer</el-footer>
    </el-container>
    <el-aside class="container-right" width="300px">
      <div class="panel-header">
        <el-input></el-input>
      </div>
      <div class="panel-body">
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item title="基础属性" name="baseProps">
            <el-form>
              <el-form-item label="id"></el-form-item>
              <el-form-item label="class"></el-form-item>
              <el-form-item label="title"></el-form-item>
              <el-form-item label="style"></el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="专有属性" name="2">
            <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
            <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
          </el-collapse-item>
          <el-collapse-item title="专有事件" name="3">
            <div>简化流程：设计简洁直观的操作流程；</div>
            <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
            <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
          </el-collapse-item>
          <el-collapse-item title="专有事件" name="4">
            <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
            <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-aside>
  </el-container>
</template>

<script>
// import _ from 'lodash'

export default {
  name: 'Element UI',
  data() {
    return { menu: [] }
  },
  computed: {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss">
.container {
  &-wrapper {
    height: 100%;
  }
  &-body {
    padding: 0;
  }
  &-right {
    border-left: 1px solid #eeeeee;
  }
  &-footer {
    padding: 0;
    border-top: 1px solid #eeeeee;
  }
}
.panel {
  &-header {
    padding: 20px;
    // padding-bottom: 20px;
  }
  &-body {
  }
}
</style>
