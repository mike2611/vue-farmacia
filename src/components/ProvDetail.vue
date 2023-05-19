<template>
    <div class="container-fluid">
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Información de Proveedores</h1>
            <a class="d-none d-sm-inline-block btn btn-danger btn-lg shadow-sm" @click="btnRegresar()">
                <i class="bi bi-backspace"></i>
                Regresar
            </a>
        </div>
        
        <div class="card shadow mb-4">
            <div class="card-header py-3">Datos del Proveedor</div>
            <div class="card-body">
                <!-- FORM LLENADO DE DATOS -->
                <form>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="inputEmail4">Proveedor:</label>
                            <input type="text" class="form-control" id="txtProveedor"/>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group col-md-12">
                            <label for="inputEmail4">RFC:</label>
                            <input type="text" class="form-control" id="txtRFC" maxlength="13"/>
                        </div>                        
                    </div>

                    <div class="form-row">
                        <div class="form-group col-md-12">
                            <label for="inputEmail4">Razón Social:</label>
                            <input type="text" class="form-control" id="txtRazonSocial"/>
                        </div>                        
                    </div>
                    <!-- DIRECCION -->
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="inputPassword4">Calle:</label>
                            <input type="text" class="form-control" id="txtCalle"/>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="inputPassword4">Número/Exterior:</label>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <input  type="text"
                                            class="form-control"
                                            id="txtNumero"
                                            v-model="txtNumero" @input="noNumericExt" />
                                </div>
                                <div class="form-group col-md-6">
                                    <input  type="text"
                                            class="form-control"
                                            id="txtExterior"
                                            maxlength="1"/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="inputPassword4">Colonia:</label>
                            <input type="text" class="form-control" id="txtColonia"/>
                        </div>
                        <div class="form-group col-md-3">
                            <label for="inputPassword4">Código Postal:</label>
                            <input  type="text"
                                    class="form-control"
                                    id="txtCP"
                                    v-model="numericInput" @input="filterNonNumeric"
                                    maxlength="5"/>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="inputPassword4">País:</label>
                            <select id="cboPais" class="form-control">
                                <option value="0" selected>SELECCIONAR</option>
                                <option v-for="(item, index) of paises" :key="index" :value="item.id" @click="getEstados(item.id)">{{item.nombre}}</option>
                            </select>
                        </div>
                        <div class="form-group col-md-3">
                            <label for="inputPassword4">Estado:</label>
                            <select id="cboEstado" class="form-control">
                                <option value="0" selected>SELECCIONAR</option>
                                <option v-for="(item, index) of estados" :key="index" :value="item.id" @click="getMunicipios(item.id)">{{item.nombre}}</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="inputPassword4">Ciudad:</label>
                            <select id="cboCiudad" class="form-control">
                                <option value="0" selected>SELECCIONAR</option>
                                <option v-for="(item, index) of municipios" :key="index" :value="item.id">{{item.nombre}}</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group col-md-3">
                            <label for="inputPassword4">Teléfono:</label>
                            <input  type="text"
                                    class="form-control"
                                    id="txtTelefono"
                                    v-model="txtTelefono" @input="noNumericTel"
                                    maxlength="10"/>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-3">
                            <label for="inputPassword4">Correo:</label>
                            <input  type="text"
                                    class="form-control"
                                    id="txtCorreo"/>
                        </div>
                    </div>

                    <button v-if="proveedor == null" type="button" class="btn btn-success btn-lg" @click="fnGuardar();">
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
    props: ['Detailview', 'proveedor'],
    data(){
        return{
            numericInput: "",
            txtNumero   : "",
            txtTelefono : "",
            placeholders: [],
            paises      : [],
            pais        : null,
            estados     : [],
            estado      : null,
            municipios  : [],
            municipio   : null
        }
    },

    created(){
        this.getPaises();
    },

    methods:{
        // VALIDACIONES EN INPUTS NUM //
        filterNonNumeric() {
            this.numericInput   = this.numericInput.replace(/[^0-9]/g, "");
        },
        noNumericExt() {
            this.txtNumero      = this.txtNumero.replace(/[^0-9]/g, "");
        },
        noNumericTel(){
            this.txtTelefono    = this.txtTelefono.replace(/[^0-9]/g, "");
        },
        btnRegresar(){
            this.$emit("templateDetail", null);
        },
        // DROPDOWN'S PAIS, ESTADO, CIUDAD //
        getPaises(){
            axios.get('http://localhost:3000/paises').then((response) => {
                console.log(response.data);
                this.paises   = [];
                let arrayData   = response.data;
                let paises    = this.paises;
                for (const key in arrayData) {
                    paises.push(arrayData[key]);
                }

                if (this.proveedor != null) {
                    this.getUserIdData();
                }
            });
        },
        getEstados(idPais){
            axios.get('http://localhost:3000/estados/' + idPais).then((response) => {
                this.estados    = [];
                let arrayData   = response.data;
                let estados     = this.estados;
                for (const key in arrayData) {
                    estados.push(arrayData[key]);
                }
            });
        },
        getMunicipios(idEstado){
            axios.get('http://localhost:3000/municipios/' + idEstado).then((response) => {
                this.municipios = [];
                let arrayData   = response.data;
                let municipios  = this.municipios;
                for (const key in arrayData) {
                    municipios.push(arrayData[key]);

                    if (Number(key) == (Number(arrayData.length) - 1)) {
                        if (this.proveedor != null) {
                            document.getElementById('cboEstado').value = this.estado;

                            setTimeout(() => {
                                document.getElementById('cboCiudad').value = this.municipio;
                            }, 200);
                        }
                    }
                }
            });
        },
        // FUNCIONES CRUD //
        async fnGuardar(){
            let nombre      = document.getElementById("txtProveedor").value;
            let razon_social= document.getElementById("txtRazonSocial").value;
            let rfc         = document.getElementById("txtRFC").value;
            let colonia     = document.getElementById("txtColonia").value;
            let calle       = document.getElementById("txtCalle").value;
            let num_int     = Number(document.getElementById("txtNumero").value);
            let num_ext     = document.getElementById("txtExterior").value;
            let cod_p       = Number(document.getElementById("txtCP").value);
            let telefono    = document.getElementById("txtTelefono").value;
            let correo      = document.getElementById("txtCorreo").value;
            let usuario     = "";
            let clave       = "";
            let estatus     = 1;
            let id_perfil   = 0;
            let id_pais     = Number(document.getElementById("cboPais").value);
            let id_estado   = Number(document.getElementById("cboEstado").value);
            let id_municipio= Number(document.getElementById("cboCiudad").value);
            
            if (nombre      == "" ) { window.Swal.fire("Favor de ingresar un proveedor válido", "", "warning");       return; }
            if (razon_social== "" ) { window.Swal.fire("Favor de ingresar una razón social válida", "", "warning");   return; }
            if (rfc         == "" ) { window.Swal.fire("Favor de ingresar una clave RFC válida", "", "warning");      return; }
            if (colonia     == "" ) { window.Swal.fire("Favor de ingresar una colonia", "", "warning");               return; }
            if (calle       == "" ) { window.Swal.fire("Favor de ingresar una calle valida", "", "warning");          return; }
            if (num_int     == "" ) { window.Swal.fire("Favor de ingresar un número válido", "", "warning");          return; }
            if (num_ext     == "" ) { num_ext = "";                                                 }
            if (cod_p       == "" ) { window.Swal.fire("Favor de ingresar un código postal válido", "", "warning");   return; }
            if (telefono    == "" ) { window.Swal.fire("Favor de ingresar un teléfono válido", "", "warning");        return; }
            if (id_pais     == "0" ) { window.Swal.fire("Favor de ingresar un país válido", "", "warning");           return; }
            if (id_estado   == "0" ) { window.Swal.fire("Favor de ingresar un estado válido", "", "warning");         return; }
            if (id_municipio== "0" ) { window.Swal.fire("Favor de ingresar una ciudad válida", "", "warning");        return; }

            const ObjectData = {
                nombre      : nombre,
                razon_social: razon_social,
                rfc         : rfc,
                colonia     : colonia,
                calle       : calle,
                num_int     : num_int,
                num_ext     : num_ext,
                cod_p       : cod_p,
                telefono    : telefono,
                correo      : correo,
                usuario     : usuario,
                clave       : clave,
                estatus     : estatus,
                id_perfil   : id_perfil,
                id_pais     : id_pais,
                id_estado   : id_estado,
                id_municipio: id_municipio
            }

            try {
                const response  = await axios.post('http://localhost:3000/proveedores', ObjectData);
                this.placeholders = response.data;

                window.Swal.fire({
                    title: "Registro Agregado Correctamente",
                    text: "",
                    icon: "success"
                }).then(() => {
                    document.getElementById("txtProveedor").value       = "";
                    document.getElementById("txtRazonSocial").value     = "";
                    document.getElementById("txtRFC").value             = "";
                    document.getElementById("txtColonia").value         = "";
                    document.getElementById("txtCalle").value           = "";
                    document.getElementById("txtNumero").value          = "";
                    document.getElementById("txtExterior").value        = "";
                    document.getElementById("txtCP").value              = "";
                    document.getElementById("txtTelefono").value        = "";
                    document.getElementById("txtCorreo").value          = "";
                    document.getElementById("cboPais").value            = "0";
                    document.getElementById("cboEstado").value          = "0";
                    document.getElementById("cboCiudad").value          = "0";

                    this.btnRegresar();
                });

            } catch (error) {
                window.Swal.fire("Hubo un error al enviar los datos: ", `${error}`, "error");
            }
        },

        // PARA MODIFICAR //
        getUserIdData(){
            if (this.proveedor != null) {
                let urlQuery    = `http://localhost:3000/proveedores/${this.proveedor}`;
                axios.get(urlQuery).then((response) => {

                    let arrayData   = response.data;

                    for (const key in arrayData) { 
                        document.getElementById("txtProveedor").value       = arrayData[key].nombre;
                        document.getElementById("txtRazonSocial").value     = arrayData[key].razon_social;
                        document.getElementById("txtRFC").value             = arrayData[key].rfc;
                        document.getElementById("txtColonia").value         = arrayData[key].colonia;
                        document.getElementById("txtCalle").value           = arrayData[key].calle;
                        document.getElementById("txtExterior").value        = arrayData[key].num_ext;
                        document.getElementById("txtCorreo").value          = arrayData[key].correo;
                        document.getElementById("cboPais").value            = arrayData[key].id_pais;

                        this.pais       = arrayData[key].id_pais;
                        this.estado     = arrayData[key].id_estado;
                        this.municipio  = arrayData[key].id_municipio;

                        this.getEstados(arrayData[key].id_pais);
                        this.getMunicipios(arrayData[key].id_estado);

                        setTimeout(() => {
                            document.getElementById("txtNumero").value          = arrayData[key].num_int;
                            document.getElementById("txtTelefono").value        = arrayData[key].telefono;
                            document.getElementById("txtCP").value              = arrayData[key].cod_p;
                        }, 200);
                    }
                });
            }
        },

        async fnModificar() {
            let nombre      = document.getElementById("txtProveedor").value;
            let razon_social= document.getElementById("txtRazonSocial").value;
            let rfc         = document.getElementById("txtRFC").value;
            let colonia     = document.getElementById("txtColonia").value;
            let calle       = document.getElementById("txtCalle").value;
            let num_int     = Number(document.getElementById("txtNumero").value);
            let num_ext     = document.getElementById("txtExterior").value;
            let cod_p       = Number(document.getElementById("txtCP").value);
            let telefono    = document.getElementById("txtTelefono").value;
            let correo      = document.getElementById("txtCorreo").value;
            let usuario     = "";
            let clave       = "";
            let estatus     = 1;
            let id_perfil   = 0;
            let id_pais     = Number(document.getElementById("cboPais").value);
            let id_estado   = Number(document.getElementById("cboEstado").value);
            let id_municipio= Number(document.getElementById("cboCiudad").value);
            
            if (nombre      == "" ) { window.Swal.fire("Favor de ingresar un proveedor válido", "", "warning");       return; }
            if (razon_social== "" ) { window.Swal.fire("Favor de ingresar una razón social válida", "", "warning");   return; }
            if (rfc         == "" ) { window.Swal.fire("Favor de ingresar una clave RFC válida", "", "warning");      return; }
            if (colonia     == "" ) { window.Swal.fire("Favor de ingresar una colonia", "", "warning");               return; }
            if (calle       == "" ) { window.Swal.fire("Favor de ingresar una calle valida", "", "warning");          return; }
            if (num_int     == "" ) { window.Swal.fire("Favor de ingresar un número válido", "", "warning");          return; }
            if (num_ext     == "" ) { num_ext = "";                                                 }
            if (cod_p       == "" ) { window.Swal.fire("Favor de ingresar un código postal válido", "", "warning");   return; }
            if (telefono    == "" ) { window.Swal.fire("Favor de ingresar un teléfono válido", "", "warning");        return; }
            if (id_pais     == "0" ) { window.Swal.fire("Favor de ingresar un país válido", "", "warning");           return; }
            if (id_estado   == "0" ) { window.Swal.fire("Favor de ingresar un estado válido", "", "warning");         return; }
            if (id_municipio== "0" ) { window.Swal.fire("Favor de ingresar una ciudad válida", "", "warning");        return; }

            const ObjectData = {
                nombre      : nombre,
                razon_social: razon_social,
                rfc         : rfc,
                colonia     : colonia,
                calle       : calle,
                num_int     : num_int,
                num_ext     : num_ext,
                cod_p       : cod_p,
                telefono    : telefono,
                correo      : correo,
                usuario     : usuario,
                clave       : clave,
                estatus     : estatus,
                id_perfil   : id_perfil,
                id_pais     : id_pais,
                id_estado   : id_estado,
                id_municipio: id_municipio
            }

            try {
                const response  = await axios.put('http://localhost:3000/proveedores/' + this.proveedor, ObjectData);
                this.placeholders = response.data;
                
                window.Swal.fire({
                    title: "Registro Actualizado Correctamente",
                    text: "",
                    icon: "success"
                }).then(() => {
                    document.getElementById("txtProveedor").value       = "";
                    document.getElementById("txtRazonSocial").value     = "";
                    document.getElementById("txtRFC").value             = "";
                    document.getElementById("txtColonia").value         = "";
                    document.getElementById("txtCalle").value           = "";
                    document.getElementById("txtNumero").value          = "";
                    document.getElementById("txtExterior").value        = "";
                    document.getElementById("txtCP").value              = "";
                    document.getElementById("txtTelefono").value        = "";
                    document.getElementById("txtCorreo").value          = "";
                    document.getElementById("cboPais").value            = "0";
                    document.getElementById("cboEstado").value          = "0";
                    document.getElementById("cboCiudad").value          = "0";
    
                    this.btnRegresar();
                });

            } catch (error) {
                window.Swal.fire("Hubo un error al enviar los datos: ", `${error}`, "error");
            }
        },
    },
};
</script>