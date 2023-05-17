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
                            <tbody v-if="perfiles != null">
                                <tr v-for="(item, index) of perfiles" :key="index">
                                    <td>{{item.id}}</td>
                                    <td>{{item.descripcion}}</td>
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
import axios from 'axios';

export default {
    name: "UsuariosModule",
    data(){
        return{
            Detailview: null,
            perfiles: []
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
            axios.get('http://localhost:3000/perfiles').then((response) => {
                this.perfiles   = [];
                let arrayData   = response.data;
                let perfiles    = this.perfiles;
                for (const key in arrayData) {
                    perfiles.push(arrayData[key]);
                }
            });
        }
    },
};
</script>