<template>
  <div class="dialog-form">
    <slot></slot>
  </div>
</template>

<script>
import Page from 'components/basic/Page.vue'
import Logo from 'components/Logo.vue'
import DialogBox from 'components/basic/DialogBox.vue'
import { getDateTime } from 'util'
import { SHORTCUT_MENU_LIST, requestShortcutMenuList } from 'assets/script/request'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: { Page, Logo, DialogBox },
  data() {
    return { datetime: '', times: { datetime: null }, edit: false, dialog: { display: false } }
  },
  computed: {
    ...mapGetters({ shortcutMenuList: SHORTCUT_MENU_LIST }),
  },
  mounted() {
    this.getDateTime()
    requestShortcutMenuList()
  },
  methods: {
    getDateTime() {
      this.datetime = getDateTime(new Date())
      if (this.times.datetime) clearTimeout(this.times.datetime)
      this.times.datetime = setTimeout(this.getDateTime, 1000)
    },

    handleIconTypeClick() {
      this.edit = !this.edit
    },
    handleGroupItemClick(item) {
      if (item.href) this.$router.push(item.href)
    },
    handleAddGroupClick() {
      this.dialog.display = true
    },
  },
}
</script>

<style lang="scss" scoped>
.template-wrapper {
  padding: 20px;
  text-align: center;

  &::v-deep .logo-box {
    margin: 0 auto;
  }
}
.group {
  &-card {
    display: flex;
    flex-wrap: wrap;
    max-width: 42vw;
    margin: 0 auto;
    margin-top: 30px;
    padding: 0.5vw;
  }
  &-item {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;

    width: 5vw;
    height: 5vw;
    margin: 1vw 0.5vw;
    border-radius: 15px;
    background-color: transparentize(#eeeeee, 0.6);
    font-size: 2.5vw;

    &:hover {
      background-color: #409eff;
      color: #ffffff;

      .title {
        transform: translateY(5px);
        color: #409eff;
      }
    }
    .title {
      position: absolute;
      top: 100%;
      transform: translateY(-5px);
      transition: transform 0.3s ease-in-out, color 0.3s ease-in-out;

      font-size: 16px;
      font-weight: bold;
      color: transparent;
    }
  }
}
</style>
