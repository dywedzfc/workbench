<template>
  <el-container class="container-wrapper">
    <el-container class="container-wrapper">
      <el-main class="container-body">
        <element-tag
          :data.sync="result.data"
          :options="result.options"
          @click="handleElementTagClick"
        ></element-tag>
        <!-- <div class="panel-result" ref="panel-result"></div> -->
      </el-main>
      <el-footer class="container-footer" height="250px">
        <i class="el-icon-plus"></i>Footer
      </el-footer>
    </el-container>
    <el-aside class="container-right" width="300px">
      <div class="panel-header">
        <el-input
          :value="right.query"
          placeholder="组件名称"
          readonly
          @focus="handleQueryPropFocus"
        ></el-input>
      </div>
      <div class="panel-body">
        <el-collapse v-model="collapse.active">
          <el-collapse-item title="基础属性" name="baseProps">
            <el-form class="container-form" label-width="60px">
              <el-form-item :label="item.name" v-for="item in right.base" :key="item.name">
                <el-input class="input-block" v-model="item.value"></el-input>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item
            v-for="item in attributesList"
            :key="item.name"
            :title="item.title"
            :name="item.name"
          >
            <div class="panel-form" v-for="item in attributesList" :key="item.name">
              <!-- <div class="panel-form-header">{{ item.title }}</div> -->
              <el-form class="panel-form-wrapper container-form" label-width="90px">
                <el-form-item :label="item.name" v-for="item in item.data" :key="item.name">
                  <el-input
                    class="input-block"
                    v-if="item.inputType == 'input'"
                    v-model="item.value"
                  />
                  <el-select
                    class="input-block"
                    v-else-if="item.inputType == 'select'"
                    v-model="item.value"
                    :clearable="item.default == ''"
                  >
                    <el-option v-for="v in item.options" :key="v" :value="v" />
                  </el-select>
                  <el-switch
                    v-else-if="item.inputType == 'switch'"
                    v-model="item.value"
                    inactive-color="#ff4949"
                  >
                  </el-switch>
                </el-form-item>
              </el-form>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-aside>
    <transition name="fade" appear>
      <div class="panel-drawer" v-if="drawer.display">
        <div class="panel-drawer-close el-icon-close" @click="handleDrawerCloseClick"></div>
        <div class="panel-drawer-header">
          <el-input
            v-model="drawer.query"
            class="drawer-input"
            prefix-icon="el-icon-search"
          ></el-input>
        </div>
        <div class="panel-drawer-wrapper">
          <div class="panel-drawer-item" v-for="item in menu" :key="item.title">
            <div class="header">{{ item.title }}</div>
            <div class="wrapper">
              <el-button
                :class="['button-drawer', { query: hasQuery(it, drawer.query) }]"
                size="small"
                v-for="it in item.data"
                :key="it.id"
                @click="handleDrawerButtonClick(it)"
                >{{ it.title }}</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </transition>
  </el-container>
</template>

<script>
// import Vue from 'vue'
import _ from 'lodash'
import menuOptions from './json/menu.options'
import ElementTag from './components/ElementTag.vue'

