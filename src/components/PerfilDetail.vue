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
                    <button v-if="perfil == null" type="button" class="btn btn-success btn-lg" @click="fnGuardar();">
                        <i class="bi bi-upload"></i>
                        Guardar
                    </button>

                    <button v-else type="button" class="btn btn-success btn-lg" @click="fnModificar();">
                        <i class="bi bi-pencil-square"></i>
                        Modificar
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
    props: ['Detailview', 'perfil'],
    data(){
        return{
            placeholders: [],
        }
    },

    created(){
        this.getPerfilIdData();
    },

    methods:{
        btnRegresar(){
            this.$emit("templateDetail", null);
        },

        async fnGuardar(){
            let descripcion  = document.getElementById("txtDescripcion").value;
            if( descripcion  == "" ) { window.Swal.fire("Favor de ingresar una descripción válida", "", "warning"); return; }

            const ObjectData = {
                descripcion: descripcion,
            };

            try {
                const response = await axios.post('http://localhost:3000/perfiles', ObjectData);
                this.placeholders = response.data;
                
                window.Swal.fire({
                    title: "Registro Agregado Correctamente",
                    text: "",
                    icon: "success"
                }).then(() => {
                    document.getElementById("txtDescripcion").value  = "";
                    this.btnRegresar();
                });
                
            } catch (error) {
                window.Swal.fire("Hubo un error al enviar los datos: ", `${error}`, "error");
            }
        },

        // PARA MODIFICAR //
        getPerfilIdData(){
            if (this.perfil != null) {
                let urlQuery    = `http://localhost:3000/perfiles/${this.perfil}`;
                axios.get(urlQuery).then((response) => {
                    console.log(response.data);
                    let arrayData   = response.data;
                    console.log(arrayData);
                    for (const key in arrayData) { 
                       document.getElementById("txtDescripcion").value = arrayData[key].descripcion;
                    }
                });
            }
        },
        async fnModificar() {
            let descripcion  = document.getElementById("txtDescripcion").value;
            if( descripcion  == "" ) { window.Swal.fire("Favor de ingresar una descripción válida", "", "warning"); return; }

            const ObjectData = {
                descripcion   : descripcion,
            }

            try {
                const response  = await axios.put('http://localhost:3000/perfiles/' + this.perfil, ObjectData);
                let result = response.data;
                console.log(result);

                window.Swal.fire({
                    title: "Registro Actualizado Correctamente",
                    text: "",
                    icon: "success"
                }).then(() => {
                    document.getElementById("txtDescripcion").value  = "0";
                    this.btnRegresar();
                });

            } catch (error) {
                window.Swal.fire("Hubo un error al enviar los datos: ", `${error}`, "error");
            }
        },
    },
};
</script>