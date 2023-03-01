<script>
import Vue from 'vue'
import _ from 'lodash'

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
      return [].concat([
        { name: 'id', inputType: 'input', value: '' },
        { name: 'class', inputType: 'input', value: '' },
        { name: 'title', inputType: 'input', value: '' },
        { name: 'style', inputType: 'input', value: '' }
      ])
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
                    class: [{ select: item.select }],
                    nativeOn: {
                      click(a, b, c) {
                        if (level > 0) item.select = !item.select
                        _this.$set(_this.result.data, index, item)
                        console.info('data-click:', a, b, c)
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

<style lang="scss"></style>
