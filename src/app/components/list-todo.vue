<template>
    <b-container class="bv-example-row">
  <b-row>
    <b-col>
        <div>
        <b-card
            title="Mis tareas"
            class="mb-2 "
            >
            <b-card-text>
                <b-input-group  class="mt-3">
                    <b-form-input placeholder="¿Qué necesito hacer hoy?"></b-form-input>
                    <b-input-group-append>
                    <b-button  type="submit" variant="primary" style="color: #ffffff; background-color:#1a9cd7;">Agregar tarea</b-button>
                    </b-input-group-append>
                </b-input-group>
                <br/>
                <!-- Aquí deben ir los item de los todo -->
                <todo-item></todo-item>
            </b-card-text>
        </b-card>
    </div>

    </b-col>
    
  </b-row>
</b-container>
    
</template>