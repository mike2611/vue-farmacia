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
                            <input type="text" class="form-control" />
                        </div>                        
                    </div>
                    <button type="button" class="btn btn-success btn-lg">
                        <i class="bi bi-upload"></i>
                        Guardar
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "PerfilDetail",
    props: ['Detailview'],
    data(){
        return{
            
        }
    },

    methods:{
        btnRegresar(){
            this.$emit("templateDetail", null);
        }
    },
};
</script>