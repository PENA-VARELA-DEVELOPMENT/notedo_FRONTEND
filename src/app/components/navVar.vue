<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand href="#">Notedo</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item v-if="!rg" href="/#/notes">Notas</b-nav-item>
        <b-nav-item v-if="!rg" href="/#/todo">Tareas</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item v-if="rg" href="/#/register">Registrarse</b-nav-item>
        <b-nav-item v-if="rg" href="/#/login">Iniciar sesión</b-nav-item>

        <b-nav-item-dropdown  v-if="!rg" right>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <em>{{userName}}</em>
          </template>
          <b-dropdown-item href="#">Perfil</b-dropdown-item>
          <b-dropdown-item @click="logOut">Cerrar sesión</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import router from "../router";
export default {
  data(){
    return{
      userName: ""
    }
  },
  props: ["rg"],
  created(){
    if (!this.$props.rg) {
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      };
      this.axios
        .get("/user", config)
        .then(response => {
          this.userName = response.data.user.name
          console.log(response.data.user.name);
        });
    }
    
  },
  methods: {
    logOut(){
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      };
      this.axios.get("/logout", config)
      .then(response => {
        if (response.status == 200) {
          router.push("/login")
        }
        
      })
    }
  }

};
</script>
