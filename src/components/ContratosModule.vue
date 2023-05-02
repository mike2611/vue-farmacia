<template>
    <div class="container-fluid">
        <!-- Page Heading -->
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Contratos</h1>
            <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                    class="fas fa-download fa-sm text-white-50"></i> Generate Report</a>
        </div>

        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <!-- <h6 class="m-0 font-weight-bold text-primary">DataTables Example</h6> -->
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Descripci&oacute;n</th>
                                <th>Monto</th>
                                <th>Inicio</th>
                                <th>Termino</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>Id</th>
                                <th>Descripci&oacute;n</th>
                                <th>Monto</th>
                                <th>Inicio</th>
                                <th>Termino</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            <tr>
                                <td>001</td>
                                <td>Ferreteria</td>
                                <td>$ 1,000,000 MX</td>
                                <td>01/01/2023</td>
                                <td>01/01/2024</td>
                            </tr>
                            <tr>
                                <td>002</td>
                                <td>Qu&iacute;micos</td>
                                <td>$ 2,000,000 MX</td>
                                <td>01/01/2023</td>
                                <td>01/01/2024</td>
                            </tr>
                            <tr>
                                <td>003</td>
                                <td>Plomeria</td>
                                <td>$ 500,000 MX</td>
                                <td>01/01/2023</td>
                                <td>01/01/2024</td>
                            </tr>
                            <tr>
                                <td>004</td>
                                <td>EQ. M&eacute;dico A</td>
                                <td>$ 1,000,000 MX</td>
                                <td>01/01/2023</td>
                                <td>01/01/2024</td>
                            </tr>
                            <tr>
                                <td>005</td>
                                <td>EQ. M&eacute;dico B</td>
                                <td>$ 1,000,000 MX</td>
                                <td>01/01/2023</td>
                                <td>01/01/2024</td>
                            </tr>
                            <tr>
                                <td>006</td>
                                <td>Electricidad</td>
                                <td>$ 6,000,000 MX</td>
                                <td>01/01/2023</td>
                                <td>01/01/2024</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>