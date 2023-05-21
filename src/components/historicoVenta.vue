<template>
    <div class="container-fluid" v-if="Detailview == null">
        <!-- TEMPLATE PRINCIPAL -->
        <div>
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 class="h3 mb-0 text-gray-800">Ventas</h1>
                <!-- <a class="d-none d-sm-inline-block btn btn-primary btn-lg shadow-sm" @click="templateDetail(1)">
                    <i class="bi bi-plus-square"></i>
                    Nuevo
                </a> -->
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
                                    <th class="col-4 text-center">Empleado</th>
                                    <th class="col-3 text-center">Fecha de Venta</th>
                                    <th class="col-2 text-center">Total de Venta</th>
                                    <th class="col-2 text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody v-if="ventas != null">
                                <tr v-for="(item, index) of ventas" :key="index">
                                    <td class="col-1 text-center">{{item.id}}</td>
                                    <td class="col-4 text-center">{{item.empleado}}</td>
                                    <td class="col-3 text-center">{{item.venta}}</td>
                                    <td class="col-2 text-center">$ {{returnMoney(item.total)}}</td>
                                    <td class="col-2 text-center">
                                        <button type="button" class="btn btn-success" @click="btnEditar(1, item.id)">
                                            <i class="bi bi-view-list"></i> Ver
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
        :venta="venta"
        @templateDetail="templateDetail"></detailComponent>
    
</template>

<script>

import detailComponent from "./historicoDetalle.vue";
import axios from 'axios';

export default {
    name: "UsuariosModule",
    data(){
        return{
            Detailview  : null,
            venta      : null,
            ventas      : [],

        }
    },
    components: {
        detailComponent,
    },
    created(){
        this.getData();
    },
    methods:{

        returnMoney(total){
            return Number(parseFloat(total)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        },
        templateDetail(value){
            this.Detailview = value;
            this.perfil     = null;
            this.getData();
        },

        getData(){
            axios.get('http://localhost:3000/ventas').then((response) => {
                this.ventas     = [];
                let arrayData   = response.data;
                let ventas      = [];
                for (const key in arrayData) {
                    let id          = arrayData[key].id;
                    let empleado    = arrayData[key].empleado;
                    let venta       = arrayData[key].venta.split("T").reverse()[1];
                    let total       = arrayData[key].total;

                    let objectData = {
                        "id": id,
                        "empleado": empleado,
                        "venta": venta,
                        "total": total,
                    };

                    ventas[key] = objectData;

                }
                this.ventas = ventas;
            });
        },
        btnEliminar(idPerfil){
            var opcion = confirm("¿Dese eliminar este usuario?");
            if (opcion == true) {
                axios.delete(`http://localhost:3000/perfiles/${idPerfil}`).then((response) => {
                    let confirm = response.data;
                    console.log(confirm);
                    this.getData();
                });
            }
        },
        btnEditar(value, id){
            this.venta      = id;
            this.Detailview = value;
        },
    },
};
</script>