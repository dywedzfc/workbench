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
          <!-- <el-collapse-item title="基础属性" name="baseProps">
            <el-form class="container-form" label-width="60px">
              <el-form-item :label="item.name" v-for="item in right.base" :key="item.name">
                <el-input class="input-block" v-model="item.value"></el-input>
              </el-form-item>
            </el-form>
          </el-collapse-item> -->
          <el-collapse-item
            v-for="item in parameterList"
            :key="item.name"
            :title="item.title"
            :name="item.name"
          >
            <!-- <div class="panel-form" v-for="item in item.data" :key="item.name"> -->
            <!-- {{ item }} -->
            <!-- <div class="panel-form-header">{{ item.title }}</div> -->
            <el-form class="panel-form-wrapper container-form" label-width="90px">
              <el-form-item :label="item.name" v-for="item in item.data" :key="item.name">
                <el-input
                  class="input-block"
                  v-if="item.inputType == 'input'"
                  v-model="item.value"
                />
                <el-input
                  class="input-block"
                  v-if="item.inputType == 'textarea'"
                  v-model="item.value"
                  type="textarea"
                  rows="4"
                />
                <el-select
                  class="input-block"
                  v-else-if="item.inputType == 'select'"
                  v-model="item.value"
                  :clearable="item.default == ''"
                >
                  <el-option v-for="v in item.options" :key="v" :value="v" />
                </el-select>
                <el-select
                  class="input-block"
                  v-else-if="item.inputType == 'icon-select'"
                  v-model="item.value"
                  :clearable="item.default == ''"
                  filterable
                >
                  <el-option v-for="v in iconOptions" :key="v" :value="v">
                    <i :class="['icon-code', v]"></i>{{ v }}
                  </el-option>
                </el-select>
                <el-switch
                  v-else-if="item.inputType == 'switch'"
                  v-model="item.value"
                  inactive-color="#ff4949"
                >
                </el-switch>
                <el-color-picker
                  v-else-if="item.inputType == 'color'"
                  v-model="item.value"
                ></el-color-picker>
              </el-form-item>
            </el-form>
            <!-- </div> -->
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
      guide: {},
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
    iconOptions() {
      const options = require(`./json/icon.options.json`)
      return options.icon
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
    // 'right.base': {
    //   handler() {
    //     this.resetElementTag()
    //   },
    //   deep: true
    // },
    'right.data': {
      handler() {
        this.resetElementTag()
      },
      deep: true
    }
  },
  created() {
    const guide = require(`./json/guide.options.json`)
    this.guide = guide
    console.info('data:', guide)
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

      // const options = require(`./json/${item.id.toLowerCase()}.options.json`)
      const options = this.getElementTag(item.id)
      const structure = this.getAttachedElementTag(item.id)
      this.guide.active = item.id.toLowerCase()
      const { data, active } = this.guide

      this.right.data = _.map(options.data, item => {
        item.tag = `el-${item.state}`
        item.data = this.resetElementTagAttrs(options[item.name])
        return item
      })

      const obj = {}
      _.each(options.el, item => {
        const data = _.filter(this.right.data, it => it.state == item)
        const attrs = {}
        _.each(data, item => (attrs[item.type] = item.data))
        obj[item] = attrs
        obj[item].tag = data[0].tag
        obj[item].state = data[0].state
      })

      this.result.obj = obj
      if (structure) {
        console.info('data:', active)
        const list = this.resetElementStructureData(structure)
        this.result.data = list
      } else {
        const list = this.resetElementData(data[active].structure, 'root')
        this.result.data = list
      }
      this.result.options = options
      console.info('data-result:', this.result.data, this.right.data)
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
        console.info('data-it:', it)
        td.path = path + '/' + index
        td.options = {}
        td.options.class = []
        td.options.props = {}
        td.options.domProps = {}
        td.options.attrs = {}
        td.options.on = {}
        td.defaultProps = {}
        td.rawData = {}

        console.info('data-dd:', item)
        if (it) {
          td.tag = it.tag
          td.rawData.base = it.base
          td.rawData.attributes = it.attributes
          _.each(it.base, item => {
            // if (item.name == 'text') td.options.domProps.innerText = item.value
            if (item.name == 'text') td[item.name] = item.value
            else if (item.name == 'class') td.options.class = _.filter(item.value.split(' '))
            else if (item.value != '') td.options.attrs[item.name] = item.value
          })
          _.each(it.attributes, item => {
            if (item.name == 'icon' && item.value) td[item.name] = item.value
            if (item.value !== '') td.options.props[item.name] = item.value
            td.defaultProps[item.name] = item.default
          })
          _.each(it.event, item => {
            td.options.on[item.name] = () => eval(item.value)
          })
        }
        if (item.children) td.children = this.resetElementData(item.children, (path += '/' + index))
        return td
      })
    },
    resetElementStructureData(structure) {
      const { data, active } = this.guide
      // console.info(
      //   'structure-data:',
      //   structure,
      //   data[active]
      //   // this.resetElementData(data[active].structure, 'root')
      // )
      return _.map(data[active].structure, (item, index) => {
        const td = {}
        // const it = type[item.state]
        const rightData = _.map(structure.data, item => {
          item.tag = `el-${item.state}`
          item.data = this.resetElementTagAttrs(structure[item.name])
          return item
        })

        const obj = {}
        _.each(structure.el, item => {
          const data = _.filter(rightData, it => it.state == item)
          const attrs = {}
          _.each(data, item => (attrs[item.type] = item.data))
          obj[item] = attrs
          obj[item].tag = data[0].tag
          obj[item].state = data[0].state
        })

        console.info('data-it2:', structure, rightData, obj)
        td.path = 'root/' + index
        td.options = {}
        td.options.class = []
        td.options.props = {}
        td.options.domProps = {}
        td.options.attrs = {}
        td.options.on = {}
        td.defaultProps = {}
        td.rawData = {}

        // if (it) {
        //   td.tag = it.tag
        //   td.rawData.base = it.base
        //   td.rawData.attributes = it.attributes
        //   _.each(it.base, item => {
        //     // if (item.name == 'text') td.options.domProps.innerText = item.value
        //     if (item.name == 'text') td[item.name] = item.value
        //     else if (item.name == 'class') td.options.class = _.filter(item.value.split(' '))
        //     else if (item.value != '') td.options.attrs[item.name] = item.value
        //   })
        //   _.each(it.attributes, item => {
        //     if (item.name == 'icon' && item.value) td[item.name] = item.value
        //     if (item.value !== '') td.options.props[item.name] = item.value
        //     td.defaultProps[item.name] = item.default
        //   })
        //   _.each(it.event, item => {
        //     td.options.on[item.name] = () => eval(item.value)
        //   })
        // }
        // if (item.children) td.children = this.resetElementData(item.children, (path += '/' + index))
        return td
      })
      // const { obj: type } = this.result
      // return _.map(data, (item, index) => {
      //   const td = {}
      //   const it = type[item.state]
      //   console.info('data-it2:', item, type, it)
      //   td.path = 'root/' + index
      //   td.options = {}
      //   td.options.class = []
      //   td.options.props = {}
      //   td.options.domProps = {}
      //   td.options.attrs = {}
      //   td.options.on = {}
      //   td.defaultProps = {}
      //   td.rawData = {}

      //   console.info('data-dd:', item)
      //   if (it) {
      //     td.tag = it.tag
      //     td.rawData.base = it.base
      //     td.rawData.attributes = it.attributes
      //     _.each(it.base, item => {
      //       // if (item.name == 'text') td.options.domProps.innerText = item.value
      //       if (item.name == 'text') td[item.name] = item.value
      //       else if (item.name == 'class') td.options.class = _.filter(item.value.split(' '))
      //       else if (item.value != '') td.options.attrs[item.name] = item.value
      //     })
      //     _.each(it.attributes, item => {
      //       if (item.name == 'icon' && item.value) td[item.name] = item.value
      //       if (item.value !== '') td.options.props[item.name] = item.value
      //       td.defaultProps[item.name] = item.default
      //     })
      //     _.each(it.event, item => {
      //       td.options.on[item.name] = () => eval(item.value)
      //     })
      //   }
      //   if (item.children) td.children = this.resetElementData(item.children, (path += '/' + index))
      //   return td
      // })
    },
    resetElementTagName() {
      const rightData = _.map(structure.data, item => {
        item.tag = `el-${item.state}`
        item.data = this.resetElementTagAttrs(structure[item.name])
        return item
      })

      const obj = {}
      _.each(structure.el, item => {
        const data = _.filter(rightData, it => it.state == item)
        const attrs = {}
        _.each(data, item => (attrs[item.type] = item.data))
        obj[item] = attrs
        obj[item].tag = data[0].tag
        obj[item].state = data[0].state
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
      // const { options } = this.result
      const { data, active } = this.guide
      const list = this.resetElementData(data[active].structure, 'root')
      this.result.data = list
      // console.info('data-list:', list)
    },
    drawerButtonType(item) {
      if (item.hover) return 'primary'
      return 'default'
    },
    hasQuery(item, query) {
      return query && item.title.toLowerCase().includes(query.toLowerCase())
    },
    getElementTag(name) {
      const fileName = this.guide.data[name.toLowerCase()].path
      return require(`./json/${fileName}`)
    },
    getAttachedElementTag(name) {
      const fileName = this.guide.data[name.toLowerCase()].attached
      return fileName ? require(`./json/${fileName}`) : undefined
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
.icon-code {
  position: relative;
  top: 4px;

  margin-right: 5px;
  font-size: 22px;
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
