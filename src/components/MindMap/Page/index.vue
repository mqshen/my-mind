<template>
  <div class="page">
    <div :id="pageId" class="graph-container" style="position: relative;"></div>
  </div>
</template>


<script>
import G6 from '@antv/g6'
// import { initBehavors } from "../behavior"
import pick from 'lodash.pick'
export default {
  data() {
    return {
      pageId: "graph-container",
      graph: null
    };
  },
  props: {
    height: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 0
    },
    data: {
      type: Object,
      default: () => {}
    },
    editor: {
      type: Object,
      default: () => {}
    },
    command: {
      type: Object,
      default: () => {}
    }
  },
  created() {
    // initBehavors();
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    init() {
      // const height =  this.height - 42 
      // const width =  this.width - 400

      this.graph = new G6.Graph({
    container: 'graph-container',
    width: window.innerWidth,
    height: window.innerHeight,
    layout: {
      type: 'dagre',
      rankdir: 'LR',
      nodesep: 30,
      ranksep: 100
    },
    modes: {
      default: ['drag-canvas']
    },
    defaultNode: {
      shape: 'round-rect',
      labelCfg: {
        style: {
          fill: '#000000A6',
          fontSize: 10
        }
      },
      style: {
        stroke: '#72CC4A',
        width: 150
      }
    },
    defaultEdge: {
      shape: 'polyline'
    }
  });
      // const { editor, command } = this.$parent;
      this.editor.emit("afterAddPage", { graph: this.graph, command: this.command , page: this});

      this.readData();
    },
    readData() {
      let data = this.data;
      if (data) {
        this.graph.read(data);
      }
    },
    readFlowData(data) {
      this.graph.read(data);
    },
    handleSaveData() {
      const saveData = this.graph.save()

      const nodes = saveData.nodes.map((item) => {
        const arr = ['id', 'label', 'x', 'y', 'nodeType', 'shape', 'type', 'taskId', 'image', 'stateImage', 'inPoints', 'outPoints', 'color']
        const node = pick(item, arr)
        node.type = node.shape || node.type
        delete node.shape
        return node
      })
      const edges = saveData.edges.map((item) => {
        return {
          source: item.sourceId,
          target: item.targetId,
          start: { x: item.start.x, y: item.start.y },
          end: { x: item.end.x, y: item.end.y },
          type: item.shape || item.type
        }
      })

      return {
        nodes: nodes,
        edges: edges
      }
    },
  }
};
</script>

<style scoped>
.page{
  margin-left:200px;
  margin-right: 200px;
}
</style>