<template>
  <!-- Form-->
  <b-container>
    <b-col style="display: flex; justify-content: center; align-items: center;">
      <b-row >
        <b-card id="shadow" style="margin-top:20%; border-radius: 1rem; horizontal-aligment:center">
          <b-card-body title="¿Olvidaste tu contraseña?">
            <b-card-text>
              <!-- Email -->
              <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                <b-form-group
                  id="input-group-1"
                  label="Ingresa tu correo electrónico para poder reestablecerla:"
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

                <b-button type="submit" variant="primary" style="color: #ffffff; background-color:#1a9cd7;">Reestablecer contraseña</b-button>
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