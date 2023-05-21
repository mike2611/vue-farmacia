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
                  <th class="col-1    text-center">Id</th>
                  <th class="col-3    text-center">Nombre</th>
                  <th class="col-2    text-center">Presentación del Producto</th>
                  <th class="col-1    text-center">Stock</th>
                  <th class="col-3    text-center">Precio de Venta</th>
                  <th class="col-3    text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in productos" :key="index">
                  <td class="col-1    text-center">{{ item.id }}</td>
                  <td class="col-3    text-center">{{ item.nombre }}</td>
                  <td class="col-2    text-center">{{ item.descripcion }}</td>
                  <td class="col-1    text-center">{{ item.stock }}</td>
                  <td class="col-3    text-center">{{ item.precio_venta }}</td>
                  <td class="col-3    text-center">
                    <button type="button" class="btn btn-success btn-block" @click="btnEditar(1, item.id)">
                      <i class="bi bi-pencil-fill"></i> Editar
                    </button>
                    <button v-if="item.stock > 0" type="button" class="btn btn-danger btn-block" @click="btnEliminar(item)">
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
    <detailComponent v-else :Detailview="Detailview" :producto="producto" @templateDetail="templateDetail"></detailComponent>
  </template>
  
  <script>
  import detailComponent from './ProductosDetail.vue';
  import axios from "axios";
  
  export default {
    name: "ProductosModule",
    data() {
      return {
        Detailview: null,
        productos: [],
        producto: null,
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
        this.producto = null;
        this.getData();
      },
  
      getData() {
        axios
          .get("http://localhost:3000/productos?stock_gte=1")
          .then((response) => {
            let filtroProductos = response.data;
            this.productos = filtroProductos.filter((producto) => producto.stock > 0);
          })
          .catch((error) => {
            console.error(error);
          });
      },
  
      btnEliminar(producto) {
        window.Swal.fire({
          title: "¿Estás seguro?",
          text: "¿Desea eliminar este producto?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Aceptar",
          cancelButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            const ObjectData = {
              stock: 0,
            };

            axios.put(`http://localhost:3000/productos/${producto.id}`, ObjectData)
              .then((response) => {
                console.log(response.data);
                this.productos = this.productos.filter((item) => item.id !== producto.id);
              })
              .catch((error) => {
                console.error(error);
              });
          } else {
            window.Swal.fire("Operación cancelada");
          }
        });
      },
  
      btnEditar(value, id) {
        this.producto = id;
        this.Detailview = value;
      },
    },
  };
  </script>
  