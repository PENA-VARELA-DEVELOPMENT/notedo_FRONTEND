<template>
  <!-- Form-->
  <div>
    <b-card
      no-body
      class="overflow-hidden"
      style="max-width: 100%; max-height:100%, horizontal-aligment:center"
    >
      <b-row no-gutters>
        <b-col md="6">
          <b-card-img src="/images/registro.jpg" class="rounded-0"></b-card-img>
        </b-col>
        <b-col md="6">
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

                <b-button type="submit" variant="primary"
                  >Iniciar sesión</b-button
                >
                <b-button type="reset" variant="danger">Cancelar</b-button>
              </b-form>
            </b-card-text>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import qs from "query-string";
export default {
  data() {
    return {
      form: {
        email: "",
        password: ""
      },

      show: true
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
      
      this.axios
        .post("/login", this.form, config)
        .then(response => console.log(response.data))
        .catch(error => {
          console.log(error);
        });
      alert(JSON.stringify(this.form));
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
