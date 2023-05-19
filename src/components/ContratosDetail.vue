<template>
    <div class="container-fluid">
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Información de Contratos</h1>
            <a class="d-none d-sm-inline-block btn btn-danger btn-lg shadow-sm" @click="btnRegresar()">
                <i class="bi bi-backspace"></i>
                Regresar
            </a>
        </div>
        
        <div class="card shadow mb-4">
            <div class="card-header py-3">Datos del Contrato</div>
            <div class="card-body">
                <!-- FORM LLENADO DE DATOS -->
                <form>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label>Proveedor Asociado:</label>
                            <select id="cboProveedor" class="form-control">
                                <option value="0" selected>SELECCIONAR</option>
                                <option v-for="(item, index) of proveedores" :key="index" :value="item.id">{{item.nombre}}</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group col-md-12">
                            <label for="inputEmail4">Clave del Contrato:</label>
                            <input type="text" class="form-control" id="txtContrato" />
                        </div>                        
                    </div>

                    <div class="form-row">
                        <div class="form-group col-md-12">
                            <label for="inputPassword4">Descripción:</label>
                            <textarea class="form-control" id="txtDescripcion" rows="3"></textarea>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="inputEmail4">Monto del Contrato:</label>
                            <input  type="text"
                                    placeholder="0.00"
                                    class="form-control"
                                    id="txtMonto" 
                                    v-model="montoInput" @input="filterNonNumeric" />
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group col-md-3">
                            <label for="inputPassword4">Fecha de Inicio:</label>
                            <input type="date" class="form-control" id="txtInicio"/>
                        </div>
                        <div class="form-group col-md-3">
                            <label for="inputPassword4">Fecha de Termino:</label>
                            <input type="date" class="form-control" id="txtTermino"/>
                        </div>
                    </div>

                    <button v-if="contrato == null" type="button" class="btn btn-success btn-lg" @click="fnGuardar();">
                        <i class="bi bi-upload"></i>
                        Guardar
                    </button>

                    <button v-else type="button" class="btn btn-success btn-lg" @click="fnModificar();">
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
    name: "UsuariosDetail",
    props: ['Detailview', 'contrato'],
    data(){
        return{
            montoInput: "",
            placeholders: [],
            proveedores:  [],
        }
    },

    created(){
        this.getProveedores();
        this.getContratoIdData();
    },

    methods:{
        filterNonNumeric() {
            this.montoInput = this.montoInput.replace(/[^0-9]/g, "");
        },
        getProveedores(){
            axios.get('http://localhost:3000/proveedores').then((response) => {
                this.proveedores= [];
                let arrayData   = response.data;
                let proveedores = this.proveedores;
                for (const key in arrayData) {
                    proveedores.push(arrayData[key]);
                }
            });
        },
        btnRegresar(){
            this.$emit("templateDetail", null);
        },
        async fnGuardar(){
            let id_proveedor    = Number(document.getElementById("cboProveedor").value);
            let descripcion     = document.getElementById("txtDescripcion").value;
            let monto           = Number(document.getElementById("txtMonto").value);
            let inicio          = document.getElementById("txtInicio").value;
            let vigencia        = document.getElementById("txtTermino").value;
            let clave_contrato  = document.getElementById("txtContrato").value;

            if( id_proveedor    == 0 ) { alert("Favor de seleccionar un proveedor válido");         return; }
            if( descripcion     == "") { alert("Favor de ingresar una descripción válido");         return; }
            if( monto           == "") { alert("Favor de ingresar un monto válido");                return; }
            if( inicio          == "") { alert("Favor de ingresar una fecha de inicio válida");     return; }
            if( vigencia        == "") { alert("Favor de ingresar una fecha de termino válida");    return; }
            if( clave_contrato  == "") { alert("Favor de ingresar una clave de contrato válida");   return; }


            let ObjectData = {
                descripcion     : descripcion,
                inicio          : inicio,
                id_proveedor    : id_proveedor,
                estatus         : 1,
                monto           : monto,
                vigencia        : vigencia,
                clave_contrato  : clave_contrato

            }

            try {
                const response  = await axios.post('http://localhost:3000/contratos', ObjectData);
                this.placeholders = response.data;
                alert("Registro guardado con éxito");

                document.getElementById("cboProveedor").value       = "0";
                document.getElementById("txtContrato").value        = "";
                document.getElementById("txtDescripcion").value     = "";
                document.getElementById("txtMonto").value           = "";
                document.getElementById("txtInicio").value          = "";
                document.getElementById("txtTermino").value         = "";

                this.btnRegresar();


            } catch (error) {
                alert("Hubo un error al enviar los datos: ", error);
            }
        },
        // PARA MODIFICAR //
        getContratoIdData(){
            if (this.contrato != null) {
                let urlQuery    = `http://localhost:3000/contratos/${this.contrato}`;
                axios.get(urlQuery).then((response) => {

                    let arrayData   = response.data;

                    for (const key in arrayData) { 
                        
                        document.getElementById("cboProveedor").value       = arrayData[key].id_proveedor;
                        document.getElementById("txtContrato").value        = arrayData[key].clave_contrato;
                        document.getElementById("txtDescripcion").value     = arrayData[key].descripcion;
                        document.getElementById("txtMonto").value           = arrayData[key].monto;
                        document.getElementById("txtInicio").value          = arrayData[key].inicio.split("T").reverse()[1];
                        document.getElementById("txtTermino").value         = arrayData[key].vigencia.split("T").reverse()[1];

                    }
                });
            }
        },

        async fnModificar() {
            let id_proveedor    = Number(document.getElementById("cboProveedor").value);
            let descripcion     = document.getElementById("txtDescripcion").value;
            let monto           = Number(document.getElementById("txtMonto").value);
            let inicio          = document.getElementById("txtInicio").value;
            let vigencia        = document.getElementById("txtTermino").value;
            let clave_contrato  = document.getElementById("txtContrato").value;

            if( id_proveedor    == 0 ) { alert("Favor de seleccionar un proveedor válido");         return; }
            if( descripcion     == "") { alert("Favor de ingresar una descripción válido");         return; }
            if( monto           == "") { alert("Favor de ingresar un monto válido");                return; }
            if( inicio          == "") { alert("Favor de ingresar una fecha de inicio válida");     return; }
            if( vigencia        == "") { alert("Favor de ingresar una fecha de termino válida");    return; }
            if( clave_contrato  == "") { alert("Favor de ingresar una clave de contrato válida");   return; }


            let ObjectData = {
                descripcion     : descripcion,
                inicio          : inicio,
                id_proveedor    : id_proveedor,
                estatus         : 1,
                monto           : monto,
                vigencia        : vigencia,
                clave_contrato  : clave_contrato

            }

            try {
                const response  = await axios.put('http://localhost:3000/contratos/' + this.contrato, ObjectData);
                this.placeholders = response.data;
                alert("Registro actualizado con éxito");

                document.getElementById("cboProveedor").value       = "0";
                document.getElementById("txtContrato").value        = "";
                document.getElementById("txtDescripcion").value     = "";
                document.getElementById("txtMonto").value           = "";
                document.getElementById("txtInicio").value          = "";
                document.getElementById("txtTermino").value         = "";

                this.btnRegresar();


            } catch (error) {
                alert("Hubo un error al enviar los datos: ", error);
            }
        },
    },
};
</script>