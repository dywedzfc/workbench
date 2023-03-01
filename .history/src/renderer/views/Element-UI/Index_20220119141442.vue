<template>
  <el-container class="container-wrapper">
    <el-container class="container-wrapper">
      <el-main class="container-body">
        <div class="panel-result" ref="panel-result"></div>
      </el-main>
      <el-footer class="container-footer" height="250px">Footer</el-footer>
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
          <el-collapse-item title="专有属性" name="2">
            <div class="panel-form" v-for="item in attributesList" :key="item.name">
              <div class="panel-form-header">{{ item.title }}</div>
              <el-form class="panel-form-wrapper container-form" label-width="60px">
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
                  >
                    <el-option v-for="v in item.options" :key="v" :value="v" />
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
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
import Vue from 'vue'
import _ from 'lodash'
import menuOptions from './json/menu.options'

export default {
  name: 'ElementUI',
  data() {
    return {
      drawer: { display: false, query: '' },
      collapse: { active: '' },
      result: { data: [], options: [], obj: {} },
      right: { query: '', base: [], data: [] },
      menu: []
    }
  },
  computed: {
    baseAttributesList() {
      return [
        { name: 'id', inputType: 'input', value: '' },
        { name: 'class', inputType: 'input', value: '' },
        { name: 'title', inputType: 'input', value: '' },
        { name: 'style', inputType: 'input', value: '' }
      ]
    },
    attributesList() {
      return _.filter(this.right.data, item => item.type == 'attributes')
    }
  },
  watch: {
    'result.data': {
      handler() {
        console.info('data:')
        const { data, options, obj } = this.result
        const _this = this
        const vm = new Vue({
          render(h) {
            const el = _.map(data, (item, index) => {
              const vh = (item, level) => {
                let children = item.children
                  ? _.map(item.children, item => vh(item, level + 1))
                  : undefined
                return h(
                  item.tag,
                  {
                    props: item.props,
                    class: [{ select: item.select, hover: item.hover }],
                    nativeOn: {
                      click(a, b, c) {
                        if (level > 0) item.select = !item.select
                        _this.$set(_this.result.data, index, item)
                        console.info('data-click:', a, b, c)
                      },
                      mouseover() {
                        if (level > 0) item.hover = true
                        _this.$set(_this.result.data, index, item)
                      },
                      mouseout() {
                        if (level > 0) item.hover = false
                        _this.$set(_this.result.data, index, item)
                      }
                    }
                  },
                  children
                )
              }
              return vh(item, 0)
            })
            el.push(
              h('el-button', {
                class: ['button-add'],
                props: { icon: 'el-icon-plus' },
                on: {
                  click() {
                    const data = _this.resetElementData(options.default, obj)
                    const list = _.cloneDeep(_this.result.data)
                    list.push(...data)
                    _this.result.data = list
                  }
                }
              })
            )
            return h('div', el)
          }
        }).$mount()
        this.$refs['panel-result'].innerHTML = ''
        this.$refs['panel-result'].appendChild(vm.$el)
      },
      deep: true
    }
  },
  mounted() {
    this.menu = _.cloneDeep(menuOptions.data)
  },
  methods: {
    handleQueryPropFocus() {
      this.drawer.display = true
    },
    handleDrawerButtonClick(item) {
      this.right.query = item.title
      this.drawer.display = false

      this.right.base = this.baseAttributesList
      const data = require(`./json/${item.id.toLowerCase()}.options.json`)
      // const fList = _.filter(data.data, item => item.type == 'attributes')
      this.right.data = _.map(data.data, item => {
        item.tag = `el-${item.state}`
        item.data = _.map(
          data[item.name],
          item => (item.default != null ? (item.value = item.default) : undefined, item)
        )
        return item
      })
      const obj = {}
      _.each(data.el, item => {
        const data = _.filter(this.right.data, it => it.state == item)
        if (data.length) obj[data[0].state] = data[0]
      })
      const list = this.resetElementData(data.default, obj)
      this.result.data = list
      this.result.options = data
      this.result.obj = obj
    },
    handleDrawerCloseClick() {
      this.drawer.display = false
    },

    resetElementData(data, type) {
      // console.info('data-tt:', data, type)
      return _.map(data, item => {
        const td = {}
        const it = type[item.state]
        td.tag = it.tag
        td.props = {}
        td.defaultProps = {}
        td.rawData = it.data
        _.each(it.data, item => {
          td.props[item.name] = item.value
          td.defaultProps[item.name] = item.default
        })
        if (item.children) td.children = this.resetElementData(item.children, type)
        return td
      })
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
    width: 220px;
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
