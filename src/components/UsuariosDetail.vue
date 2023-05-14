<template>
    <div class="container-fluid">
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Información del Usuario</h1>
            <a class="d-none d-sm-inline-block btn btn-danger btn-lg shadow-sm" @click="btnRegresar()">
                <i class="bi bi-backspace"></i>
                Regresar
            </a>
        </div>
        
        <div class="card shadow mb-4">
            <div class="card-header py-3">Datos de Usuario</div>
            <div class="card-body">
                <!-- FORM LLENADO DE DATOS -->
                <form>
                    <div class="form-row">
                        <div class="form-group col-md-4">
                            <label for="inputEmail4">Perfil:</label>
                            <select id="inputState" class="form-control">
                                <option selected>Choose...</option>
                                <option>...</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-row">

                        <div class="form-group col-md-6">
                            <label for="inputEmail4">Nombre(s):</label>
                            <input type="text" class="form-control" />
                        </div>

                        <div class="form-group col-md-6">
                            <label for="inputEmail4">Ap. Paterno:</label>
                            <input type="text" class="form-control" />
                        </div>
                        
                    </div>

                    <div class="form-row">

                        <div class="form-group col-md-6">
                            <label for="inputPassword4">Ap. Materno:</label>
                            <input type="text" class="form-control" />
                        </div>

                        <div class="form-group col-md-6">
                            <label for="inputEmail4">Edad:</label>
                            <input type="text" class="form-control" />
                        </div>

                    </div>

                    <div class="form-row">
                        <div class="form-group col-md-4">
                            <label for="inputEmail4">Usuario</label>
                            <input type="email" class="form-control" id="inputEmail4">
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group col-md-4">
                            <label for="inputPassword4">Password</label>
                            <input type="password" class="form-control" id="inputPassword4">
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