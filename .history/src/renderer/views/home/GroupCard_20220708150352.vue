<template>
  <div class="group-card">
    <template v-for="item in data">
      <el-popover
        v-model="item.show"
        v-if="type && item.operate === 1"
        :key="`popover_${item.id}`"
        :title="item.title"
        trigger="hover"
      >
        <!-- <el-dropdown-item divided></el-dropdown-item> -->
        <el-dropdown-item class="primary" divided @click.native="handleEditGroupClick(item)">
          <i class="el-icon-edit"></i>编辑
        </el-dropdown-item>
        <el-dropdown-item class="danger" @click.native="handleDeleteGroupClick(item)">
          <i class="el-icon-delete"></i>删除
        </el-dropdown-item>
        <div class="group-item" slot="reference">
          <i :class="iconClassName(item.icon)"></i>
        </div>
      </el-popover>
      <div class="group-item" v-else :key="`group_${item.id}`" @click="handleGroupItemClick(item)">
        <i :class="iconClassName(item.icon)"></i>
        <span class="title">{{ item.title }}</span>
      </div>
    </template>
    <div class="group-item button-add" v-if="type" @click="handleAddGroupClick">
      <i class="el-icon-plus"></i>
    </div>
  </div>
</template>

<script>
// import { getDateTime, msgSuccess, msgWarning, messageBox, iconClassName } from 'util'
import { messageBox, iconClassName } from 'util'
// import { mapGetters } from 'vuex'
const { ipcRenderer } = window.require('electron')

export default {
  name: 'GroupCard',
  // components: { Page, Logo, DialogBox, SearchBar, ShortcutMenuDialog },
  props: { data: { type: Array, required: true }, type: { type: Boolean } },
  // data() {
  //   return { query: '' }
  // },
  computed: {},
  mounted() {},
  methods: {
    handleGroupItemClick(item) {
      console.info('data-group-item:', item, this.edit)
      if (this.edit) return
      if (item.href) {
        if (item.hrefType) ipcRenderer.invoke('open-browser', item.href)
        else this.$router.push(item.href)
      }
    },
    handleAddGroupClick() {
      if (this.$listeners.add) this.$emit('add')
      // this.setDialogData()
      // this.dialog.display = true
      // this.dialog.type = 'A'
    },
    handleEditGroupClick(item) {
      if (this.$listeners.edit) this.$emit('edit', item)
      // if (item.operate === 0) return
      // if (item.show) item.show = false
      // this.setDialogData(item)
      // this.dialog.display = true
      // this.dialog.type = 'E'
    },
    handleDeleteGroupClick(item) {
      if (this.$listeners.remove) this.$emit('remove', item)
      // if (item.operate === 0) return
      // messageBox(`“${item.title}”是否确认删除？`)
      //   .then(() => {
      //     this.delShortcutMenu(item.id)
      //   })
      //   .catch(() => {})
    },

    iconClassName(icon) {
      return iconClassName(icon)
    },
  },
}
</script>

<style lang="scss" scoped>
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
