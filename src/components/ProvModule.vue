<template>
    <div class="container-fluid" v-if="Detailview == null">
        <!-- Page Heading -->
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Proveedores</h1>
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
                                <th>Raz&oacute;n Social</th>
                                <th>RFC</th>
                                <th>Tel&eacute;fono</th>
                                <th>Correo</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>Id</th>
                                <th>Raz&oacute;n Social</th>
                                <th>RFC</th>
                                <th>Tel&eacute;fono</th>
                                <th>Correo</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            <tr>
                                <td>001</td>
                                <td>Tiger Nixon</td>
                                <td>QWER879810ASA</td>
                                <td>8113848573</td>
                                <td>tigerNixon@hotmail.com</td>
                            </tr>
                            <tr>
                                <td>002</td>
                                <td>Tiger Nixon</td>
                                <td>QWER879810ASA</td>
                                <td>8113848573</td>
                                <td>tigerNixon@hotmail.com</td>
                            </tr>
                            <tr>
                                <td>003</td>
                                <td>Tiger Nixon</td>
                                <td>QWER879810ASA</td>
                                <td>8113848573</td>
                                <td>tigerNixon@hotmail.com</td>
                            </tr>
                            <tr>
                                <td>004</td>
                                <td>Tiger Nixon</td>
                                <td>QWER879810ASA</td>
                                <td>8113848573</td>
                                <td>tigerNixon@hotmail.com</td>
                            </tr>
                            <tr>
                                <td>005</td>
                                <td>Tiger Nixon</td>
                                <td>QWER879810ASA</td>
                                <td>8113848573</td>
                                <td>tigerNixon@hotmail.com</td>
                            </tr>
                            <tr>
                                <td>006</td>
                                <td>Tiger Nixon</td>
                                <td>QWER879810ASA</td>
                                <td>8113848573</td>
                                <td>tigerNixon@hotmail.com</td>
                            </tr>
                            <tr>
                                <td>007</td>
                                <td>Tiger Nixon</td>
                                <td>QWER879810ASA</td>
                                <td>8113848573</td>
                                <td>tigerNixon@hotmail.com</td>
                            </tr>
                            <tr>
                                <td>008</td>
                                <td>Tiger Nixon</td>
                                <td>QWER879810ASA</td>
                                <td>8113848573</td>
                                <td>tigerNixon@hotmail.com</td>
                            </tr>
                            <tr>
                                <td>009</td>
                                <td>Tiger Nixon</td>
                                <td>QWER879810ASA</td>
                                <td>8113848573</td>
                                <td>tigerNixon@hotmail.com</td>
                            </tr>
                            <tr>
                                <td>010</td>
                                <td>Tiger Nixon</td>
                                <td>QWER879810ASA</td>
                                <td>8113848573</td>
                                <td>tigerNixon@hotmail.com</td>
                            </tr>
                        </tbody>
                    </table>
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

import detailComponent from "./ProvDetail.vue";

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