<template>
    <div class="container-fluid">
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Información de Venta</h1>
            <a class="d-none d-sm-inline-block btn btn-danger btn-lg shadow-sm" @click="btnRegresar()">
                <i class="bi bi-backspace"></i>
                Regresar
            </a>
        </div>
        
        <div class="card shadow mb-4">
            <div class="card-header py-3">Datos del Contrato</div>
            <div class="card-body">
                <!-- FORM LLENADO DE DATOS -->
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                </tr>
                            </thead>
                            <tbody v-if="ventasDetail != null">
                                <tr v-for="(item, index) of ventasDetail" :key="index">
                                    <td>{{item.id}}</td>
                                    <td>{{item.producto}}</td>
                                    <td>{{item.cantidad}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios';

export default {
    name: "UsuariosDetail",
    props: ['Detailview', 'venta'],
    data(){
        return{
            montoInput: "",
            ventasDetail: [],
            proveedores:  [],
        }
    },

    created(){
        this.getDetailVenta();
    },

    methods:{
        btnRegresar(){
            this.$emit("templateDetail", null);
        },
        // PARA MODIFICAR //
        getDetailVenta(){
            if (this.venta != null) {
                let urlQuery    = `http://localhost:3000/ventas/${this.venta}`;
                axios.get(urlQuery).then((response) => {
                    let arrayData   = response.data.venta;
                    let ventas      = [];
                    for (const key in arrayData) {
                        let id          = arrayData[key].id;
                        let producto    = arrayData[key].producto;
                        let cantidad    = arrayData[key].cantidad;

                        let objectData = {
                            "id": id,
                            "producto": producto,
                            "cantidad": cantidad,
                        };

                        ventas[key] = objectData;
                    }
                    this.ventasDetail = ventas;
                });
            }
        },
    },
};
</script>