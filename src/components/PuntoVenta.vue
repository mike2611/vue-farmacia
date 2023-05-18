<template>
    <div>
    <!-- Content Wrapper -->
        <div id="content-wrapper" class="d-flex flex-column">
            <!-- Main Content -->
            <div id="content">
                <!-- Begin Page Content -->
                <div class="d-flex justify-content-center">
                    <div class="mt-5" style="width: 80vw">
                        <div class="d-flex flex-row align-items-center justify-content-around">
                            <div>
                                <h6 class="blue-color font-weight-bold">Seleccionar Producto: </h6>
                                <div class="input-group rounded">
                                    <input type="search" class="form-control rounded" placeholder="Buscar producto ..." aria-label="Search" aria-describedby="search-addon" />
                                    <span class="input-group-text border-0" id="search-addon">
                                        <i class="fas fa-search"></i>
                                    </span>
                                </div>

                                <ul class="list-group m-3">
                                    <li v-for="(producto, index) in productos" 
                                        :key="producto.nombre" 
                                        class="list-group-item"
                                        role="button"
                                        :class="{ active: selectedProductIndex === index}" 
                                        @click="selectProduct(producto, index)"
                                        >
                                        {{producto.nombre}} 
                                        <small>{{producto.descripcion}}</small>
                                    </li>
                                </ul>
                            </div>

                            <div class="d-flex flex-column" style="width: 15%;">
                                <h6 class="blue-color font-weight-bold">Cantidad de {{selectedProductName ? selectedProductName : "este producto"}}: </h6>
                                <input  v-model.number="selectedProductQuantity"  class="m-3" type="number" placeholder="0">
                                <h6 class="blue-color font-weight-bold">Precio Unitario: </h6>
                                <input class="m-3" type="text" :value="selectedProductPrice | formatoMoneda " readonly>
                                <button type="button" class="btn btn-primary btn-sm" @click="añadirProducto()">Añadir producto</button>
                            </div>

                            <div>
                                <div class="ml-4">
                                    <span class="blue-color font-weight-bold">{{cuenta.length > 0 ? "Cuenta Actual:" : "Aún no agrega ningún producto a su cuenta" }}</span>
                                    <div class="d-flex">
                                        <ul class="list-group m-3">
                                            <li v-for="producto in cuenta" :key="producto.nombre" class="list-group-item">
                                                {{producto.nombre}} 
                                                <small> {{producto.descripcion}}</small>
                                            </li>                                            
                                        </ul>
                                        <ul class="list-group m-3">
                                            <li  v-for="producto in cuenta" :key="producto.nombre" class="list-group-item">
                                                {{producto.cantidad}} unidade(s) X {{producto.precio_venta | formatoMoneda }}
                                            </li>                                
                                        </ul>
                                        <ul class="list-group m-3">
                                            <li  v-for="producto in cuenta" :key="producto.nombre" class="list-group-item">
                                                {{producto.cantidad * producto.precio_venta | formatoMoneda }}
                                            </li>                                
                                        </ul>
                                    </div>
                                    <div v-if="cuenta.length > 0">
                                        <div class="d-flex flex-row justify-content-end m-3">
                                            <div class="d-flex flex-column align-items-end">
                                                <div class="d-flex justify-content-between w-100">
                                                    <b class="mt-2">SubTotal:</b>
                                                    <b class="mt-2 black-color">{{subtotal | formatoMoneda }}</b>
                                                </div>
                                                <div class="d-flex justify-content-between w-100">
                                                    <b class="mt-2">Descuento(s):</b>
                                                    <b class="mt-2 black-color">{{descuentos | formatoMoneda }}</b>
                                                </div>
                                                <div class="d-flex justify-content-between w-100">
                                                    <b class="mt-2">IVA:</b>
                                                    <b class="mt-2 black-color">{{iva | formatoMoneda }}</b>
                                                </div>
                                                <div class="d-flex justify-content-between w-100">
                                                    <b class="mt-2 blue-color">Total:</b>
                                                    <b class="mt-2 black-color">{{total | formatoMoneda }}</b>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div class="d-flex flex-row-reverse mb-5 mr-3">
                                            <button type="button" class="ml-2 btn btn-primary btn-sm" @click="generaTicketPDF">Pagar</button>
                                            <button type="button" class="ml-2 btn btn-danger btn-sm" @click="vaciarCuenta">Limpiar Todo</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Abandonar sesion</h5>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>

                    <div class="modal-body">Si tiene una venta en proceso se perdera si sale</div>

                    <div class="modal-footer">
                        <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancelar</button>
                        <a class="btn btn-primary" href="login.html">Salir</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>

  import pdfMake from 'pdfmake/build/pdfmake';
  import pdfFonts from 'pdfmake/build/vfs_fonts';

  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  export default {
    name: 'PuntoVenta',
    data() {
        return{
            productos: [
                {nombre: 'Paracetamol', descripcion: '500mgs', precio_venta: 100},
                {nombre: 'Aspirina', descripcion: '500mgs', precio_venta: 100},
                {nombre: 'Complejo B', descripcion: '500mgs', precio_venta: 100},
            ],
            selectedProductIndex: null,
            selectedProductPrice: null,
            selectedProductName: null,
            selectedProductQuantity: 0,
            cuenta: [],
            subtotal: 0,
            descuentos: 0,
            iva: 0,
            total: 0,
        }
    },
    filters: {
    formatoMoneda(valor) {
      if(!valor) return '';
      const formatter = new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
        minimumFractionDigits: 2,
      });
      return formatter.format(valor);
    },
    },
    methods: {
        selectProduct(producto, index) {
            this.selectedProductIndex = index;
            this.selectedProductPrice = producto.precio_venta;
            this.selectedProductName = producto.nombre;
        },
        añadirProducto() {
            if(this.selectedProductIndex !== null && this.selectedProductQuantity > 0) {
                const producto = this.productos[this.selectedProductIndex];
                this.cuenta.push({
                    nombre: producto.nombre,
                    descripcion: producto.descripcion,
                    precio_venta: producto.precio_venta,
                    cantidad: this.selectedProductQuantity
                });
                this.subtotal += this.selectedProductQuantity * producto.precio_venta;
                this.descuentos = 10;
                this.iva = (this.subtotal - this.descuentos) * 0.16;
                this.total += this.subtotal - this.descuentos + this.iva;

                this.selectedProductQuantity = 0;

            }
        },
        generaTicketPDF() {
        
            const formatoMoneda = this.$options.filters.formatoMoneda;

            const docDefinition = {
            content: [
                // Encabezado del ticket
                { text: 'FarmaFacil', style: 'header' },
                { text: 'Direccion : Ahuejote 493 No. S/N, Pedregal De Santo Domingo, 04369', style: 'subheader' },
                { text: 'Fecha: ' + new Date().toLocaleDateString(), style: 'subheader' },
                { text: ' ', style: 'subheader' },
                
                // Contenido de los productos en la cuenta
                { text: 'Cuenta Actual:', style: 'subheader' },
                { ul: this.cuenta.map(producto => `${producto.nombre} - ${producto.cantidad} unidades x ${producto.precio_venta | formatoMoneda}`) },
                { text: ' ', style: 'subheader' },
                
                // Totales
                { text: 'Totales:', style: 'subheader' },
                { text: `SubTotal: ${this.subtotal | formatoMoneda}`, style: 'total' },
                { text: `Descuento(s): ${this.descuentos | formatoMoneda}`, style: 'total' },
                { text: `IVA: ${this.iva | formatoMoneda}`, style: 'total' },
                { text: `Total: ${this.total | formatoMoneda}`, style: 'total' }
            ],
            styles: {
                header: { fontSize: 18, bold: true, alignment: 'center' },
                subheader: { fontSize: 14, bold: true, margin: [0, 0, 0, 10] },
                total: { fontSize: 12, bold: true, margin: [0, 0, 0, 5] }
            }
            };

            pdfMake.createPdf(docDefinition).open();
            this.cuenta = [];
        },
        vaciarCuenta() {
            window.Swal.fire({
                title: "¿Estás seguro?",
                text: "¿Deseas vaciar la cuenta?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Aceptar",
                cancelButtonText: "Cancelar",
            }).then((result) => {
                if (result.isConfirmed) {
                this.cuenta = [];
                window.Swal.fire(
                    "Cuenta vaciada",
                    "La cuenta ha sido vaciada exitosamente.",
                    "success"
                );
                } else {
                    window.Swal.fire(
                    "Operación cancelada"
                );
                }
            });
      },
    }
  };
</script>
  
<style scoped>
    .blue-color {
        color: #3eb9c0;
    }
    .black-color {
        color: black;
    }/*
    .center-top {
        position: absolute;
        top: 8%;
        left: 49%;
        transform: translateX(-50%);
    } */
</style>
  