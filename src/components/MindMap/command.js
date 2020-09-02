import uniqueId from 'lodash/uniqueId'

class command {
  constructor (editor) {
    this.editor = editor
  }

  executeCommand (key, datas) {
    datas.forEach(data => {
      let model = data
      if (key === 'add') {
        model.id = uniqueId(data.type)
      } else if (key === 'delete') {
        model = data.getModel()
        model.type = data.getType()
        model.id = data.get('id')
      }

      this.doCommand(key, model)
    })
  }

  doCommand (key, data) {
    switch (key) {
      case 'add':
        this.add(data.type, data)
        break
      case 'update':
        this.update(data.item, data.newModel)
        break
      case 'delete':
        this.remove(data)
        break
    }
  }

  add (type, item) {
    this.editor.add(type, item)
  }

  update (item, model) {
    this.editor.update(item, model)
  }

  remove (item) {
    this.editor.remove(item)
  }
}

export default command
