<template>
  <div>
    <notedo-nv> </notedo-nv>
    <userProfile> </userProfile>
    
    <!--
    <list-todo></list-todo>
    <login> </login>
    <newUser></newUser>
    <forgotPassword> </forgotPassword>
    -->

    <!-- <b-container>
      <b-row>
        <b-col>
          <note-card> </note-card>
        </b-col>
        <b-col>
          <note-card> </note-card>
        </b-col>
        <b-col>
          <note-card> </note-card>
        </b-col>
      </b-row>
    </b-container> -->
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
          this.axios.get('/note')
          .then(res => console.log(res.response))
          .catch(e => console.log(e.response))  
        }
    }
}
</script>