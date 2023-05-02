<template>
    <div>
        <div>
            <!-- Content Wrapper -->
            <div id="content-wrapper" class="d-flex flex-column">


                <!-- Main Content -->
                <div id="content">

                    <!-- Begin Page Content -->
                    <div class="d-flex justify-content-center container-fluid">

                        <!-- Page Heading -->
                        <div class="center-top mt-4">
                            <div class="d-flex justify-content-center" style="width: 15vw;">
                                <h1 class="h3 mb-1 text-gray-800 m-2"> <b class="blue-color">F</b>arma<b class="blue-color">F</b>ácil</h1> 
                                <div>
                                    <img src="../assets/img/farmaLogo6.png" alt="Logo Farmacia" width="40%">
                                </div>
                            </div>
                        </div>
                                        

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
                                        <li class="list-group-item active" aria-current="true">
                                            Paracetamol
                                            <small> 500mgs</small>
                                        </li>
                                        <li class="list-group-item">
                                            Aspirina 
                                            <small> 500mgs</small>
                                        </li>
                                        <li class="list-group-item">
                                            Complejo B
                                            <small> 500mgs</small>
                                        </li>
                                        <li class="list-group-item">
                                            Vitamina C
                                            <small> 200mgs</small>
                                        </li>
                                        <li class="list-group-item">
                                            Next
                                            <small> 400mgs</small>
                                        </li>
                                    </ul>
                                </div>
                                <div class="d-flex flex-column" style="width: 15%;">
                                    <h6 class="blue-color font-weight-bold">Cantidad de Paracetamol: </h6>
                                    <input  class="m-3" type="number" placeholder="0">
                                    <h6 class="blue-color font-weight-bold">Precio Unitario: </h6>
                                    <input class="m-3" type="number" value="80" readonly>
                                    <button type="button" class="btn btn-primary btn-sm">Añadir a la cuenta</button>
                                </div>
                                <div>
                                    <div class="ml-4">
                                        <span class="blue-color font-weight-bold">Cuenta Actual:</span>
                                        <div class="d-flex">
                                            <ul class="list-group m-3">
                                                <li class="list-group-item">
                                                    Aspirina 
                                                    <small> 500mgs</small>
                                                </li>
                                                <li class="list-group-item">
                                                    Next
                                                    <small> 400mgs</small>
                                                </li>
                                                <li class="list-group-item">
                                                    Vitamina C
                                                    <small> 200mgs</small>
                                                </li>
                                                <li class="list-group-item">
                                                    Minerales 
                                                    <small> 500mgs</small>
                                                </li>
                                                <li class="list-group-item">
                                                    Proteina
                                                    <small> 400mgs</small>
                                                </li>
                                                <li class="list-group-item">
                                                    Jeringa
                                                    <small> 200mgs</small>
                                                </li>
                                                <li class="list-group-item">
                                                    Alcohol
                                                    <small> 500mgs</small>
                                                </li>
                                                <li class="list-group-item">
                                                    Algodon
                                                    <small> 400mgs</small>
                                                </li>
                                                <li class="list-group-item">
                                                    Vitamina D
                                                    <small> 200mgs</small>
                                                </li>
                                            </ul>
                                            <ul class="list-group m-3">
                                                <li class="list-group-item">
                                                    2 unidades X $ 100.00
                                                </li>
                                                <li class="list-group-item">
                                                    2 unidades X $ 50.00
                                                </li>
                                                <li class="list-group-item">
                                                    4 unidades X $ 200.00
                                                </li>
                                                <li class="list-group-item">
                                                    2 unidades X $ 100.00
                                                </li>
                                                <li class="list-group-item">
                                                    2 unidades X $ 50.00
                                                </li>
                                                <li class="list-group-item">
                                                    4 unidades X $ 200.00
                                                </li>
                                                <li class="list-group-item">
                                                    2 unidades X $ 100.00
                                                </li>
                                                <li class="list-group-item">
                                                    2 unidades X $ 50.00
                                                </li>
                                                <li class="list-group-item">
                                                    4 unidades X $ 200.00
                                                </li>
                                            </ul>
                                            <ul class="list-group m-3">
                                                <li class="list-group-item">
                                                    $ 200.00
                                                </li>
                                                <li class="list-group-item">
                                                    $ 100.00
                                                </li>
                                                <li class="list-group-item">
                                                    $ 800.00
                                                </li>
                                                <li class="list-group-item">
                                                    $ 200.00
                                                </li>
                                                <li class="list-group-item">
                                                    $ 100.00
                                                </li>
                                                <li class="list-group-item">
                                                    $ 800.00
                                                </li>
                                                <li class="list-group-item">
                                                    $ 200.00
                                                </li>
                                                <li class="list-group-item">
                                                    $ 100.00
                                                </li>
                                                <li class="list-group-item">
                                                    $ 800.00
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="d-flex flex-row justify-content-end m-3">
                                            <div class="d-flex flex-column align-items-end">
                                                <div class="d-flex justify-content-between w-100">
                                                    <b class="mt-2">SubTotal:</b>
                                                    <b class="mt-2 black-color">$ 1050.00</b>
                                                </div>
                                                <div class="d-flex justify-content-between w-100">
                                                    <b class="mt-2">Descuento(s):</b>
                                                    <b class="mt-2 black-color">$ 150.00</b>
                                                </div>
                                                <div class="d-flex justify-content-between w-100">
                                                    <b class="mt-2">IVA:</b>
                                                    <b class="mt-2 black-color">$ 144.00</b>
                                                </div>
                                                <div class="d-flex justify-content-between w-100">
                                                    <b class="mt-2 blue-color">Total:</b>
                                                    <b class="mt-2 black-color">$ 1044.00</b>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div class="d-flex flex-row-reverse mb-5 mr-3">
                                            <button type="button" class="ml-2 btn btn-primary btn-sm">Pagar</button>
                                            <button type="button" class="ml-2 btn btn-danger btn-sm">Limpiar Todo</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    

                    

                    
                    </div>

                </div>
                <!-- End of Main Content -->

                <CustomFooter />
            </div>
            <!-- End of Content Wrapper -->

        </div>
        <!-- End of Page Wrapper -->

        <!-- Logout Modal-->
        <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
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



  export default {
    name: 'PuntoVenta',
    components: {
  }
  };
  </script>
  
  <style scoped>
    .blue-color {
        color: #3eb9c0;
        }

        .black-color {
            color: black;
        }


        .center-top {
            position: absolute;
            top: 8%;
            left: 49%;
            transform: translateX(-50%);
        }

  </style>
  