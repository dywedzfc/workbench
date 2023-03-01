<template>
  <div class="path-box-item">
    <div class="input-box input-block" :class="{ 'input-url': form.serverAddressMemo }">
      {{ form.serverAddress }}
    </div>
    <div class="input-box input-block input-textarea" v-if="form.serverAddressMemo">
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
