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
      if (item.children)
        children = _.map(item.children, item => this.vueHtml(item, level + 1, index))

      return h(
        item.tag,
        {
          props: item.options.props,
          class: [{ select: item.select }],
          nativeOn: {
            click: () => {
              if (level > 0) item.select = !item.select
              console.info('data-click:', this, item)
              // const data = this.data
              // data[index] = item
              if (this.$listeners['click']) this.$emit('click', item, index)
              // this.$set(this.data, index, item)
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
        td.options = {}
        td.options.props = {}
        td.defaultProps = {}
        td.rawData = it.data
        _.each(it.data, item => {
          td.options.props[item.name] = item.value
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
    const el = _.map(this.data, (item, index) => this.vueHtml(item, 0, index))
    return h('div', { class: 'panel-result' }, el)
  }
}
</script>

<style lang="scss"></style>
