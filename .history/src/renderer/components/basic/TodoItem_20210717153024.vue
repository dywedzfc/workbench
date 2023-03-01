<template>
  <div class="todo-list-item" @click="handleTodoItemClick">
    <div class="todo-body"><slot></slot></div>
    <div
      class="todo-tool"
      :class="{ one: isOneTodoToolItem, two: isTwoTodoToolItem }"
      v-if="edit || remove"
    >
      <div
        class="todo-tool-item edit el-icon-edit"
        v-if="edit"
        @click.stop="handleTodoItemEditClick"
      ></div>
      <div
        class="todo-tool-item remove el-icon-delete"
        v-if="remove"
        @click.stop="handleTodoItemRemoveClick"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    data: Object,
    edit: { type: Boolean, default: true },
    remove: { type: Boolean, default: true }
  },
  computed: {
    useTodoToolCount() {
      let count = 0
      if (this.edit) count++
      if (this.remove) count++
      return count
    },
    isOneTodoToolItem() {
      return this.useTodoToolCount == 1
    },
    isTwoTodoToolItem() {
      return this.useTodoToolCount == 2
    }
  },
  mounted() {},
  methods: {
    handleTodoItemClick() {
      if (this.$listeners['click']) this.$emit('click', this.data)
    },
    handleTodoItemEditClick() {
      if (this.$listeners['edit']) this.$emit('edit', this.data)
    },
    handleTodoItemRemoveClick() {
      if (this.$listeners['remove']) this.$emit('remove', this.data)
    }
  }
}
</script>

<style lang="scss" scoped>
.todo-list-item {
  position: relative;
  overflow: hidden;
  background-color: rgba(238, 238, 238, 0.3);
  user-select: none;

  min-height: 40px;
  margin-bottom: 15px;
  border: 1px solid #eeeeee;
  border-radius: inherit;

  &:last-child {
    margin-bottom: 0;
  }

  .todo-body {
    height: 100%;
  }
  .todo-tool {
    display: flex;
    position: absolute;
    top: 0;
    left: 100%;
    transition: left 0.35s linear;

    height: 100%;
    border-top-right-radius: inherit;
    border-bottom-right-radius: inherit;

    &-item {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      width: 50px;
      height: 100%;

      font-size: 24px;
      color: #ffffff;

      &:not(:first-child) {
        margin-left: -30px;
        transition: margin-left 0.35s linear;
      }
      &:last-child {
        border-top-right-radius: inherit;
        border-bottom-right-radius: inherit;
      }

      &.edit {
        background-color: #409eff;
        &:hover {
          background-color: #8cc5ff;
        }
      }
      &.remove {
        background-color: #f56c6c;
        &:hover {
          background-color: #f89696;
        }
      }
    }
  }
  &:hover {
    .todo-tool-item:not(:first-child) {
      margin-left: 0;
    }
    .one.todo-tool {
      left: calc(100% - 50px);
    }
    .two.todo-tool {
      left: calc(100% - 100px);
    }
  }
}
</style>
