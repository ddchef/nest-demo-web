<template>
  <app-view back-btn>
    <app-block>
      <h1>info1</h1>
    </app-block>
  </app-view>
</template>
<script>
export default {
  name: 'BuildInfo',
  props: {
    id: String
  },
  inject: ['eventBus'],
  data () {
    return {
      socket: null
    }
  },
  computed: {
  },
  created () {
    const socket = new WebSocket('ws://localhost:8081/api/v1')
      socket.onopen = function () {
        console.log('Connected')
        socket.send(
          JSON.stringify({
            event: 'events',
            data: 'test'
          })
        )
        socket.onmessage = function (data) {
          console.log(data)
        }
      }
  },
  methods: {
  }
}
</script>
