<template>
  <div>
    <notedo-nv v-bind:rg="rg"> </notedo-nv>
    <!-- Form-->
    <b-container>
      <b-col
        style="display: flex; justify-content: center; align-items: center;"
      >
        <b-row>
          <b-card
            id="shadow"
            style="margin-top:20%; border-radius: 1rem; horizontal-aligment:center"
          >
            <b-card-body v-if="!sended" title="¿Olvidaste tu contraseña?">
              <b-card-text>
                <!-- Email -->
                <b-form @submit="onSubmit" @reset="onReset">
                  <b-form-group
                    id="input-group-1"
                    label="Ingresa tu correo electrónico para poder restablecerla:"
                    label-for="input-1"
                  >
                    <b-form-input
                      id="input-1"
                      v-model="user.email"
                      type="email"
                      required
                      placeholder="maria28@gmail.com"
                    ></b-form-input>
                  </b-form-group>

                  <b-button
                    type="submit"
                    variant="primary"
                    style="color: #ffffff; background-color:#1a9cd7;"
                    >Restablecer contraseña</b-button
                  >
                </b-form>
              </b-card-text>
              <b-link
                href="/#/login"
                style=" position: absolute; color: #1a9cd7;"
                >Volver al inicio</b-link
              >
            </b-card-body>

            <b-card-body v-if="sended" title="Correo enviado">
              <b-card-text>
                Se ha enviado un link a tu correo para que puedas reestablecer
                tu contraseña, si no aparece en unos cuantos minutos, revisa tu
                carpeta de spam o vuelve a intentarlo.
              </b-card-text>
              <b-button
                href="/#/login"
                variant="primary"
                style="color: #ffffff; background-color:#1a9cd7;"
                >Volver a iniciar sesión</b-button
              >
            </b-card-body>
          </b-card>
        </b-row>
      </b-col>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: { 
        email: "",
        clientHost: ""
        },
      rg: true,
      sended: false
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.user.clientHost = location.host
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      };
      this.axios.post("/resetPass", this.user, config).then(
        response => {
          if (response.status == 200) {
            this.sended = true;
          }
        },
        error => {
          if (error.response.status == 400) {
            this.$bvToast.toast(error.response.data.message, {
              title: "Error",
              toaster: "b-toaster-top-right",
              variant: "danger",
              solid: true,
              appendToast: false
            });
          }

          if (error.response.status == 500) {
            this.$bvToast.toast("Ha ocurrido un error", {
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
      this.user.email = "";
      this.user.clientHost = "";
      this.sended = false;
    }
  }
};
</script>
