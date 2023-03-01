<script>
import _ from 'lodash'

export default {
  name: 'ElementTag',
  data() {
    return {
      query: { value: '' }

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
      if (!children) children = [item.text]
      const options = this.vueElementOptions(item)
      // console.info('icon-children:', children, options)
      // let className = item.options.class
      // if (item.flag) className.push({ select: item.select })
      // className = _.uniq(className)
      return h(
        item.tag,
        {
          class: options.class,
          props: options.props,
          attrs: item.options.attrs,
          domProps: item.options.domProps,
          nativeOn: {
            click: event => {
              event.stopPropagation()
              // if (level > 0)
              item.select = !item.select
              if (this.$listeners['click']) this.$emit('click', item, index)
            }
          }
        },
        children
      )
    },
    vueElementOptions(item) {
      let className = item.options.class
      if (item.flag) className.push({ select: item.select })
      className = _.uniq(className)

      const on = Object.assign({}, item.options.on)
      const props = {}
      const domProps = item.options.domProps
      _.each(item.options.props, (value, key) => {
        if (key == 'v-model') {
          domProps.value = this.query[value]
          on.input = event => {
            console.info('dom-props:', event, this.query)
            this.query['value'] = event.target.value
          }
        } else props[key] = value
      })

      console.info('data:', on, props)
      return { class: className, props, on }
    }
    // resetElementData(data, type) {
    //   console.info('data-tt:', data, type)
    //   return _.map(data, item => {
    //     console.info('data:', item)
    //     const td = {}
    //     const it = type[item.state]
    //     td.tag = it.tag
    //     td.options = {}
    //     td.options.props = {}
    //     td.defaultProps = {}
    //     td.rawData = it.data
    //     _.each(it.data, item => {
    //       td.options.props[item.name] = item.value
    //       td.defaultProps[item.name] = item.default
    //     })
    //     if (item.children) td.children = this.resetElementData(item.children, type)
    //     return td
    //   })
    // }
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
