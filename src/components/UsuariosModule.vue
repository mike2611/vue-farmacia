<template>
    <div class="container-fluid" v-if="Detailview == null">
        <!-- TEMPLATE PRINCIPAL -->
        <div>
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 class="h3 mb-0 text-gray-800">Empleados</h1>
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
                                    <th class="col-1 text-center">Id</th>
                                    <th class="col-4 text-center">Nombre</th>
                                    <th class="col-2 text-center">Perfil</th>
                                    <th class="col-2 text-center">Usuario</th>
                                    <th class="col-3 text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody v-if="empleados != null">
                                <tr v-for="(item, index) of empleados" :key="index">
                                    <td class="col-1 text-center">{{item.id}}</td>
                                    <td class="col-4 text-center">{{item.nombre}} {{item.paterno }} {{item.materno}}</td>
                                    <td class="col-2 text-center">{{item.perfil}}</td>
                                    <td class="col-2 text-center">{{item.usuario}}</td>
                                    <td class="col-3 text-center">
                                        <button type="button" class="btn btn-success" style="margin-right: 15px; margin-bottom: 0;" @click="btnEditar(1, item.id) ">
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
        :empleado="empleado"
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
            empleado    : 0,
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
            this.empleado   = null;
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
            
            window.Swal.fire({
                title: "¿Estás seguro?",
                text: "¿Deseas eliminar este empleado?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Aceptar",
                cancelButtonText: "Cancelar",
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`http://localhost:3000/empleados/${idEmpleado}`).then((response) => {
                        let confirm = response.data;
                        console.log(confirm);
                        this.getData();
                    });
                    window.Swal.fire(
                        "Empleado Eliminado",
                        "El empleado ha sido eliminado correctamente.",
                        "success"
                    );
                }
            });
        },
        btnEditar(value, id){
            console.log(id);
            this.empleado   = id;
            this.Detailview = value;
        },
    },
};
</script>