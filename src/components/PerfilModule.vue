<template>
    <div class="container-fluid" v-if="Detailview == null">
        <!-- TEMPLATE PRINCIPAL -->
        <div>
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 class="h3 mb-0 text-gray-800">Perfiles</h1>
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
                                    <th>Descripcion</th>
                                </tr>
                            </thead>
                            <tfoot>
                                <tr>
                                    <th>Id</th>
                                    <th>Descripcion</th>
                                </tr>
                            </tfoot>
                            <tbody>
                                <tr>
                                    <td>001</td>
                                    <td>Administrador</td>
                                </tr>
                                <tr>
                                    <td>002</td>
                                    <td>Empleado</td>
                                </tr>
                                <tr>
                                    <td>003</td>
                                    <td>Proveedor</td>
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

import detailComponent from "./PerfilDetail.vue";

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