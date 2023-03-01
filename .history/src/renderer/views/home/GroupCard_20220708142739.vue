<template>
  <div class="group-card">
    <template v-for="item in shortcutMenuList">
      <el-popover
        v-model="item.show"
        v-if="edit && item.operate === 1"
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
    <div class="group-item button-add" v-if="edit" @click="handleAddGroupClick">
      <i class="el-icon-plus"></i>
    </div>
  </div>
</template>

<script>
// import { getDateTime, msgSuccess, msgWarning, messageBox, iconClassName } from 'util'
import { messageBox } from 'util'
// import { mapGetters } from 'vuex'
const { ipcRenderer } = window.require('electron')

export default {
  name: 'Home',
  // components: { Page, Logo, DialogBox, SearchBar, ShortcutMenuDialog },
  data() {
    return { query: '' }
  },
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
    handleEditGroupClick(item) {
      if (item.operate === 0) return
      if (item.show) item.show = false
      this.setDialogData(item)
      this.dialog.display = true
      this.dialog.type = 'E'
    },
    handleDeleteGroupClick(item) {
      if (item.operate === 0) return
      messageBox(`“${item.title}”是否确认删除？`)
        .then(() => {
          this.delShortcutMenu(item.id)
        })
        .catch(() => {})
    },
  },
}
</script>

<style lang="scss" scoped>
.search {
  &-bar {
    display: flex;
    width: 33vw;
    margin: 0 auto;
    margin-top: 5vw;
  }
  &-button {
    padding-left: 1.5vw;
    padding-right: 2.5vw;
    border-radius: 0 50px 50px 0;
    border-color: #000000;
    background-color: #000000;
    font-size: 1.6vw;

    &:hover {
      border-color: #333333;
      background-color: #333333;
    }
  }
  &-input ::v-deep .el-input__inner {
    // height: 50px;
    height: 4vw;
    padding-left: 3.5vw;
    border-color: #000000;
    border-width: 2px;
    border-right-width: 0;
    border-radius: 50px 0 0 50px;
    font-size: 1.56vw;
    color: #000000;
  }
  &-input ::v-deep .el-icon-search {
    box-sizing: border-box;
    width: 3.4vw;
    padding: 0 10px;
    padding-top: 2px;
    font-size: 1.9vw;
    line-height: 3.8vw;
    color: #000000;
  }
}
</style>
