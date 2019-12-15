<template>
  <div>
    <notedo-nv></notedo-nv>

    <b-container style="margin-top:5%;">
      <b-row>
        <b-col>
          <b-card id="shadow" title="Perfil" style="border-color: #1a9cd7">
            <label style="font-weight: bold; color: #1a9cd7"
              >Información general</label
            >
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">
              <b-form-group
                id="input-group-2"
                label="Nombre:"
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

              <label style="font-weight: bold; color: #1a9cd7"
                >Cambiar contraseña</label
              >

              <b-form-group
                id="input-group-5"
                label="Contraseña actual:"
                label-for="input-5"
                description="ingresa tu contraseña actual"
              >
                <b-form-input
                  id="input-5"
                  v-model="form.password"
                  type="password"
                  placeholder="***"
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
                  v-model="form.new_password"
                  type="password"
                  placeholder="***"
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
                  v-model="form.new_password_confirm"
                  type="password"
                  placeholder="***"
                ></b-form-input>
              </b-form-group>

              <b-button
                type="submit"
                variant="primary"
                style="color: #ffffff; background-color:#1a9cd7;"
                >Guardar cambios</b-button
              >
            </b-form>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: "",
        name: "",
        password: "",
        new_password: "",
        new_password_confirm: ""
      },

      show: true
    };
  },
  created() {
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json"
      }
    };
    this.axios.get("/user", config).then(response => {
      this.form = response.data.user;
      this.form.password = "";
    });
  },
  methods: {
    onSubmit(evt) {
      alert("Aaaaaaaaa");
      evt.preventDefault();
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      };

      this.axios.post("/editProfile", this.form, config)
      .then(
        response => {
          if (response.status == 200) {
            this.$bvToast.toast(response.data.message, {
              title: "Exito!",
              toaster: "b-toaster-top-right",
              variant: "success",
              solid: true,
              appendToast: false
            });
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
        }
      );
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";

      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>
