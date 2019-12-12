<template>
    <b-container style="margin-top:5%;">
    <b-row>
        <b-col >
            <b-card id="shadow" title="Perfil" style="border-color: #1a9cd7">
                 
                <label style="font-weight: bold; color: #1a9cd7">Información general</label>
                <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                    
                    <b-form-group id="input-group-2" label="Nombre:" label-for="input-2">
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
                </b-form>  

                <label style="font-weight: bold; color: #1a9cd7" >Cambiar contraseña</label>
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
                    id="input-3"
                    v-model="form.password"
                    type="password"
                    required
                    placeholder="***"
                        
                  ></b-form-input>
                </b-form-group>

                <b-button type="submit" variant="primary" style="color: #ffffff; background-color:#1a9cd7;">Guardar cambios</b-button>
            </b-card>
        </b-col>
    </b-row>
</b-container>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          email: '',
          name: '',
          
        },
        
        show: true
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
 
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>