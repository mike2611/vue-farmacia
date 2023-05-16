<template>
    <div class="container-fluid">
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Información del Usuario</h1>
            <a class="d-none d-sm-inline-block btn btn-danger btn-lg shadow-sm" @click="btnRegresar()">
                <i class="bi bi-backspace"></i>
                Regresar
            </a>
        </div>
        
        <div class="card shadow mb-4">
            <div class="card-header py-3">Datos de Usuario</div>
            <div class="card-body">
                <!-- FORM LLENADO DE DATOS -->
                <form>
                    <div class="form-row">
                        <div class="form-group col-md-4">
                            <label for="inputEmail4">Perfil:</label>
                            <select id="cboPerfil" class="form-control">
                                <option value="0" selected>SELECCIONAR</option>
                                <option value="1">Administrador</option>
                                <option value="2">Empleado</option>
                                <option value="3">Proveedor</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-row">

                        <div class="form-group col-md-6">
                            <label for="inputEmail4">Nombre(s):</label>
                            <input type="text" class="form-control" id="txtNombre" />
                        </div>

                        <div class="form-group col-md-6">
                            <label for="inputEmail4">Ap. Paterno:</label>
                            <input type="text" class="form-control" id="txtPaterno" />
                        </div>
                        
                    </div>

                    <div class="form-row">

                        <div class="form-group col-md-6">
                            <label for="inputPassword4">Ap. Materno:</label>
                            <input type="text" class="form-control" id="txtMaterno"/>
                        </div>

                        <div class="form-group col-md-6">
                            <label for="inputEmail4">Edad:</label>
                            <input type="text" class="form-control" id="txtEdad"/>
                        </div>

                    </div>

                    <div class="form-row">
                        <div class="form-group col-md-4">
                            <label for="inputEmail4">Usuario:</label>
                            <input type="email" class="form-control" id="txtUsuario">
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group col-md-4">
                            <label for="inputPassword4">Clave:</label>
                            <input type="password" class="form-control" id="txtClave">
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
// const Swal = SweetAlert;
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
            let perfil  = document.getElementById("cboPerfil").value;
            let nombre  = document.getElementById("txtNombre").value;
            let paterno = document.getElementById("txtPaterno").value;
            let materno = document.getElementById("txtMaterno").value;
            let edad    = document.getElementById("txtEdad").value;
            let usuario = document.getElementById("txtUsuario").value;
            let clave   = document.getElementById("txtClave").value;

            if( perfil  == 0 ) { alert("Favor de seleccionar un perfil válido");        return; }
            if( nombre  == "") { alert("Favor de ingresar un nombre válido");           return; }
            if( paterno == "") { alert("Favor de ingresar un apellido paterno válido"); return; }
            if( materno == "") { alert("Favor de ingresar un apellido materno válido"); return; }
            if( edad    == "") { alert("Favor de ingresar una edad válida");            return; }
            if( usuario == "") { alert("Favor de ingresar un usuario válido");          return; }
            if( clave   == "") { alert("Favor de ingresar una clave válido");           return; }

            let ObjectData = {
                perfil  : perfil,
                nombre  : nombre,
                paterno : paterno,
                materno : materno,
                edad    : edad,
                usuario : usuario,
                clave   : clave
            }

            console.log(ObjectData);

            axios.get('localhost:3000/empleados').then((response) => {
                this.placeholders = response.data;
                console.log(this.placeholders);
            });
        },
    },
};
</script>