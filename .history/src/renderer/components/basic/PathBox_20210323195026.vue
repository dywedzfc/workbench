<template>
  <div class="path-box__content">
    <div class="path-box-item" :class="{ 'path-box-url': memo }" @mouseenter="handlePathMousemove">
      {{ url }}
    </div>
    <div class="path-box-item path-box-textarea" v-if="memo">{{ memo }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { HOTKEYS } from 'assets/script/request'
export default {
  name: 'PathBox',
  props: { url: String, memo: { type: String, default: '' } },
  data() {
    return {
      mouse: { enter: false }
    }
  },
  computed: {
    ...mapGetters({ hotkeys: HOTKEYS })
  },
  mounted() {
    console.info('data:', this.memo, typeof this.memo)
  },
  methods: {
    handlePathMousemove() {
      console.info('mouse-move:')
      if (this.hotkeys == 'Command') {
        this.mouse.enter = true
      }
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