export default {
  name: 'ElementUI',
  components: { ElementTag },
  data() {
    return {
      drawer: { display: false, query: '' },
      collapse: { active: '' },
      result: { data: [], options: {}, obj: {} },
      right: { query: '', base: [], data: [] },
      menu: []
    }
  },
  computed: {
    parameterList() {
      return this.right.data
    },
    baseAttributesList() {
      return [
        {
          name: 'id',
          type: 'string',
          inputType: 'input',
          default: '',
          value: '',
          directions: '标签id'
        },
        {
          name: 'class',
          type: 'string',
          inputType: 'input',
          default: '',
          value: '',
          directions: '标签class'
        },
        {
          name: 'title',
          type: 'string',
          inputType: 'input',
          default: '',
          value: '',
          directions: '标签提示'
        },
        {
          name: 'style',
          type: 'string',
          inputType: 'input',
          default: '',
          value: '',
          directions: '标签样式'
        }
      ]
    },
    attributesList() {
      return _.filter(this.right.data, item => item.type == 'attributes')
    }
  },
  watch: {
    'right.base': {
      handler() {
        this.resetElementTag()
      },
      deep: true
    },
    'right.data': {
      handler() {
        this.resetElementTag()
      },
      deep: true
    }
  },
  mounted() {
    this.menu = _.cloneDeep(menuOptions.data)
  },
  methods: {
    handleElementTagClick(item) {
      let path = ''
      if (item.path.indexOf('root/') == 0) path = item.path.substring(5).split('/')
      if (path.length) {
        _.each(this.result.data, item => {
          const children = this.resetElementStructure(item.children, 1)
          if (children.length) item.children = children
          return item
        })
      }
    },
    handleQueryPropFocus() {
      this.drawer.display = true
    },
    handleDrawerButtonClick(item) {
      this.right.query = item.title
      this.drawer.display = false

      const options = require(`./json/${item.id.toLowerCase()}.options.json`)
      // const base = [].concat(
      //   this.baseAttributesList,
      //   _.map(data.attributes, item => {
      //     if (item.default != null) item.value = item.default
      //     return item
      //   })
      // )
      // this.right.base = base
      // const fList = _.filter(data.data, item => item.type == 'attributes')

      // this.right.data = _.map(options.data, item => {
      //   item.tag = `el-${item.state}`
      //   item.data = _.map(
      //     options[item.name],
      //     item => (item.default != null ? (item.value = item.default) : undefined, item)
      //   )
      //   return item
      // })
      // const obj = {}
      // _.each(options.el, item => {
      //   const data = _.filter(this.right.data, it => it.state == item)
      //   if (data.length) obj[data[0].state] = data[0]
      // })

      // this.result.obj = obj
      // const list = this.resetElementData(options.default, 'root')
      // this.result.data = list
      // this.result.options = options

      console.info('data-init:', options)
      this.right.data = _.map(options.data, item => {
        item.tag = `el-${item.state}`
        item.data = _.map(
          options[item.name],
          item => (item.default != null ? (item.value = item.default) : undefined, item)
        )
        return item
      })
    },
    handleDrawerCloseClick() {
      this.drawer.display = false
    },

    resetElementTagAttrs(list) {
      return _.map(list, item => {
        if (item.default != null) item.value = item.default
        return item
      })
    },
    resetElementData(data, path) {
      const { obj: type } = this.result
      return _.map(data, (item, index) => {
        const td = {}
        const it = type[item.state]
        td.path = path + '/' + index
        td.tag = it.tag
        td.options = {}
        td.options.class = []
        td.options.props = {}
        td.options.domProps = {}
        td.options.attrs = {}
        td.defaultProps = {}
        td.rawData = it.data

        const { base } = this.right
        _.each(base, item => {
          if (item.name == 'text') td.options.domProps.innerText = item.value
          else if (item.name == 'class') td.options.class = _.filter(item.value.split(' '))
          else if (item.value != '') td.options.attrs[item.name] = item.value
        })
        _.each(it.data, item => {
          // if (item.name == 'icon') td.options.class.push(item.value)
          td.options.props[item.name] = item.value
          td.defaultProps[item.name] = item.default
        })
        if (item.children) td.children = this.resetElementData(item.children, (path += '/' + index))
        return td
      })
    },
    resetElementStructure(list, level) {
      return _.map(list, item => {
        const children = this.resetElementStructure(item.children, level + 1)
        if (children.length) item.children = children
        return item
      })
    },
    resetElementTag() {
      const { options } = this.result
      const list = this.resetElementData(options.default, 'root')
      this.result.data = list
    },
    drawerButtonType(item) {
      if (item.hover) return 'primary'
      return 'default'
    },
    hasQuery(item, query) {
      return query && item.title.toLowerCase().includes(query.toLowerCase())
    }
  }
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
    box-sizing: border-box;
    height: 80px;
    padding: 20px;
    border-bottom: 1px solid #eeeeee;
    // padding-bottom: 20px;
  }
  &-body {
    overflow: auto;
    height: calc(100% - 80px);
  }
}
.panel-drawer {
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  background-color: #ffffff;
  width: 100%;
  height: 100%;
  padding: 70px 40px 40px;

  &-close {
    position: absolute;
    top: 30px;
    right: 30px;
    cursor: pointer;
    background-color: #ffffff;
    transition: background-color 0.28s, color 0.28s;

    padding: 10px;
    border-radius: 10px;
    font-size: 28px;
    font-weight: bold;

    &:hover {
      background-color: #e81123;
      color: #ffffff;
    }
  }
  &-header {
    display: flex;
    width: 50%;
    margin: 0 auto 10px;

    .el-input__icon {
      font-size: 30px;
      width: 40px;
      line-height: 60px;
    }
    .el-input__inner {
      height: 60px;
      padding-left: 48px;
      border-radius: 15px;
      font-size: 26px;
    }
  }
  &-wrapper {
    overflow: auto;
    height: calc(100% - 70px);
    padding-left: 10px;
  }

  &-item {
    .header {
      padding: 10px 0;
      font-weight: bold;
    }
    .wrapper {
      // margin-bottom: 10px;

      &::v-deep .el-button {
        margin-bottom: 10px;
      }

      .button-drawer {
        &:hover {
          color: #fff;
          background-color: #409eff;
          border-color: #409eff;
        }
        &.query {
          box-shadow: 0 0 6px #409eff;
        }
      }
    }
  }
}
.panel-result {
  height: 100%;
}
.panel-form {
  margin-bottom: 15px;
  &-header {
    margin-bottom: 10px;
    padding-left: 10px;
    font-size: 16px;
    font-weight: bold;
    line-height: 30px;
  }
}
.container-form {
  .input-block {
    width: 190px;
  }
}
.fade {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.3s, top 0.5s;
  }
}
.fade {
  &-enter, &-leave-to /* .fade-leave-active below version 2.1.8 */ {
    top: -100%;
    opacity: 0;
  }
}
</style>
