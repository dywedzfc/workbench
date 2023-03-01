<template>
  <div class="path-box__content">
    <div
      class="path-box-item"
      :class="{ 'path-box-url': memo, move: mouse.move }"
      @click="handlePathClick"
      @mousemove="handlePathMousemove"
      @mouseleave="handlePathMouseleave"
    >
      <span>{{ url }}</span>
    </div>
    <div class="path-box-item path-box-textarea" v-if="memo">{{ memo }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { HOTKEYS } from 'assets/script/request'
export default {
  name: 'PathBox',
  props: {
    url: String,
    memo: { type: String, default: '' },
    moveClick: { type: Boolean, default: false }
  },
  data() {
    return {
      mouse: { move: false }
    }
  },
  computed: {
    ...mapGetters({ hotkeys: HOTKEYS })
  },
  mounted() {
    console.info('data:', this.moveClick)
  },
  methods: {
    handlePathClick() {
      if (this.hotkeys == 'Command') {
        console.log('hot-key')
        if (this.$listeners['command-click']) this.$emit('command-click')
      }
    },
    handlePathMousemove() {
      if (!this.moveClick) return
      if (this.hotkeys == 'Command') this.mouse.move = true
      else this.mouse.move = false
    },
    handlePathMouseleave() {
      if (!this.moveClick) return
      if (this.mouse.move) this.mouse.move = false
    }
  }
}
</script>

<style lang="scss" scoped>
.path-box {
  &__content {
    display: block;
    width: 100%;
  }
  &-item {
    display: block;
    box-sizing: border-box;
    min-height: 42px;
    padding: 0 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    &.move span {
      cursor: pointer;
      text-decoration: underline;
    }
  }
  &-url {
    margin-bottom: 10px;
  }
  &-textarea {
    padding: 10px;
    line-height: 1.4;
  }
}
// .input-label {
//   display: block;
//   margin-top: 10px;
// }
// .input-url {
//   margin-bottom: 10px;
// }
// .input-textarea {
//   padding: 10px;
//   line-height: 1.4;
// }
</style>
