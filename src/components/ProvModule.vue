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
                                <th class="col-1    text-center">Id</th>
                                <th class="col-3    text-center">Raz&oacute;n Social</th>
                                <th class="col-2    text-center">RFC</th>
                                <th class="col-1    text-center">Tel&eacute;fono</th>
                                <th class="col-3    text-center">Correo</th>
                                <th class="col-2    text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) of proveedores" :key="index">
                                <td class="col-1    text-center">{{item.id}}</td>
                                <td class="col-3    text-center">{{item.razon_social}}</td>
                                <td class="col-2    text-center">{{item.rfc}}</td>
                                <td class="col-1    text-center">{{item.telefono}}</td>
                                <td class="col-3    text-center">{{item.correo}}</td>
                                <td class="col-2    text-center">
                                    <button type="button" class="btn btn-success btn-block" @click="btnEditar(1, item.id)">
                                        <i class="bi bi-pencil-fill"></i> Editar
                                    </button>
                                    <button type="button" class="btn btn-danger btn-block" @click="btnEliminar(item.id)">
                                        <i class="bi bi-trash-fill"></i> Eliminar
                                    </button>
                                </td>
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
        :proveedor="proveedor"
        @templateDetail="templateDetail"></detailComponent>
</template>

<script>

import detailComponent from "./ProvDetail.vue";
import axios from 'axios';

export default {
    name: "UsuariosModule",
    data(){
        return{
            Detailview: null,
            proveedores: [],
            proveedor: null,
        }
    },
    created(){
        this.getData();
    },
    components: {
        detailComponent,
    },
    methods:{
        templateDetail(value){
            this.Detailview = value;
            this.proveedor  = null;
            this.getData();
        },

        getData(){
            axios.get('http://localhost:3000/proveedores').then((response) => {
                this.proveedores    = [];
                let arrayData       = response.data;
                let proveedores     = this.proveedores;
                for (const key in arrayData) {
                    proveedores.push(arrayData[key]);
                }
            });
        },
        btnEliminar(idProveedor){
            window.Swal.fire({
                title: "¿Estás seguro?",
                text: "¿Deseas eliminar este proveedor?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Aceptar",
                cancelButtonText: "Cancelar",
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`http://localhost:3000/proveedores/${idProveedor}`).then((response) => {
                        console.log(response.data);
                        this.getData();
                    });

                    window.Swal.fire(
                        "Proveedor Eliminado",
                        "El proveedor ha sido eliminado correctamente.",
                        "success"
                    );
                }
            });
        },
        btnEditar(value, id){
            this.proveedor  = id;
            this.Detailview = value;
        },
    },
};
</script>