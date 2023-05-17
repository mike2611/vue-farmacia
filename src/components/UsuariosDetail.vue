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
            <div class="card-header py-3">Datos del Empleado</div>
            <div class="card-body">
                <!-- FORM LLENADO DE DATOS -->
                <form>
                    <div class="form-row">
                        <div class="form-group col-md-4">
                            <label for="inputEmail4">Perfil:</label>
                            <select id="cboPerfil" class="form-control">
                                <option value="0" selected>SELECCIONAR</option>
                                <option v-for="(item, index) of perfiles" :key="index" :value="item.id">{{item.descripcion}}</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-row">

                        <div class="form-group col-md-6">
                            <label for="inputEmail4">Nombre(s):</label>
                            <input  type="text"
                                    class="form-control"
                                    v-model="text"
                                    @blur="capitalize"
                                    id="txtNombre" />
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

                    <button v-if="empleadoID == null" type="button" class="btn btn-success btn-lg" @click="fnGuardar();">
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

    props: ['Detailview', 'empleado'],

    data(){
        return{
            placeholders: [],
            perfiles    : [],
            Usuarios    : [],
            empleadoID  : null,
            // capitalize inputs //
            text: ''
        }
    },

    created(){
        this.getPerfiles();
    },
    methods:{
        btnRegresar(){
            this.$emit("templateDetail", null);
        },
        getPerfiles(){
            axios.get('http://localhost:3000/perfiles').then((response) => {
                this.perfiles   = [];
                let arrayData   = response.data;
                let perfiles    = this.perfiles;
                for (const key in arrayData) {
                    perfiles.push(arrayData[key]);
                }
                if( this.empleado != undefined ){ this.getUserIdData(this.empleado); }
            });
        },
        async fnGuardar(){
            let id_perfil   = document.getElementById("cboPerfil").value;
            let nombre      = document.getElementById("txtNombre").value;
            let paterno     = document.getElementById("txtPaterno").value;
            let materno     = document.getElementById("txtMaterno").value;
            let edad        = document.getElementById("txtEdad").value;
            let usuario     = document.getElementById("txtUsuario").value;
            let clave       = document.getElementById("txtClave").value;

            if( id_perfil   == 0 ) { alert("Favor de seleccionar un perfil válido");        return; }
            if( nombre      == "") { alert("Favor de ingresar un nombre válido");           return; }
            if( paterno     == "") { alert("Favor de ingresar un apellido paterno válido"); return; }
            if( materno     == "") { alert("Favor de ingresar un apellido materno válido"); return; }
            if( edad        == "") { alert("Favor de ingresar una edad válida");            return; }
            if( usuario     == "") { alert("Favor de ingresar un usuario válido");          return; }
            if( clave       == "") { alert("Favor de ingresar una clave válido");           return; }

            const ObjectData = {
                id_perfil   : id_perfil,
                nombre      : nombre,
                paterno     : paterno,
                materno     : materno,
                edad        : edad,
                usuario     : usuario,
                clave       : clave
            }

            try {
                const response  = await axios.post('http://localhost:3000/empleados', ObjectData);
                this.Usuarios   = response.data;
                alert("Envio correcto");

                document.getElementById("cboPerfil").value  = "0";
                document.getElementById("txtNombre").value  = "";
                document.getElementById("txtPaterno").value = "";
                document.getElementById("txtMaterno").value = "";
                document.getElementById("txtEdad").value    = "";
                document.getElementById("txtUsuario").value = "";
                document.getElementById("txtClave").value   = "";


            } catch (error) {
                alert("Hubo un error al enviar los datos: ", error);
            }

        },
        // PARA MODIFICAR //
        getUserIdData(empleado){
            this.empleadoID = empleado;
            let urlQuery    = `http://localhost:3000/empleados/${empleado}`;            
            axios.get(urlQuery).then((response) => {
                let arrayData   = response.data;
                for (const key in arrayData) { 
                   document.getElementById("cboPerfil").value   = arrayData[key].id_perfil;
                   document.getElementById("txtNombre").value   = arrayData[key].nombre;
                   document.getElementById("txtPaterno").value  = arrayData[key].paterno;
                   document.getElementById("txtMaterno").value  = arrayData[key].materno;
                   document.getElementById("txtEdad").value     = arrayData[key].edad;
                   document.getElementById("txtUsuario").value  = arrayData[key].usuario;
                   document.getElementById("txtClave").value    = arrayData[key].clave;                    
                }
            });
        },
        async fnModificar() {
            let id_perfil   = document.getElementById("cboPerfil").value;
            let nombre      = document.getElementById("txtNombre").value;
            let paterno     = document.getElementById("txtPaterno").value;
            let materno     = document.getElementById("txtMaterno").value;
            let edad        = document.getElementById("txtEdad").value;
            let usuario     = document.getElementById("txtUsuario").value;
            let clave       = document.getElementById("txtClave").value;

            if( id_perfil   == 0 ) { alert("Favor de seleccionar un perfil válido");        return; }
            if( nombre      == "") { alert("Favor de ingresar un nombre válido");           return; }
            if( paterno     == "") { alert("Favor de ingresar un apellido paterno válido"); return; }
            if( materno     == "") { alert("Favor de ingresar un apellido materno válido"); return; }
            if( edad        == "") { alert("Favor de ingresar una edad válida");            return; }
            if( usuario     == "") { alert("Favor de ingresar un usuario válido");          return; }
            if( clave       == "") { alert("Favor de ingresar una clave válido");           return; }

            const ObjectData = {
                id_perfil   : id_perfil,
                nombre      : nombre,
                paterno     : paterno,
                materno     : materno,
                edad        : edad,
                usuario     : usuario,
                clave       : clave
            }

            try {
                const response  = await axios.put('http://localhost:3000/empleados/' + this.empleado, ObjectData);
                this.Usuarios   = response.data;
                alert("Envio correcto");

                document.getElementById("cboPerfil").value  = "0";
                document.getElementById("txtNombre").value  = "";
                document.getElementById("txtPaterno").value = "";
                document.getElementById("txtMaterno").value = "";
                document.getElementById("txtEdad").value    = "";
                document.getElementById("txtUsuario").value = "";
                document.getElementById("txtClave").value   = "";

                this.btnRegresar();


            } catch (error) {
                alert("Hubo un error al enviar los datos: ", error);
            }
        },
        capitalize() {
            const [firstLetter, ...rest] = this.text.split('');
            const upperCaseLetter = firstLetter.toUpperCase();
      
            if (firstLetter === upperCaseLetter) {
                return;
            }

            this.text = firstLetter.toUpperCase() + rest.join('');
        }
    },
};
</script>