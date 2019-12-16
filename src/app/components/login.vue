<template>
  <!-- Form-->
  <div>
    <notedo-nv v-bind:rg="rg"> </notedo-nv>
    <b-container
    >
      <b-row no-gutters>
        <b-col
          style="display: flex; justify-content: center; align-items: center;"
        >
          <b-card
            id="shadow" style="margin-top:20%; border-radius: 1rem; horizontal-aligment:center: vertical-aligment: center;"
          >
            <b-card-body title="Bienvenido(a) a notedo">
              <b-card-text>
                <!-- Email -->
                <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                  <b-form-group
                    id="input-group-1"
                    label="Correo electrónico:"
                    label-for="input-1"
                  >
                    <b-form-input
                      id="input-1"
                      v-model="form.email"
                      type="email"
                      required
                      placeholder="maria28@gmail.com"
                    ></b-form-input>
                  </b-form-group>

                  <!-- Password -->
                  <b-form-group
                    id="input-group-3"
                    label="Contraseña:"
                    label-for="input-3"
                    description="Para mayor seguridad tu contraseña debe ser mayor a 8 caracteres"
                  >
                    <b-form-input
                      id="input-3"
                      v-model="form.password"
                      type="password"
                      required
                      placeholder="***"
                    ></b-form-input>
                  </b-form-group>
                  <b-button type="submit" variant="primary" style="color: #ffffff; background-color:#1a9cd7;">Iniciar sesión</b-button>
                <b-button type="reset"  variant="primary" style="color: #ffffff; background-color:#1c5b78;" >Cancelar</b-button>
              </b-form>
            </b-card-text>
            <b-link href="/#/forgotPass" style=" position: absolute; color: #1a9cd7;">¿Olvidó su contraseña?</b-link>
          </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>

</template>




<script>
import qs from "query-string";
import router from "../router";
export default {
  data() {
    return {
      form: {
        email: "",
        password: ""
      },

      show: true,
      rg: true
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      };

      this.axios.post("/login", this.form, config).then(
        response => {
          if (response.status == 200) {
            router.push("/notes");
          }
        },
        error => {

          if(error && !error.response){
            this.$bvToast.toast(`Ha ocurrido un error`, {
              title: "Error",
              toaster: "b-toaster-top-right",
              variant: "danger",
              solid: true,
              appendToast: false
            });
          }
          if (error.response.status == 401) {
            this.$bvToast.toast(`Ha ocurrido un error`, {
              title: "Error",
              toaster: "b-toaster-top-right",
              variant: "danger",
              solid: true,
              appendToast: false
            });
          } else if (error.response.status == 400) {
            this.$bvToast.toast(error.response.data.message, {
              title: "Error",
              toaster: "b-toaster-top-right",
              variant: "danger",
              solid: true,
              appendToast: false
            });
          } 

          
          
        }
      );
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.password = "";

      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>
