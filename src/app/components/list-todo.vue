<template>
  <div>
    <notedo-nv></notedo-nv>
    <b-container class="bv-example-row">
      <b-row style="padding: 10px;">
        <b-col>
          <div>
            <b-card title="Mis tareas" class="mb-2 ">
              <b-card-text>
                <b-input-group class="mt-3">
                  <b-form-input
                    v-model="todo.body"
                    placeholder="¿Qué necesito hacer hoy?"
                  ></b-form-input>
                  <b-input-group-append>
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
                  </b-input-group-append>
                  <b-input-group-append>
                    <b-button @click="save" variant="success"
                      >Agregar tarea</b-button
                    >
                  </b-input-group-append>
                </b-input-group>
                <br />
                <!-- Aquí deben ir los item de los todo -->

                <b-row>
                  <b-col>
                    <b-list-group class="list-wrapper">
                      <b-list-group-item
                        v-for="(todoo, index) in todos"
                        :key="index"
                        button
                        class="d-flex justify-content-between align-items-center"
                        :variant="todoo.color"
                      >
                        <b-input-group class="mt-3 form-check">
                          <b-input-group-prepend is-text>
                            <input
                              type="checkbox"
                              v-on:click="
                                setSCard(todoo);
                                statusChanger(todoo);
                                edit();
                              "
                              :checked="todoo.status"
                              aria-label="Checkbox for following text input"
                            />
                          </b-input-group-prepend>
                          <template v-slot:append class="form-check-label">
                            <b-input-group-text
                              v-on:click="
                                setSCard(todoo);
                                del();
                              "
                              ><i><font-awesome-icon icon="times-circle"/></i
                            ></b-input-group-text>
                          </template>
                          <b-form-input
                            @click="setSCard(todoo)"
                            v-on:keyup.enter="edit"
                            :value="todoo.body"
                            @input="onInputBody"
                          ></b-form-input>
                        </b-input-group>
                      </b-list-group-item>
                    </b-list-group>
                  </b-col>
                </b-row>
              </b-card-text>
            </b-card>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import router from "../router";
export default {
  data() {
    return {
      todo: {
        _id: "",
        body: "",
        status: "0",
        color: "",
        textColor: ""
      },
      todos: [],
      selectedTodo: {
        _id: "",
        body: "",
        status: "",
        color: "",
        textColor: ""
      },
      bodyColor: "light",
      varTextColor: ""
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
          router.push("/login");
        }
      }
    );
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

      this.axios.post("/todo", this.todo, config).then(
        response => {
          if (response.status == 201) {
            this.$bvToast.toast(response.data.message, {
              title: "Exito!",
              toaster: "b-toaster-top-right",
              variant: "success",
              solid: true,
              appendToast: false
            });
          }
          this.read();
        },
        error => {
          if (error.response.status == 422) {
            this.$bvToast.toast(error.response.data.error, {
              title: "Error",
              toaster: "b-toaster-top-right",
              variant: "danger",
              solid: true,
              appendToast: false
            });
          }
        }
        
      );
      this.read();
    },
    read() {
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      };
      this.axios.get("/todo", config).then(response => {
        this.todos = response.data;
        
      });
    },
    setSCard(todo) {
      this.selectedTodo = todo;
    },
    setEditColors(bColor, tColor) {
      this.todo.color = bColor;
      this.todo.textColor = tColor;
    },
    onInputBody(e) {
      this.selectedTodo.body = e;
    },
    del() {
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      };
      this.axios.delete(`/todo/${this.selectedTodo._id}`, config).then(
        response => {
          if (response.status == 200) {
            this.$bvToast.toast(response.data.mensaje, {
              title: "Exito!",
              toaster: "b-toaster-top-right",
              variant: "success",
              solid: true,
              appendToast: false
            });
          }
        },
        error => {
          if (error.response.status == 422) {
            this.$bvToast.toast(error.response.data.error, {
              title: "Error",
              toaster: "b-toaster-top-right",
              variant: "danger",
              solid: true,
              appendToast: false
            });
          }
        }
      );
      this.read();
    },
    statusChanger(tod) {
      if (tod.status) {
        this.selectedTodo.status = false;
      } else {
        this.selectedTodo.status = true;
      }
    },
    edit() {
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      };
      this.axios
        .put(`/todo/${this.selectedTodo._id}`, this.selectedTodo, config)
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
            if (error.response.status == 422) {
              this.$bvToast.toast(error.response.data.error, {
                title: "Error",
                toaster: "b-toaster-top-right",
                variant: "danger",
                solid: true,
                appendToast: false
              });
            }
          }
        );
      this.read();
      this.read();
      this.read();
    }
  }
};
</script>
