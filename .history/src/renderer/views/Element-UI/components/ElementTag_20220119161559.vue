<script>
import _ from 'lodash'

export default {
  name: 'ElementTag',
  data() {
    return {
      // drawer: { display: false, query: '' },
      // collapse: { active: '' },
      // result: { data: [], options: [], obj: {} },
      // right: { query: '', base: [], data: [] },
      // menu: []
    }
  },
  props: {
    data: { type: Array, required: true },
    options: { type: Object, required: true }
  },
  methods: {
    vueHtml(item, level, index) {
      const h = this.$createElement
      let children = undefined
      console.info('data-tt:', item,_.map(item.children, item => this.vueHtml(item, level + 1, index))
      // if (item.children)
      //   item.children = _.map(item.children, item => this.vueHtml(item, level + 1, index))

      return h(
        item.tag,
        {
          props: item.props,
          class: [{ select: item.select }],
          nativeOn: {
            click(a, b, c) {
              if (level > 0) item.select = !item.select
              this.$set(this.data, index, item)
              console.info('data-click:', a, b, c)
            }
          }
        },
        children
      )
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
    }
  },
  render(h) {
    const obj = {}
    _.each(this.data.el, item => {
      const data = _.filter(this.data, it => it.state == item)
      if (data.length) obj[data[0].state] = data[0]
    })
    const el = _.map(this.data, (item, index) => {
      return this.vueHtml(item, 0, index)
    })
    el.push(
      h('el-button', {
        class: ['button-add'],
        props: { icon: 'el-icon-plus' },
        on: {
          click() {
            const data = this.resetElementData(this.options.default, obj)
            const list = _.cloneDeep(this.result.data)
            list.push(...data)
            this.result.data = list
          }
        }
      })
    )
    return h('div', { class: 'panel-result' }, el)
  }
}
</script>

<style lang="scss"></style>
