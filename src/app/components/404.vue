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
            <b-card-body title="Algo no anda bien!">
              <b-card-text>
                <h2 style="color: #FFCC00;">Error 404</h2>
              </b-card-text>
              <b-button
                href="/#/notes"
                variant="primary"
                style="color: #ffffff; background-color:#1a9cd7;"
                >Volver al inicio</b-button
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
      rg: null,
      validToken: null
    };
  },
  beforeCreate() {
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json"
      }
    };
    this.axios.get("/user", config).then(
      response => {},
      error => {
        if (error.response.status == 401) {
          this.rg = true;
        }

        if (error.response.status == 200) {
          this.rg = false;
        }
      }
    );
  }
};
</script>
