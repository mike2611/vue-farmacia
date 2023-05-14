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
                                <option value="1">Proveedor 1</option>
                                <option value="2">Proveedor 2</option>
                                <option value="3">Proveedor 3</option>
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
                            <input type="text" placeholder="0.00" class="form-control" id="txtMonto">
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

                    <button type="button" class="btn btn-success btn-lg" @click="fnGuardar()">
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
            placeholders: [],
        }
    },

    methods:{
        btnRegresar(){
            this.$emit("templateDetail", null);
        },
        fnGuardar(){
            let cboProveedor    = document.getElementById("cboProveedor").value;
            let txtContrato     = document.getElementById("txtContrato").value;
            let txtDescripcion  = document.getElementById("txtDescripcion").value;
            let txtMonto        = document.getElementById("txtMonto").value;
            let txtInicio       = document.getElementById("txtInicio").value;
            let txtTermino      = document.getElementById("txtTermino").value;

            if( cboProveedor    == 0 ) { alert("Favor de seleccionar un proveedor válido");     return; }
            if( txtContrato     == "") { alert("Favor de ingresar un contrato válido");         return; }
            if( txtDescripcion  == "") { alert("Favor de ingresar una descripción válido");     return; }
            if( txtMonto        == "") { alert("Favor de ingresar un monto válido");            return; }
            if( txtInicio       == "") { alert("Favor de ingresar una fecha de inicio válida"); return; }
            if( txtTermino      == "") { alert("Favor de ingresar una fecha de termino válida");return; }

            let ObjectData = {
                cboProveedor    : cboProveedor,
                txtContrato     : txtContrato,
                txtDescripcion  : txtDescripcion,
                txtMonto        : txtMonto,
                txtInicio       : txtInicio,
                txtTermino      : txtTermino
            }

            console.log(ObjectData);

            axios.post('https://jsonplaceholder.typicode.com/photos/?_limit=12').then((response) => {
                this.placeholders = response.data;
                console.log(this.placeholders);
            });
        },
    },
};
</script>