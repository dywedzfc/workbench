<template>
  <div class="path-box">
    <div class="path-box" :class="{ 'input-url': form.serverAddressMemo }">
      {{ form.serverAddress }}
    </div>
    <div class="input-box block input-textarea" v-if="form.serverAddressMemo">
      {{ form.serverAddressMemo }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'PathBoxItem'
}
</script>

<style lang="scss" scoped></style>
