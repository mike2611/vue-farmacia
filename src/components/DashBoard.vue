<template>
    <div id="page-top">
        <div id="wrapper">
            <SideBar @changeView="changeView"></SideBar>
            <div id="content-wrapper" class="d-flex flex-column">
                <div id="content">
                    <TopBar @changeView="changeView"></TopBar>
                    <!-- TEMPLATE DE DATOS DEL USUARIO LOGUEADO -->
                    <div class="container-fluid" v-if="mainView == null">
                        <div class="row justify-content-center">
                            <div class="col-md-12">
                                <div class="card h-100">
                                    <div class="row no-gutters">
                                        <div class="col-md-4">
                                            <img src="../assets/img/admin.png" class="card-img" alt="Imagen de usuario">
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body">
                                                <h5 class="card-title">Perfil</h5>
                                                <!-- <p class="card-text">Descripción del usuario Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> -->
                                                <ul class="list-group">
                                                    <li class="list-group-item">Nombre(s): {{datosUsuarioLogin.nombre}}</li>
                                                    <li class="list-group-item">Perfil: {{perfilDescripcion}}</li>
                                                    <li class="list-group-item">Ap. Paterno: {{datosUsuarioLogin.paterno}}</li>
                                                    <li class="list-group-item">Ap. Materno: {{datosUsuarioLogin.materno}}</li>
                                                    <li class="list-group-item">Edad: {{datosUsuarioLogin.edad}}  años</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- ADMIN DROPDOWN -->
                    <notFound           v-if="mainView == 0"></notFound>
                    <!-- MODULO DE USUARIOS -->
                    <UserModule         v-if="mainView == 1"></UserModule>
                    <PerfilModule       v-if="mainView == 2"></PerfilModule>
                    <ContModule         v-if="mainView == 3"></ContModule>
                    <ProvModule         v-if="mainView == 4"></ProvModule>
                    <ProductosModule    v-if="mainView == 6"></ProductosModule>
                    <RegistrosAdmin     v-if="mainView == 8"></RegistrosAdmin>
                    <!-- PUNTO DE VENTAS DROPDOWN -->
                    <puntoVenta         v-if="mainView == 5"></puntoVenta>
                    <historicoVenta     v-if="mainView == 7"></historicoVenta>
                </div>
                <CustomFooter></CustomFooter>
            </div>
        </div>
        <a class="scroll-to-top rounded" href="#page-top">
            <i class="fas fa-angle-up"></i>
        </a>
    </div>
</template>

<script>
// template logged // 
import SideBar from "./SideBar.vue";
import TopBar from "./TopBar.vue";
import CustomFooter from "./CustomFooter.vue";
// notFound
import notFound from "./notFound.vue";
// MENU DE OPCIONES ADMIN //
import UserModule from "./UsuariosModule.vue";
import PerfilModule from "./PerfilModule.vue";
import ContModule from "./ContratosModule.vue";
import ProvModule from "./ProvModule.vue";
import ProductosModule from "./ProductosModule.vue";
import RegistrosAdmin from "./RegistrosAdmin.vue";
// MANU DE PUNTO DE VENTA //
import puntoVenta from "./PuntoVenta.vue";
import historicoVenta from "./historicoVenta.vue";

import axios from 'axios';

export default {
    name: "DashBoard",
    data(){
        return {
            mainView            : null, // CAMBIO DE MODULOS
            datosUsuarioLogin   : [],
            perfilDescripcion   : "",
        }
    },
    created(){
        this.getUserDataLogin();
        this.getPerfilData();
    },
    components: {
    // TEMPLATE LOGGED
    SideBar,
    TopBar,
    CustomFooter,
    // ADMIN
    notFound,
    UserModule,
    PerfilModule,
    ContModule,
    ProvModule,
    ProductosModule,
    RegistrosAdmin,
    // PUNTO DE VENTA
    puntoVenta,
    historicoVenta,
},

    methods:{
        changeView(templateInt){ this.mainView = templateInt; },

        // obteniendo perfil y id del usuario del localStorage //
        getUserDataLogin(){
            let datosUsuario    = JSON.parse(localStorage.getItem('datosUsuario'));
            let idUsuario       = datosUsuario.idUsuario;
            let urlQuery        = `http://localhost:3000/empleados/${idUsuario}`;
            
            axios.get(urlQuery).then((response) => {
                let array       = [];

                for (const key in response.data) {
                    array        = response.data[key];                    
                }
                this.datosUsuarioLogin = array;
            });
        },

        // obteniendo el perfil con el localStorage
        getPerfilData(){
            let datosUsuario    = JSON.parse(localStorage.getItem('datosUsuario'));
            let idPerfil        = datosUsuario.idPerfil;
            let urlQuery        = `http://localhost:3000/perfiles/${idPerfil}`;

            axios.get(urlQuery).then((response) => {
                let arrayData   = response.data;
                let descripcion = [];
                for (const key in arrayData) { 
                    descripcion = arrayData[key].descripcion;
                }
                this.perfilDescripcion = descripcion;
            });
        }
    },
};
</script>
