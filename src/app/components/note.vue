<template>
  <div>
    <notedo-nv></notedo-nv>
    <b-container>
      <b-row>
        <b-col></b-col>
        <b-col lg="12" md="12" sm="12" style="padding: 5px;">
          <b-card header-tag="header" footer-tag="footer">
            <template v-slot:header>
              <div>
                <b-form-input
                  v-model="note.title"
                  placeholder="Titulo de la nota"
                ></b-form-input>
              </div>
            </template>
            <b-card-text
              ><div>
                <b-form-textarea
                  id="textarea"
                  v-model="note.body"
                  placeholder="Enter something..."
                  rows="3"
                  max-rows="6"
                ></b-form-textarea></div
            ></b-card-text>
            <template v-slot:footer>
              <div>
                <b-button-group>
                  <b-button @click="save">Guardar</b-button>
                  <b-dropdown right text="Menu">
                    <b-dropdown-item>Item 1</b-dropdown-item>
                    <b-dropdown-item>Item 2</b-dropdown-item>
                    <b-dropdown-divider></b-dropdown-divider>
                    <b-dropdown-item>Item 3</b-dropdown-item>
                  </b-dropdown>
                  <b-dropdown right split text="Split Menu">
                    <b-dropdown-item>Item 1</b-dropdown-item>
                    <b-dropdown-item>Item 2</b-dropdown-item>
                    <b-dropdown-divider></b-dropdown-divider>
                    <b-dropdown-item>Item 3</b-dropdown-item>
                  </b-dropdown>
                </b-button-group>
              </div>
            </template>
          </b-card>
        </b-col>
        <b-col></b-col>
      </b-row>
      <b-row>
        <b-col
          v-for="note in notes"
          :key="note.title"
          lg="4"
          md="6"
          sm="12"
          style="padding:5px;"
        >
          <b-card title="Title" header-tag="header" footer-tag="footer">
            <template v-slot:header>
              <h6 class="mb-0">{{note.title}}</h6>
            </template>
            <b-card-text>{{note.body}}</b-card-text>
            <b-button href="#" variant="primary">Go somewhere</b-button>
            <template v-slot:footer>
              <em>Footer Slot</em>
            </template>
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
      note: {
        title: "",
        body: "",
        color: "#ffffff"
      },
      notes: []
    };
  },
  created() {
    this.read();
  },
  methods: {
    save() {
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      };
      this.axios.post("/note", this.note, config).then(response => {
        console.log(response.data.message + response.status);
        this.read();
      });
    },
    read() {
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      };
      this.axios.get("/note", config).then(response => {
        this.notes = response.data;
        console.log(response.data);
      });
    }
  }
};
</script>
