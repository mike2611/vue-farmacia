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
                                <th class="col-1    text-center">Id</th>
                                <th class="col-3    text-center">Clave del Contrato</th>
                                <th class="col-2    text-center">Monto</th>
                                <th class="col-2    text-center">Inicio</th>
                                <th class="col-2    text-center">Termino</th>
                                <th class="col-3    text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) of contratos" :key="index">
                                <td class="col-1    text-center">{{item.id}}</td>
                                <td class="col-3    text-center">{{item.claveContrato}}</td>
                                <td class="col-2    text-center">$ {{item.monto}}</td>
                                <td class="col-2    text-center">{{item.inicio}}</td>
                                <td class="col-2    text-center">{{item.vigencia}}</td>
                                <td class="col-3    text-center">
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
            window.Swal.fire({
                title: "¿Estás seguro?",
                text: "¿Deseas eliminar este contrato?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Aceptar",
                cancelButtonText: "Cancelar",
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`http://localhost:3000/contratos/${idProveedor}`).then((response) => {
                        console.log(response.data);
                        this.getData();
                    });

                    window.Swal.fire(
                        "Perfil Eliminado",
                        "El perfil ha sido eliminado correctamente.",
                        "success"
                    );
                }
            });
        },

        btnEditar(value, id){
            this.contrato   = id;
            this.Detailview = value;
        },
    },
};
</script>