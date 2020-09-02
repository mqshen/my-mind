<template>
<el-container>
  <el-header height="40px">
    <div class="gr-row" >
        <el-button icon="el-icon-fa-save" size="medium" ></el-button>
        <el-button icon="el-icon-fa-repeat" size="medium"></el-button>
        <el-button icon="el-icon-fa-undo" size="medium"></el-button>
        <div class="el-separator"></div>
        <el-button icon="el-icon-gr-topic" size="medium" @click="addRoot"></el-button>
        <el-button icon="el-icon-gr-subtopic" size="medium"  @click="addEdge"></el-button>
        <el-button icon="el-icon-fa-link" size="medium"></el-button>
        <el-button icon="el-icon-fa-image" size="medium"></el-button>
        <el-button icon="el-icon-delete" size="medium"></el-button>
    </div>
  </el-header>
  <el-main>
      <page :height="height" :width="width" :data="data" :editor="editor" :command="command"/>
  </el-main>
  <Mind />
</el-container>
</template>

<script>
import Page from "./Page";
import Mind from './Mind'
import Editor from './editor'
import Command from './command'

export default {
  name: "MindMapEditor",
  components: {
    Page,
    Mind
  },
  props: {
    height: {
      type: Number,
      default: document.documentElement.clientHeight
    },
    width: {
      type: Number,
      default: document.documentElement.clientWidth
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  created() {
    this.init();
  },
  data() {
    return {
      command: null,
      editor: {},
    };
  },
  methods: {
    init() {
      this.editor = new Editor();
      this.command = new Command(this.editor);
    },
    addRoot() {
      let data = { id: 'node1', label: '公司1' , type: 'node'};
      let data1 = { id: 'node2', label: '公司2' , type: 'node'};
      this.command.executeCommand("add", [data, data1]);
    },
    addEdge() {
      let data = {
        id: 'edge1',
        source: 'node2',
        target: 'node3',
        type: 'edge',
        data: {
          type: '凭证开立',
          amount: '100,000,000,00 元',
          date: '2019-08-03'
        }
      };
      this.command.executeCommand("add", [data]);
    }
  }
}
</script>

<style scoped lang="scss">
.el-header {
  height: 40px;
}
.gr-row>.el-button {
  border: 0;
}
.el-separator {
  width: 1px;
  height: 100%;
  margin: 0 14px;
  background: #e8e8e8;
  display: inline-block;
}
.gr-row {
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  .el-button {
    padding: 10px 5px;
  }
}
.el-header {
  padding: 0;
}
</style>