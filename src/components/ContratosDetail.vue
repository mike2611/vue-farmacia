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
                            <label for="inputEmail4">Proveedor Asociado:</label>
                            <select id="inputState" class="form-control">
                                <option selected>Choose...</option>
                                <option>Proveedor 1</option>
                                <option>Proveedor 2</option>
                                <option>Proveedor 3</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group col-md-12">
                            <label for="inputEmail4">Clave del Contrato:</label>
                            <input type="text" class="form-control" />
                        </div>                        
                    </div>

                    <div class="form-row">
                        <div class="form-group col-md-12">
                            <label for="inputPassword4">Descripción:</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="inputEmail4">Monto del Contrato:</label>
                            <input type="text" placeholder="0.00" class="form-control" id="inputEmail4">
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group col-md-3">
                            <label for="inputPassword4">Fecha de Inicio:</label>
                            <input type="date" class="form-control" />
                        </div>
                        <div class="form-group col-md-3">
                            <label for="inputPassword4">Fecha de Termino:</label>
                            <input type="date" class="form-control" />
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