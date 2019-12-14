<template>
  <!-- Form-->
  <b-container style=" max-width: 100%; max-height:100%; background: rgb(151,80,201); background: linear-gradient(0deg, rgba(151,80,201,1) 0%, rgba(124,180,206,1) 100%);">
    <b-col style="display: flex; justify-content: center; align-items: center;">
      <b-row no-gutters>
        <b-card class="overflow-hidden" style="margin:1rem; border-radius: 1rem; horizontal-aligment:center">
          <b-card-body title="Reestablecer contraseña">
            <b-card-text>
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

                <b-button type="submit" variant="primary" style="color: #ffffff; background-color:#1a9cd7;">Recuperar contraseña</b-button>
              </b-form>
            </b-card-text>
            
            <b-link href="#" style=" position: absolute; color: #1a9cd7;">Volver al inicio</b-link>
          </b-card-body>
             
        </b-card> 
      </b-row> 
    </b-col>
  </b-container>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          email: '',
          name: '',
          password: ''
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
        this.form.password = ''
        
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>