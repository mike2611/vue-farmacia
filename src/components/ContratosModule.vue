<template>
    <div class="container-fluid" v-if="Detailview == null">
        <!-- Page Heading -->
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Contratos</h1>
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
                                <th>Clave del Contrato</th>
                                <th>Monto</th>
                                <th>Inicio</th>
                                <th>Termino</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) of contratos" :key="index">
                                <td>{{item.id}}</td>
                                <td>{{item.claveContrato}}</td>
                                <td>{{item.monto}}</td>
                                <td>{{item.inicio}}</td>
                                <td>{{item.vigencia}}</td>
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

    <!-- TEMPLATE DETAIL -->
    <detailComponent v-else
        :Detailview="Detailview"
        :contrato="contrato"
        @templateDetail="templateDetail"></detailComponent>
</template>

<script>

import detailComponent from "./ContratosDetail.vue";
import axios from 'axios';

export default {
    name: "UsuariosModule",
    data(){
        return{
            Detailview  : null,
            contratos   : [],
            contrato    : null
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
            this.contrato   = null;
            this.getData();
        },

        getData(){
            axios.get('http://localhost:3000/contratos').then((response) => {
                this.contratos  = [];
                let arrayData   = response.data;
                let araryContr  = [];
                // let contratos   = this.contratos;
                
                for (const key in arrayData) {
                    let id              = arrayData[key].id;
                    let claveContrato   = arrayData[key].clave_contrato;
                    let monto           = Number(parseFloat(arrayData[key].monto)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                    let inicio          = arrayData[key].inicio.split("T").reverse()[1];
                    let vigencia        = arrayData[key].vigencia.split("T").reverse()[1];

                    let objectData = {
                        "id": id,
                        "claveContrato": claveContrato,
                        "monto": monto,
                        "inicio": inicio,
                        "vigencia": vigencia
                    };
                    araryContr[key] = objectData;
                }

                this.contratos = araryContr;                
            });
        },

        btnEliminar(idProveedor){
            var opcion = confirm("¿Dese eliminar este contrato?");
            if (opcion == true) {
                axios.delete(`http://localhost:3000/contratos/${idProveedor}`).then((response) => {
                    console.log(response.data);
                    this.getData();
                });
            }
        },

        btnEditar(value, id){
            this.contrato   = id;
            this.Detailview = value;
        },
    },
};
</script>