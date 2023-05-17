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
                                    <th>-</th>
                                </tr>
                            </thead>
                            <tbody v-if="empleados != null">
                                <tr v-for="(item, index) of empleados" :key="index">
                                    <td>{{item.id}}</td>
                                    <td>{{item.nombre}} {{item.paterno }} {{item.materno}}</td>
                                    <td>{{item.perfil}}</td>
                                    <td>{{item.usuario}}</td>
                                    <td>
                                        <button type="button" class="btn btn-success" @click="btnEditar(1, item.id)">
                                            <i class="bi bi-pencil-fill"></i> Editar
                                        </button>
                                        <button type="button" class="btn btn-danger" @click="btnEliminar(item.id)">
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
    </div>
    <!-- TEMPLATE DETAIL -->
    
    <detailComponent v-else
        :Detailview="Detailview"
        @templateDetail="templateDetail"></detailComponent>
    
</template>

<script>

import detailComponent from "./UsuariosDetail.vue";
import axios from 'axios';

export default {
    name: "UsuariosModule",
    data(){
        return{
            Detailview  : null,
            idEmp       : null,
            empleados   : [],
        }
    },
    components: {
        detailComponent,
    },
    created(){
        this.getData();
    },
    methods:{
        templateDetail(value){
            this.Detailview = value;
            this.getData();
        },
        getData(){
            axios.get('http://localhost:3000/empleados').then((response) => {
                this.empleados  = [];
                let arrayData   = response.data;
                let empleados   = this.empleados;
                for (const key in arrayData) {
                    empleados.push(arrayData[key]);
                }
                console.log(empleados);
            });
        },
        btnEliminar(idEmpleado){
            var opcion = confirm("¿Dese eliminar este usuario?");
            if (opcion == true) {
                axios.delete(`http://localhost:3000/empleados/${idEmpleado}`).then((response) => {
                    let confirm = response.data;
                    console.log(confirm);
                    this.getData();
                });
            }
        },
        btnEditar(value, id){
            this.idEmp      = id;
            this.Detailview = value;
            this.getData();
        },
    },
};
</script>