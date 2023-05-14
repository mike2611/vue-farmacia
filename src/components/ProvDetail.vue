<template>
    <div class="container-fluid">
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Información de Contratos</h1>
            <a class="d-none d-sm-inline-block btn btn-danger btn-lg shadow-sm" @click="btnRegresar()">
                <i class="bi bi-backspace"></i>
                Regresar
            </a>
        </div>
        
        <div class="card shadow mb-4">
            <div class="card-header py-3">Datos del Contrato</div>
            <div class="card-body">
                <!-- FORM LLENADO DE DATOS -->
                <form>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="inputEmail4">Proveedor:</label>
                            <input type="text" class="form-control" />
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group col-md-12">
                            <label for="inputEmail4">RFC:</label>
                            <input type="text" class="form-control" />
                        </div>                        
                    </div>

                    <div class="form-row">
                        <div class="form-group col-md-12">
                            <label for="inputEmail4">Razón Social:</label>
                            <input type="text" class="form-control" />
                        </div>                        
                    </div>
                    <!-- DIRECCION -->
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="inputPassword4">Calle:</label>
                            <input type="text" class="form-control" />
                        </div>
                        <div class="form-group col-md-6">
                            <label for="inputPassword4">Número/Interior:</label>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <input type="text" class="form-control" />
                                </div>
                                <div class="form-group col-md-6">
                                    <input type="text" class="form-control" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="inputPassword4">Colonia:</label>
                            <input type="text" class="form-control" />
                        </div>
                        <div class="form-group col-md-3">
                            <label for="inputPassword4">Código Postal:</label>
                            <input type="text" class="form-control" />
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="inputPassword4">País:</label>
                            <input type="text" class="form-control" />
                        </div>
                        <div class="form-group col-md-3">
                            <label for="inputPassword4">Estado:</label>
                            <input type="text" class="form-control" />
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="inputPassword4">Ciudad:</label>
                            <input type="text" class="form-control" />
                        </div>
                        <div class="form-group col-md-3">
                            <label for="inputPassword4">Teléfono:</label>
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
    name: "UsuariosDetail",
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