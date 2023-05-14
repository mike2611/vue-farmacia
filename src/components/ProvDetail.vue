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
                            <label for="inputEmail4">Proveedor:</label>
                            <input type="text" class="form-control" id="txtProveedor"/>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group col-md-12">
                            <label for="inputEmail4">RFC:</label>
                            <input type="text" class="form-control" id="txtRFC"/>
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
                            <label for="inputPassword4">Número/Interior:</label>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <input type="text" class="form-control" id="txtNumero"/>
                                </div>
                                <div class="form-group col-md-6">
                                    <input type="text" class="form-control" id="txtInterior" />
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
                            <input type="text" class="form-control" id="txtCP"/>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="inputPassword4">País:</label>
                            <input type="text" class="form-control" id="txtPais"/>
                        </div>
                        <div class="form-group col-md-3">
                            <label for="inputPassword4">Estado:</label>
                            <input type="text" class="form-control" id="txtEstado"/>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="inputPassword4">Ciudad:</label>
                            <input type="text" class="form-control" id="txtCiudad"/>
                        </div>
                        <div class="form-group col-md-3">
                            <label for="inputPassword4">Teléfono:</label>
                            <input type="text" class="form-control" id="txtTelefono"/>
                        </div>
                    </div>

                    <button type="button" class="btn btn-success btn-lg" @click="fnGuardar();">
                        <i class="bi bi-upload"></i>
                        Guardar
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
    props: ['Detailview'],
    data(){
        return{
            placeholders: []
        }
    },

    methods:{
        btnRegresar(){
            this.$emit("templateDetail", null);
        },

        fnGuardar(){
            let proveedor   = document.getElementById("txtProveedor").value;
            let RFC         = document.getElementById("txtRFC").value;
            let razonSocial = document.getElementById("txtRazonSocial").value;
            let calle       = document.getElementById("txtCalle").value;
            let numero      = document.getElementById("txtNumero").value;
            // let interior    = document.getElementById("txtInterior").value;
            let colonia     = document.getElementById("txtColonia").value;
            let CP          = document.getElementById("txtCP").value;
            let pais        = document.getElementById("txtPais").value;
            let estado      = document.getElementById("txtEstado").value;
            let ciudad      = document.getElementById("txtCiudad").value;
            let telefono    = document.getElementById("txtTelefono").value;
            
            if (proveedor   == "" ) { alert("Favor de ingresar un proveedor válido");       return; }
            if (RFC         == "" ) { alert("Favor de ingresar una clave RFC válida");      return; }
            if (razonSocial == "" ) { alert("Favor de ingresar una razón social válida");   return; }
            if (calle       == "" ) { alert("Favor de ingresar una calle valida");          return; }
            if (numero      == "" ) { alert("Favor de ingresar un número válido");          return; }
            // if (interior    == "" ) { alert("Favor de ingresar un"); return; }
            if (colonia     == "" ) { alert("Favor de ingresar una colonia");               return; }
            if (CP          == "" ) { alert("Favor de ingresar un código postal válido");   return; }
            if (pais        == "" ) { alert("Favor de ingresar un país válido");            return; }
            if (estado      == "" ) { alert("Favor de ingresar un estado válido");          return; }
            if (ciudad      == "" ) { alert("Favor de ingresar una ciudad válida");         return; }
            if (telefono    == "" ) { alert("Favor de ingresar un teléfono válido");        return; }

            let ObjectData = {
                proveedor   : proveedor,
                RFC         : RFC,
                razonSocial : razonSocial,
                calle       : calle,
                numero      : numero,
                colonia     : colonia,
                CP          : CP,
                pais        : pais,
                estado      : estado,
                ciudad      : ciudad,
                telefono    : telefono
            }

            console.log(ObjectData);

            axios.post('http://localhost:3000/perfiles', JSON.stringify(ObjectData)).then((response) => {
                this.placeholders = response.data;
                console.log("Envio correcto");
            });
        }
    },
};
</script>