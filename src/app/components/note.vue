<template>
  <div>
    <notedo-nv></notedo-nv>

    <b-row style="padding: 20px;">
      <b-col></b-col>
      <b-col lg="8" md="8" sm="8" style="padding: 5px;">
        <b-card
          header-tag="header"
          footer-tag="footer"
          :bg-variant="bodyColor"
          :text-variant="varTextColor"
        >
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
              <b-button-group size="sm">
                <b-button @click="save" variant="success">Guardar</b-button>
                <b-dropdown variant="outline-primary" dropup text="Colores">
                  <b-button-group size="lg">
                    <b-button
                      @click="setColors('success', 'white')"
                      variant="success"
                      v-b-tooltip.hover
                      title="Verde"
                    ></b-button>
                    <b-button
                      @click="setColors('primary', 'white')"
                      variant="primary"
                      v-b-tooltip.hover
                      title="Azul"
                    ></b-button>
                    <b-button
                      @click="setColors('warning', 'white')"
                      variant="warning"
                      v-b-tooltip.hover
                      title="Amarillo"
                    ></b-button>
                    <b-button
                      @click="setColors('secondary', 'white')"
                      variant="secondary"
                      v-b-tooltip.hover
                      title="Gris"
                    ></b-button>
                    <b-button
                      @click="setColors('info', 'white')"
                      variant="info"
                      v-b-tooltip.hover
                      title="Verde azulado"
                    ></b-button>
                    <b-button
                      @click="setColors('light', 'white')"
                      variant="light"
                      v-b-tooltip.hover
                      title="Predeterminado"
                    ></b-button>
                    <b-button
                      @click="setColors('danger', 'white')"
                      variant="danger"
                      v-b-tooltip.hover
                      title="Rojo"
                    ></b-button>
                    <b-button
                      @click="setColors('dark', 'white')"
                      variant="dark"
                      v-b-tooltip.hover
                      title="Gris oscuro"
                    ></b-button>
                  </b-button-group>
                </b-dropdown>
              </b-button-group>
            </div>
          </template>
        </b-card>
      </b-col>
      <b-col></b-col>
    </b-row>
    <b-card-group columns style="padding: 10px;">
      <b-card
        v-for="(notee, index) in notes"
        :key="index"
        header-tag="header"
        footer-tag="footer"
        :id="index"
        @focus="setSCard(notee)"
        v-b-modal.modal-center
        :bg-variant="notee.color"
        :text-variant="notee.textColor"
      >
        <template v-slot:header>
          <h6 class="mb-0">{{ notee.title }}</h6>
        </template>
        <b-card-text>{{ notee.body }}</b-card-text>
      </b-card>
    </b-card-group>

    <b-modal
      id="modal-center"
      bg-variant="primary"
      text-variant="white"
      hide-footer
      hide-header
      centered
    >
      <b-card
        header-tag="header"
        footer-tag="footer"
        :bg-variant="selectedNote.color"
        :text-variant="selectedNote.textColor"
      >
        <template v-slot:header>
          <h4
            @input="onInputTitle"
            @click="onInputTitle"
            contenteditable
            class="my-4 mb-0"
          >
            {{ selectedNote.title }}
          </h4>
        </template>
        <b-card-text
          @input="onInputBody"
          @click="onInputBody"
          contenteditable
          >{{ selectedNote.body }}</b-card-text
        >
        <template v-slot:footer>
          <b-button-group size="sm">
            <b-button @click="edit" variant="success">Guardar</b-button>
            <b-dropdown variant="secondary" dropup text="Colores">
              <b-button-group size="lg">
                <b-button
                  @click="setEditColors('success', 'white')"
                  variant="success"
                  v-b-tooltip.hover
                  title="Verde"
                ></b-button>
                <b-button
                  @click="setEditColors('primary', 'white')"
                  variant="primary"
                  v-b-tooltip.hover
                  title="Azul"
                ></b-button>
                <b-button
                  @click="setEditColors('warning', 'white')"
                  variant="warning"
                  v-b-tooltip.hover
                  title="Amarillo"
                ></b-button>
                <b-button
                  @click="setEditColors('secondary', 'white')"
                  variant="secondary"
                  v-b-tooltip.hover
                  title="Gris"
                ></b-button>
                <b-button
                  @click="setEditColors('info', 'white')"
                  variant="info"
                  v-b-tooltip.hover
                  title="Verde azulado"
                ></b-button>
                <b-button
                  @click="setEditColors('light', 'white')"
                  variant="light"
                  v-b-tooltip.hover
                  title="Predeterminado"
                ></b-button>
                <b-button
                  @click="setEditColors('danger', 'white')"
                  variant="danger"
                  v-b-tooltip.hover
                  title="Rojo"
                ></b-button>
                <b-button
                  @click="setEditColors('dark', 'white')"
                  variant="dark"
                  v-b-tooltip.hover
                  title="Gris oscuro"
                ></b-button>
              </b-button-group>
            </b-dropdown>
            <b-button @click="del" variant="danger">Eliminar</b-button>
          </b-button-group>
        </template>
      </b-card>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      note: {
        _id: "",
        title: "",
        body: "",
        color: "",
        textColor: ""
      },
      notes: [],
      selectedNote: {
        _id: "",
        title: "",
        body: "",
        color: "",
        textColor: ""
      },
      bodyColor: "light",
      varTextColor: ""
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
    },
    setSCard(note) {
      this.selectedNote = note;
    },
    setColors(bColor, tColor) {
      this.bodyColor = bColor;
      this.note.color = bColor;
      this.varTextColor = tColor;
      this.note.textColor = tColor;
    },
    setEditColors(bColor, tColor) {
      this.selectedNote.color = bColor;
      this.selectedNote.textColor = tColor;
    },
    onInputBody(e) {
      this.selectedNote.body = e.target.innerText;
    },
    onInputTitle(e) {
      this.selectedNote.title = e.target.innerText;
    },
    del() {
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      };
      this.axios
        .delete(`/note/${this.selectedNote._id}`, config)
        .then(response => {
          console.log(response.data);
        });
      this.read();
    },
    edit() {
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      };
      this.axios
        .put(`/note/${this.selectedNote._id}`, this.selectedNote, config)
        .then(response => {
          console.log(response.data);
        });
      this.read();
    }
  }
};
</script>
