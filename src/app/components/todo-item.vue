<template>

<b-container class="bv-example-row ">
  <b-row>
    <b-col>
        <b-list-group class="list-wrapper">
        <b-list-group-item button class="d-flex justify-content-between align-items-center">   
            <b-input-group class="mt-3 form-check" >
                <b-input-group-prepend is-text>
                    <input type="checkbox" aria-label="Checkbox for following text input">
                </b-input-group-prepend>
                <template v-slot:append class="form-check-label">
                    <b-input-group-text><i><font-awesome-icon icon="times-circle"/></i></b-input-group-text>
                </template>
                <b-form-input ></b-form-input>
            </b-input-group>
            
        </b-list-group-item>

        <b-list-group-item button class="d-flex justify-content-between align-items-center">   
            <b-input-group class="mt-3 form-check" >
                <b-input-group-prepend is-text>
                    <input type="checkbox" aria-label="Checkbox for following text input">
                </b-input-group-prepend>
                <template v-slot:append class="form-check-label">
                    <b-input-group-text><i><font-awesome-icon icon="times-circle"/></i></b-input-group-text>
                </template>
                <b-form-input ></b-form-input>
            </b-input-group>
            
        </b-list-group-item>

        
    </b-list-group>
    </b-col>
   
  </b-row>
  
</b-container>

    
</template>