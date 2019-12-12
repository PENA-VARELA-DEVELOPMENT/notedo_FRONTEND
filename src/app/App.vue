<template>
  <div>
    <login></login>
  </div>
</template>

<style>
  body {
    background: #E2F1F7; 
  }
  #shadow {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
</style>

<script>
export default {
    data () {
        return {
            info: null
        }
    },
    created () {
        this.test()
    },
    methods: {
        test(){
          // this.axios.get('/note')
          // .then(res => console.log(res.response))
          // .catch(e => console.log(e.response))  
        }
    }
}
</script>