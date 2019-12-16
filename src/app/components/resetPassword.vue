<template>
  <!-- Form-->
  <div>
    <notedo-nv v-bind:rg="rg"> </notedo-nv>
    <b-container>
      <b-col
        style="display: flex; justify-content: center; align-items: center;"
      >
        <b-row>
          <b-card
            id="shadow"
            style="margin-top:20%; border-radius: 1rem; horizontal-aligment:center"
          >
            <b-card-body v-if="validToken" title="Restablecer contraseña">
              <b-card-text>
                <b-form @submit="onSubmit" @reset="onReset">
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
                      autocapitalize="none"
                    ></b-form-input>
                  </b-form-group>

                  <!-- Repeat password -->
                  <b-form-group
                    id="input-group-4"
                    label="Repetir contraseña:"
                    label-for="input-4"
                  >
                    <b-form-input
                      id="input-4"
                      v-model="form.confirm_password"
                      type="password"
                      required
                      placeholder="***"
                      autocapitalize="none"
                    ></b-form-input>
                  </b-form-group>

                  <b-button
                    type="submit"
                    variant="primary"
                    style="color: #ffffff; background-color:#1a9cd7;"
                    >Recuperar contraseña</b-button
                  >
                </b-form>
              </b-card-text>

              <b-link
                href="/#/login"
                style=" position: absolute; color: #1a9cd7;"
                >Volver al inicio</b-link
              >
            </b-card-body>

            <b-card-body
              v-if="!validToken && validToken != null"
              title="Solcitud expirada"
            >
              <b-card-text>
                Vuelve a solicitar el cambio de contraseña
              </b-card-text>
              <b-button
                href="/#/forgotPass"
                variant="primary"
                style="color: #ffffff; background-color:#1a9cd7;"
                >Volver a solicitar cambio de contraseña</b-button
              >
            </b-card-body>
          </b-card>
        </b-row>
      </b-col>
    </b-container>
  </div>
</template>

<script>
import router from "../router";
export default {
  data() {
    return {
      form: {
        confirm_password: "",
        password: ""
      },
      show: true,
      rg: true,
      validToken: null
    };
  },
  beforeCreate() {
    this.axios.get(`/resetPass/${this.$route.params.token}`).then(
      response => {
        if (response.status == 200) {
          this.validToken = true;
        }
      },
      error => {
        if (error.response.status == 408) {
          this.validToken = false;
        }

        if (error.response.status == 500) {
          this.validToken = false;
        }
      }
    );
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

      this.axios
        .post(`/resetPasss/${this.$route.params.token}`, this.form, config)
        .then(
          response => {
            if (response.status == 200) {
              router.push("/login");
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
              this.$bvToast.toast(error.response.data.message, {
                title: "Error",
                toaster: "b-toaster-top-right",
                variant: "danger",
                solid: true,
                appendToast: false
              });
            }
            if (error.response.status == 408) {
              this.validToken = false
            }
          }
        );
    },
    checkToken() {},
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.confirmPassword = "";
      this.form.password = "";

      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.validToken = null;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>
