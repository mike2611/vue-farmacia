<template>
    <div class="container-fluid">
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Información Perfiles</h1>
            <a class="d-none d-sm-inline-block btn btn-danger btn-lg shadow-sm" @click="btnRegresar()">
                <i class="bi bi-backspace"></i>
                Regresar
            </a>
        </div>
        
        <div class="card shadow mb-4">
            <div class="card-header py-3">Datos Perfiles</div>
            <div class="card-body">
                <!-- FORM LLENADO DE DATOS -->
                <form>
                    <div class="form-row">
                        <div class="form-group col-md-8">
                            <label for="inputEmail4">Descripción:</label>
                            <input type="text" class="form-control" id="txtDescripcion"/>
                        </div>                        
                    </div>
                    <button type="button" class="btn btn-success btn-lg" @click="fnGuardar();">
                        <i class="bi bi-upload"></i>
                        Guardar
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "PerfilDetail",
    props: ['Detailview'],
    data(){
        return{
            placeholders: [],
        }
    },

    methods:{
        btnRegresar(){
            this.$emit("templateDetail", null);
        },

        fnGuardar(){
            let descripcion  = document.getElementById("txtDescripcion").value;
            if( descripcion  == "" ) { alert("Favor de ingresar una descripción válido"); return; }

            let ObjectData = {
                descripcion  : descripcion,
            }

            console.log(ObjectData);

            axios.post('http://localhost:3000/perfiles', JSON.stringify(ObjectData)).then((response) => {
                this.placeholders = response.data;
                console.log("Envio correcto");
            });
        }
    },
};
</script>