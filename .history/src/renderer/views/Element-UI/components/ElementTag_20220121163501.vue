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
    handleFormDataInput(event) {
      // console.info('dom-props-input:', event, this.query)
      this.query.value = event.target.value
    },
    // handleFormDataChange(value) {
    //   console.info('dom-props-change:', value, this.query)
    //   // this.query.value = event.target.value
    // },
    vueHtml(item, level, index) {
      const h = this.$createElement
      let children = undefined
      if (item.children)
        children = _.map(item.children, item => this.vueHtml(item, level + 1, index))
      if (!children) children = [item.text]
      const options = this.vueElementOptions(item)
      console.info('icon-children:', children, options)
      return h(
        item.tag,
        {
          class: options.class,
          props: options.props,
          attrs: item.options.attrs,
          domProps: options.domProps,
          on: options.on,
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
          props.value = value //this.query.value
          on.input = this.handleFormDataInput
          // on.change = this.handleFormDataChange
        } else props[key] = value
      })

      console.info('data:', props, on)

      return { class: className, props, domProps, on }
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
