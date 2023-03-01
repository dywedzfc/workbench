<script>
import Vue from 'vue'
import _ from 'lodash'

export default {
  name: 'ElementTag',
  data() {
    return {
      drawer: { display: false, query: '' },
      collapse: { active: '' },
      result: { data: [], options: [], obj: {} },
      right: { query: '', base: [], data: [] },
      menu: []
    }
  },
  props: {
    data: { type: Array, required: true }
  },
  render(h) {
    const el = _.map(data, (item, index) => {
      const vh = (item, level) => {
        let children = item.children ? _.map(item.children, item => vh(item, level + 1)) : undefined
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
}
</script>

<style lang="scss"></style>
