<template>
    <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
        <!-- Sidebar - Brand -->
        <a class="sidebar-brand d-flex align-items-center justify-content-center" href="#">
            <div class="sidebar-brand-icon rotate-n-15">
                <i class="fas fa-laugh-wink"></i>
            </div>
            <div class="sidebar-brand-text mx-3 big-font">FarmaFácil</div>
        </a>
        <!-- Divider -->
        <hr class="sidebar-divider my-0">
        <!-- Nav Item - Dashboard -->
        <li class="nav-item active">
            <a class="nav-link" href="index.html">
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <!-- <p class="medium-font">Dashboard</p> -->
                <span>Dashboard</span>
            </a>
        </li>
        <!-- Divider -->
        <hr class="sidebar-divider">
        <!-- Nav Item - Pages Collapse Menu -->
        <li class="nav-item" v-if="datosUsuarioLogin.id_perfil == 1">
            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
                aria-expanded="true" aria-controls="collapseTwo">
                <!-- <i class="fas fa-fw fa-cog"></i> -->
                <i class="bi bi-gear"></i>
                <!-- <p class="medium-font">Opciones</p> -->
                <span>Opciones</span>
            </a>
            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                <div class="bg-white py-2 collapse-inner rounded">
                    <!-- <h6 class="collapse-header">Custom Components:</h6> -->
                    <a class="collapse-item small-font" href="#" @click="pruebaTemplate(1)">Empleados</a>
                    <a class="collapse-item small-font" href="#" @click="pruebaTemplate(2)">Perfiles</a>
                    <a class="collapse-item small-font" href="#" @click="pruebaTemplate(3)">Contratos</a>
                    <a class="collapse-item small-font" href="#" @click="pruebaTemplate(4)">Proveedores</a>
                    <a class="collapse-item small-font" href="#" @click="pruebaTemplate(6)">Productos</a>
                    <a class="collapse-item small-font" href="#" @click="pruebaTemplate(8)">Registros</a>
                </div>
            </div>
        </li>

        <!-- Nav Item - Utilities Collapse Menu -->
        <li class="nav-item">
            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
                aria-expanded="true" aria-controls="collapseUtilities">
                <i class="bi bi-key"></i>
                <!-- <p class="medium-font">Punto de Venta</p> -->
                <span>Punto de Venta</span>
            </a>
            <div id="collapseUtilities" class="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
                <div class="bg-white py-2 collapse-inner rounded">
                    <a class="collapse-item small-font" href="#" @click="pruebaTemplate(5)">Punto de Venta</a>
                    <a class="collapse-item small-font" href="#" @click="pruebaTemplate(7)">Historial de Ventas</a>
                </div>
            </div>
        </li>
        <!-- Divider -->
        <hr class="sidebar-divider">
        <!-- Sidebar Toggler (Sidebar) -->
        <div class="text-center d-none d-md-inline">
            <p> FarmaFacíl&copy; 2023</p>
        </div>
    </ul>
</template>



<script>
import axios from 'axios';
export default {
    name: "SideBar",
    data(){
        return {
            mainView            : null, // CAMBIO DE MODULOS
            datosUsuarioLogin   : []
        }
    },
    created(){
        this.getUserDataLogin();
    },
    methods:{
        pruebaTemplate(optionView){ this.$emit("changeView", optionView); },

        getUserDataLogin(){
            let datosUsuario    = JSON.parse(localStorage.getItem('datosUsuario'));
            let idUsuario       = datosUsuario.idUsuario;
            let urlQuery        = `http://localhost:3000/empleados/${idUsuario}`;

            axios.get(urlQuery).then((response) => {
                let object      = response.data;
                let arrayData   = [];
                for (const key in object) {
                    arrayData   = response.data[key];
                }

                this.datosUsuarioLogin = arrayData;
            });
        }
    }
};
</script>

<style>
    /* .big-font {
        font-size: 1.7rem;
        font-weight: bolder;
    }

    .medium-font {
        font-size: 1.2rem;
        font-weight: bolder;
    }

    .small-font {
        font-size: 1rem;
        font-weight: 900;
    } */
</style>

<!-- <style scoped>
</style> -->
