<template>
  <div class="logo-box" :style="logoBoxStyle">
    <div class="datetime-box" v-if="isTime">
      <div class="date">{{ formatterDate }}</div>
      <div class="time">{{ formatterTime }}</div>
    </div>
    <img class="logo" v-if="resetTheme" alt="Work Bench logo" src="../assets/image/logo-w.png" />
    <img class="logo" v-else alt="Work Bench logo" src="../assets/image/logo.png" />
  </div>
</template>

<script>
export default {
  name: 'Logo',
  inject: ['pro_datetime', 'pro_theme'],
  data() {
    return {}
  },
  props: { size: { type: String, default: '200px' }, isTime: { type: Boolean, default: true } },
  computed: {
    resetTheme() {
      return this.pro_theme() == 'dark'
    },
    logoBoxStyle() {
      const style = {}
      const nsReg = /0|(([0-9]|[1-9][0-9]*)(px|%|em|rem|vw))/
      const numReg = /0|([0-9]|[1-9][0-9]*)/
      if (this.size && nsReg.test(this.size)) style.width = style.height = this.size
      else if (this.size && numReg.test(this.size)) style.width = style.height = `${this.size}px`
      return style
    },
    formatterDate() {
      let datetime = this.pro_datetime()
      if (!datetime) return ''
      const [date] = datetime.split(' ')
      return date
    },
    formatterTime() {
      let datetime = this.pro_datetime()
      if (!datetime) return ''
      const [, time] = datetime.split(' ')
      return time
    },
  },
  mounted() {},
  methods: {},
}
</script>

<style lang="scss" scoped>
.logo {
  width: 100%;

  &-box {
    position: relative;
    user-select: none;
  }
}
.datetime-box {
  position: absolute;
  top: calc(50% + 1vw);
  left: 50%;
  opacity: 0.9;
  transform: translate(-50%, -50%);

  width: 300px;
  padding: 20px;

  // font-size: 32px;
  font-size: 2.5vw;
  font-weight: bold;
  // text-shadow: 0 0 2px #ffffff, 0 0 2px #ffffff, 0 0 2px #ffffff, 0 0 2px #ffffff, 0 0 2px #ffffff,
  //   0 0 4px #000000, 0 0 6px #000000;

  .date {
    width: 6em;
    margin-left: calc((300px - 6em) / 2);
    padding-bottom: 5px;
    // font-size: 42px;
    font-size: 3.29vw;
    white-space: nowrap;
  }
  .time {
    padding-top: 5px;
  }
}
</style>
