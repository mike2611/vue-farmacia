<template>
    <div class="container-fluid">
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Información de Productos</h1>
        <a class="d-none d-sm-inline-block btn btn-danger btn-lg shadow-sm" @click="btnRegresar()">
          <i class="bi bi-backspace"></i>
          Regresar
        </a>
      </div>
  
      <div class="card shadow mb-4">
        <div class="card-header py-3">Datos del Producto</div>
        <div class="card-body">
          <!-- FORM LLENADO DE DATOS -->
          <form>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label>Contrato Asociado:</label>
                <select id="cboContrato" class="form-control" v-model="selectedContrato">
                  <option value="0">SELECCIONAR</option>
                  <option v-for="(item, index) of contratos" :key="index" :value="item.id">{{ item.id }}</option>
                </select>
              </div>
            </div>
  
            <div class="form-row">
              <div class="form-group col-md-12">
                <label for="txtNombre">Nombre:</label>
                <input type="text" class="form-control" id="txtNombre" v-model="nombre" />
              </div>
            </div>
  
            <div class="form-row">
              <div class="form-group col-md-12">
                <label for="txtDescripcion">Presentación del producto:</label>
                <textarea class="form-control" id="txtDescripcion" rows="2" v-model="descripcion"></textarea>
              </div>
            </div>
  
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="txtStock">Stock:</label>
                <input type="text" placeholder="0" class="form-control" id="txtStock" v-model="stockInput" @input="filterNonNumeric" />
              </div>
            </div>
  
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="txtPrecioVenta">Precio de Venta:</label>
                <input type="text" placeholder="0.00" class="form-control" id="txtPrecioVenta" v-model="precioVentaInput" @input="filterNonNumeric" />
              </div>
            </div>
  
            <button v-if="producto === null" type="button" class="btn btn-success btn-lg" @click="fnGuardar()">
              <i class="bi bi-upload"></i>
              Guardar
            </button>
  
            <button v-else type="button" class="btn btn-success btn-lg" @click="fnModificar()">
              <i class="bi bi-pencil-square"></i>
              Modificar
            </button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'ProductosDetail',
    props: ['Detailview', 'producto'],
    data() {
      return {
        selectedContrato: '0',
        contratos: [],
        stockInput: '',
        precioVentaInput: '',
        nombre: '',
        descripcion: '',
      };
    },
    created() {
      this.getContratos();
      this.getProductoIdData();
    },
    methods: {
      filterNonNumeric() {
        this.stockInput = this.stockInput.replace(/[^0-9]/g, '');
        this.precioVentaInput = this.precioVentaInput.replace(/[^0-9.]/g, '');
      },
      getContratos() {
        axios.get('http://localhost:3000/contratos')
          .then((response) => {
            this.contratos = response.data;
          })
          .catch((error) => {
            console.log('Error:', error);
          });
      },
      btnRegresar() {
        this.$emit('templateDetail', null);
      },
      fnGuardar() {
        const idContrato = Number(document.getElementById('cboContrato').value);
        const nombre = this.nombre;
        const descripcion = this.descripcion;
        const stock = Number(document.getElementById('txtStock').value);
        const precioVenta = Number(document.getElementById('txtPrecioVenta').value);
  
        if (idContrato === 0) {
            window.Swal.fire(
                "Favor de seleccionar un contrato válido",
            )
          return;
        }
        if (nombre === '') {
            window.Swal.fire(
                "Favor de ingresar un nombre válido",
            )
          return;
        }
        if (descripcion === '') {
            window.Swal.fire(
                "Favor de ingresar una descripción válida",
            )
          return;
        }
        if (stock === '') {
            window.Swal.fire(
                "Favor de ingresar un stock válido",
            )
          return;
        }
        if (precioVenta === '') {
            window.Swal.fire(
                "Favor de ingresar un precio de venta válido",
            )
          return;
        }
  
        const ObjectData = {
          nombre,
          id_contrato: idContrato,
          descripcion,
          stock,
          precio_venta: precioVenta,
        };
  
        axios.post('http://localhost:3000/productos', ObjectData)
          .then((response) => {
            console.log('Response:', response.data);
            window.Swal.fire(
                "Registro guardado con éxito",
                "Se guardó con éxito",
                "success"
            )  
            this.resetForm();
            this.btnRegresar();
          })
          .catch((error) => {
            console.log('Error:', error);
            window.Swal.fire(
                "Hubo un error al enviar los datos",
            )  
          });
      },
      getProductoIdData() {
        if (this.producto != null) {
          const urlQuery = `http://localhost:3000/productos/${this.producto}`;
          axios.get(urlQuery)
            .then((response) => {
              const arrayData = response.data;
              for (const key in arrayData) {
                this.selectedContrato = arrayData[key].id_contrato;
                this.nombre = arrayData[key].nombre;
                this.descripcion = arrayData[key].descripcion;
                this.stockInput = arrayData[key].stock;
                this.precioVentaInput = arrayData[key].precio_venta;
              }
            })
            .catch((error) => {
              console.log('Error:', error);
            });
        }
      },
      fnModificar() {
        const idContrato = Number(document.getElementById('cboContrato').value);
        const nombre = this.nombre;
        const descripcion = this.descripcion;
        const stock = Number(document.getElementById('txtStock').value);
        const precioVenta = Number(document.getElementById('txtPrecioVenta').value);
  
        if (idContrato === 0) {
            window.Swal.fire(
                "Favor de seleccionar un contrato válido",
            )
          return;
        }
        if (nombre === '') {
            window.Swal.fire(
                "Favor de ingresar un nombre válido",
            )
          return;
        }
        if (descripcion === '') {
            window.Swal.fire(
                "Favor de ingresar una descripción válida",
            )
          return;
        }
        if (stock === '') {
            window.Swal.fire(
                "Favor de ingresar un stock válido",
            )
          return;
        }
        if (precioVenta === '') {
            window.Swal.fire(
                "Favor de ingresar un precio de venta válido",
            )
          return;
        }
  
  
        const ObjectData = {
          nombre,
          id_contrato: idContrato,
          descripcion,
          stock,
          precio_venta: precioVenta,
        };
  
        axios.put(`http://localhost:3000/productos/${this.producto}`, ObjectData)
          .then((response) => {
            console.log('Response:', response.data);
            window.Swal.fire(
                "Registro actualizado con éxito",
                "Se guardó con éxito",
                "success"
            );
            this.resetForm();
            this.btnRegresar();
          })
          .catch((error) => {
            console.log('Error:', error);
            window.Swal.fire(
                "Hubo un error al enviar los datos",
            );
          });
      },
      resetForm() {
        this.selectedContrato = '0';
        this.nombre = '';
        this.descripcion = '';
        this.stockInput = '';
        this.precioVentaInput = '';
      },
    },
  };
  </script>
  