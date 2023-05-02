<template>
    <div id="page-top">
        <div id="wrapper">
            <SideBar @changeView="changeView"></SideBar>
            <div id="content-wrapper" class="d-flex flex-column">
                <div id="content">
                    <TopBar></TopBar>
                    <notFound    v-if="mainView == 0"></notFound>
                    <ContModule  v-if="mainView == 3"></ContModule>
                    <ProvModule  v-if="mainView == 4"></ProvModule>
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
import SideBar from "./SideBar.vue";
import TopBar from "./TopBar.vue";
import CustomFooter from "./CustomFooter.vue";
// notFound
import notFound from "./notFound.vue";
// MENU DE OPCIONES ADMIN //
import ContModule from "./ContratosModule.vue";
import ProvModule from "./ProvModule.vue";

export default {
    data(){
        return {
            mainView: null, // CAMBIO DE MODULOS
        }
    },
    components: {
        SideBar,
        TopBar,
        CustomFooter,
        notFound,
        ContModule,
        ProvModule,
    },

    methods:{
        changeView(templateInt){ this.mainView = templateInt; }
    },
};
</script>
