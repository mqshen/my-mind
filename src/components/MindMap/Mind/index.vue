<template>
  <div />
</template>

<script>
import customNode from './customNode'
import customEdge from './customEdge'

export default {
  name: 'Mind',
  data () {
    return {
      page: null
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      customNode.init()
      customEdge.init()
    }
  }
}
</script>
