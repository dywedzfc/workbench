<!-- 发布任务-任务框 -->
<template>
  <div class="task-box">
    <div class="task-title">
      <!-- {{ title || data.title }} -->
      <el-button
        :class="['button-icon', { 'not-button': !hasJianName }]"
        type="primary"
        size="mini"
        @click="handleTitleNameClick"
      >
        {{ projectButtonText }}
      </el-button>
      <span :class="{ 'title-name': hasJianName }" @click="handleTitleNameClick">{{
        projectTitleName
      }}</span>
    </div>
    <div class="task-content">
      <p
        class="task-word"
        :class="{ hover: index === task.hover, edit: index === task.index }"
        v-for="(item, index) in data.task"
        :key="index"
      >
        {{ item.value }}
      </p>
      <p class="task-remarks" v-if="data.remarks">{{ data.remarks }}</p>
      <p class="task-deadline" v-if="data.deadline">{{ data.deadline }}</p>
      <!-- <p class="task-priority" v-if="data.priority">{{ data.priority }}</p> -->
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import { PROJECT_OPTIONS, requestProjectList } from 'assets/script/request'

export default {
  name: 'TaskBox',
  props: {
    title: String,
    data: { type: Object, required: true },
    date: { type: String },
    loading: Boolean
  },
  data() {
    return {
      titleType: false
    }
  },
  computed: {
    ...mapGetters({ projectList: PROJECT_OPTIONS }),
    // projectName() {
    //   const list = _.filter(this.projectList, item => item.value == this.data.projectId)
    //   return list.length > 0 ? list[0].label : ''
    // }
    projectName() {
      const list = _.filter(this.projectList, item => item.value == this.data.projectId)
      return list.length > 0 ? list[0].label : ''
    },
    projectInfo() {
      const list = _.filter(this.projectList, item => item.value == this.data.projectId)
      return list.length ? list[0] : undefined
    },
    projectButtonText() {
      return this.titleType ? '简' : '全'
    },
    projectTitleName() {
      const data = this.projectInfo
      return data ? (this.titleType ? data.title : data.label) : ''
    },
    projectJianName() {
      const data = this.projectInfo
      return data && data.title ? `简：${data.title}` : ''
    },
    hasJianName() {
      const data = this.projectInfo
      return !!(data.title && data.title.trim())
    }
  },
  watch: {
    loading(value) {
      if (value) return
      // if (this.task.edit) this.handleTaskEditCloseClick()
    }
  },
  mounted() {
    requestProjectList()
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.task-box {
  flex: 1;

  min-width: calc(50% - 30px);

  position: relative;
  width: calc(50% - 15px);
  margin-right: 30px;
  margin-bottom: 30px;

  &::after {
    position: absolute;
    left: 5%;
    bottom: -15px;

    width: 90%;
    border-top: 1px solid #eeeeee;
    content: '';
  }

  &:nth-child(2n) {
    margin-right: 0;

    &::before {
      position: absolute;
      top: 10%;
      left: -15px;

      height: 80%;
      border-left: 1px solid #eeeeee;
      content: '';
    }
  }
  &:last-child {
    margin-right: 0;
  }
  &:nth-child(2n + 1):nth-last-child(-n + 2),
  &:nth-child(2n + 1):nth-last-child(-n + 2) ~ & {
    margin-bottom: 0;

    &::after {
      display: none;
    }
  }
}
.task-title {
  position: relative;
  padding: 10px;
  // border-bottom: 1px solid #eeeeee;

  font-size: 18px;

  &.edit {
    padding: 5px;
  }

  .title-name {
    cursor: pointer;
  }
  span {
    position: absolute;
    right: 10px;
    background-color: #ffffff;
    margin: -5px;
    padding: 5px;

    border-radius: 4px;
  }
}
.task-toolbar {
  position: absolute;
  top: 0;
  right: 5px;
  display: flex;
  align-items: center;

  height: 100%;
}
.task-content {
  padding: 10px;
  line-height: 1.4;

  &:empty {
    padding: 0;
  }
}
.task-word {
  position: relative;
  margin-bottom: 2px;
  padding: 2px 7px;
  border-radius: 4px;

  &:last-child {
    margin-bottom: 0;
  }
  &.hover {
    background-color: #eeeeee;
    // .task-toolbar {
    //   display: flex;
    // }
  }
  &.edit {
    padding: 0;
  }
}
.not-button {
  cursor: text;
}
.task-remarks {
}
.task-deadline {
}
.task-priority {
}
::v-deep.task-input {
  .el-input__inner {
    padding-left: 5px;
    padding-right: 52px;
  }
}
</style>
