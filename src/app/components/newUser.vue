<template>
  <!-- Form-->
  <div>
    <notedo-nv v-bind:rg="rg"> </notedo-nv>

    <b-container
    >
      <b-col
        style="display: flex; justify-content: center; align-items: center;"
      >
        <b-row no-gutters>
          <b-card
            id="shadow" style="margin-top:20%; border-radius: 1rem; horizontal-aligment:center: vertical-aligment: center;"
          >
            <b-card-body
              title="Regístrate aquí, y comieza a organizarte mejor!"
            >
              <b-card-text>
                <!-- Email -->
                <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                  <!-- Name -->
                  <b-form-group
                    id="input-group-2"
                    label="Nombre y apellido:"
                    label-for="input-2"
                  >
                    <b-form-input
                      id="input-2"
                      v-model="form.name"
                      required
                      placeholder="Maria Vasquez"
                    ></b-form-input>
                  </b-form-group>
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

                  <!-- Repeat password -->
                  <b-form-group
                    id="input-group-3"
                    label="Repetir contraseña:"
                    label-for="input-3"
                  >
                    <b-form-input
                      id="input-4"
                      v-model="form.confirmpassword"
                      type="password"
                      required
                      placeholder="***"
                    ></b-form-input>
                  </b-form-group>

                  <b-button
                    type="submit"
                    variant="primary"
                    style="color: #ffffff; background-color:#1a9cd7;"
                    >Registrarse</b-button
                  >
                  <b-button
                    type="reset"
                    variant="primary"
                    style="color: #ffffff; background-color:#1c5b78;"
                    >Cancelar</b-button
                  >
                </b-form>
              </b-card-text>
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
        email: "",
        name: "",
        password: "",
        confirmpassword: ""
      },
      rg: true,
      show: true
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.axios.post("/register", this.form).then(
        response => {
          if (response.status == 200) {
            router.push("/login");
          }
        },
        error => {
          if (error.response.status == 422) {
            this.$bvToast.toast(error.response.data.message, {
              title: "Error",
              toaster: "b-toaster-top-right",
              variant: "danger",
              solid: true,
              appendToast: false
            });
          } else if (error.response.status == 400) {
            this.$bvToast.toast(error.response.data, {
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
      this.form.confirmpassword = "";

      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>
