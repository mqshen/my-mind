import uniqueId from 'lodash/uniqueId'
import eventBus from "./eventBus";

export default class Editor {
  constructor() {
    this.id = uniqueId();
  }
  getGrpah() {
    return this.graph
  }
  emit(event, params) {
    if (event === 'afterAddPage') {
      this.graph = params.graph
    }
    eventBus.$emit(event, params)
  }
  on(event) {
    switch (event) {
      case 'changeNodeData':
        this.graph.refresh()
        break
    }
  }
  add(type, item) {
    console.log("do add")
    this.graph.add(type, item)
  }
  update(item, model) {
    this.graph.update(item, model)
  }
  remove(item) {
    const node = this.graph.findById(item.id)
    this.graph.remove(node)
  }
}