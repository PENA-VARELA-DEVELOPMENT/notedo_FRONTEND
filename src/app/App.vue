<template>
  <div>
    <login></login>
  </div>
</template>

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