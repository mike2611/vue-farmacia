<template>
    <div class="container-fluid" v-if="Detailview == null">
        <!-- TEMPLATE PRINCIPAL -->
        <div>
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 class="h3 mb-0 text-gray-800">Usuarios</h1>
                <!-- <a class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" @click="templateDetail(1)"> -->
                <a class="d-none d-sm-inline-block btn btn-primary btn-lg shadow-sm" @click="templateDetail(1)">
                    <i class="bi bi-plus-square"></i>
                    Nuevo
                </a>
            </div>
    
            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <!-- <h6 class="m-0 font-weight-bold text-primary">DataTables Example</h6> -->
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nombre</th>
                                    <th>Perfil</th>
                                    <th>Usuario</th>
                                </tr>
                            </thead>
                            <tfoot>
                                <tr>
                                    <th>Id</th>
                                    <th>Nombre</th>
                                    <th>Perfil</th>
                                    <th>Usuario</th>
                                </tr>
                            </tfoot>
                            <tbody>
                                <tr>
                                    <td>001</td>
                                    <td>Jose Manuel Rdz Perez</td>
                                    <td>Empleado</td>
                                    <td>usuario1</td>
                                </tr>
                                <tr>
                                    <td>002</td>
                                    <td>Administrador 1</td>
                                    <td>Administrador</td>
                                    <td>admin1</td>
                                </tr>
                                <tr>
                                    <td>003</td>
                                    <td>Proveedor 1</td>
                                    <td>Proveedor</td>
                                    <td>prov1</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- TEMPLATE DETAIL -->
    
    <detailComponent v-else
        :Detailview="Detailview"
        @templateDetail="templateDetail"></detailComponent>
    
</template>

<script>

import detailComponent from "./UsuariosDetail.vue";

export default {
    name: "UsuariosModule",
    data(){
        return{
            Detailview: null,
        }
    },
    components: {
        detailComponent,
    },
    methods:{
        templateDetail(value){

            this.Detailview = value;
        },
    },
};
</script>