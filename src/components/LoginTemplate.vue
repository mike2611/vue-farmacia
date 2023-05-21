<template>
    <div class="container">
        <!-- Outer Row -->
        <div class="row justify-content-center">
    
            <div class="col-xl-10 col-lg-12 col-md-9">
    
                <div class="card o-hidden border-0 shadow-lg my-5">
                    <div class="card-body p-0">
                        <!-- Nested Row within Card Body -->
                        <div class="row">
                            <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                            <div class="col-lg-6">
                                <div class="p-5">
                                    <div class="text-center">
                                        <h1 class="h4 text-gray-900 mb-4">¡Bienvenido!</h1>
                                    </div>
                                    <form class="user">
                                        <div class="form-group">
                                            <input type="text" class="form-control form-control-user"
                                                id="txtUsuario" aria-describedby="emailHelp"
                                                placeholder="Usuario">
                                        </div>
                                        <div class="form-group">
                                            <input type="password" class="form-control form-control-user"
                                                id="txtClave" placeholder="Contraseña">
                                        </div>
                                        <!-- <div class="form-group">
                                            <div class="custom-control custom-checkbox small">
                                                <input type="checkbox" class="custom-control-input" id="customCheck">
                                                <label class="custom-control-label" for="customCheck">Remember
                                                    Me</label>
                                            </div>
                                        </div> -->
                                        <button type="button" id="btn-login" class="btn btn-primary btn-user btn-block" @click="loginButton">
                                            Iniciar Sesión
                                        </button>
                                        <!-- <hr> -->
                                        <!-- <a href="index.html" class="btn btn-google btn-user btn-block">
                                            <i class="fab fa-google fa-fw"></i> Login with Google
                                        </a>
                                        <a href="index.html" class="btn btn-facebook btn-user btn-block">
                                            <i class="fab fa-facebook-f fa-fw"></i> Login with Facebook
                                        </a> -->
                                    </form>
                                    <!-- <div style="display:none;">
                                        <div class="text-center">
                                            <a class="small" href="forgot-password.html">Forgot Password?</a>
                                        </div>
                                        <div class="text-center">
                                            <a class="small" href="register.html">Create an Account!</a>
                                        </div>
                                    </div> -->
                                    <!-- <hr> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // AÑADIENDO CLASSE AL BODY PARA PONERLO DE COLOR AZUL //
    document.getElementById('bodyHTML').classList.add("bg-gradient-primary");

    // vue //
    import axios from 'axios';
    export default {
        data(){
            return {

            }
        },

        methods:{
            loginButton(){
                // obteniendo usuario y clave //
                let usuario = document.getElementById('txtUsuario').value;
                let clave   = document.getElementById('txtClave').value;
                // validando campos vacios //
                if ( usuario == "" || clave == "") {
                    window.Swal.fire({
                        title   : "Datos incorrectos",
                        text    : "Usuario o contraseña inválidos",
                        icon    : "error"
                    });
                    return;
                }
                // bloqueando boton de iniciar sesion para evitar multiclick //
                document.getElementById('btn-login').disabled = true;
                // consultando usuario y clave en BD //
                axios.get(`http://localhost:3000/empleados/usuario/${usuario}/${clave}`).then((response) => {
                    // En caso de que no se encuentre el usuario en BD //
                    if (response.data == ""){
                        window.Swal.fire({
                            title   : "Error",
                            text    : "Usuario y contraseña incorrectos",
                            icon    : "error"
                        });
                        // desbloqueando botón de iniciar sesión //
                        document.getElementById('btn-login').disabled = false;
                        return;
                    }

                    // console.log(response.data);
                    // limpiando localStorage //
                    localStorage.clear();
                    // guardando datos de usuario en array //
                    let idUsuario       = response.data[0].id;
                    let idPerfil        = response.data[0].id_perfil;

                    const arrayData     = {
                        idUsuario : idUsuario,
                        idPerfil  : idPerfil
                    };

                    // console.log(arrayData);

                    const arrayString = JSON.stringify(arrayData);
                    // Guardar datos de inicio de sesión en localStorage //
                    localStorage.setItem('datosUsuario', arrayString);
                    // Redireccionar a la página de inicio de sesión exitosa //
                    this.$router.push('/dashboard');
                });
                
            }
        },
    };
</script>