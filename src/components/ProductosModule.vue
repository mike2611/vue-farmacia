<template>
    <div class="container-fluid" v-if="Detailview === null">
      <!-- Page Heading -->
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Productos</h1>
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
                  <th>Descripción</th>
                  <th>Stock</th>
                  <th>Precio de Venta</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in productos" :key="index">
                  <td>{{ item.id }}</td>
                  <td>{{ item.nombre }}</td>
                  <td>{{ item.descripcion }}</td>
                  <td>{{ item.stock }}</td>
                  <td>{{ item.precio_venta }}</td>
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
    <detailComponent v-else :Detailview="Detailview" :contrato="contrato" @templateDetail="templateDetail"></detailComponent>
  </template>
  
  <script>
  import detailComponent from "./ContratosDetail.vue";
  import axios from "axios";
  
  export default {
    name: "ProductosModule",
    data() {
      return {
        Detailview: null,
        productos: [],
        contrato: null,
      };
    },
    created() {
      this.getData();
    },
    components: {
      detailComponent,
    },
    methods: {
      templateDetail(value) {
        this.Detailview = value;
        this.contrato = null;
        this.getData();
      },
  
      getData() {
        axios
          .get("http://localhost:3000/productos")
          .then((response) => {
            this.productos = response.data;
          })
          .catch((error) => {
            console.error(error);
          });
      },
  
      btnEliminar(idProducto) {
        var opcion = confirm("¿Desea eliminar este producto?");
        if (opcion) {
          axios
            .delete(`http://localhost:3000/productos/${idProducto}`)
            .then((response) => {
              console.log(response.data);
              this.getData();
            })
            .catch((error) => {
              console.error(error);
            });
        }
      },
  
      btnEditar(value, id) {
        this.contrato = id;
        this.Detailview = value;
      },
    },
  };
  </script>
  