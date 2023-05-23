<template>
    <div class="container-fluid">
        <!-- TEMPLATE PRINCIPAL -->
        <div>
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 class="h3 mb-0 text-gray-800">Registros</h1>
                <!-- <a class="d-none d-sm-inline-block btn btn-primary btn-lg shadow-sm" @click="templateDetail(1)">
                    <i class="bi bi-plus-square"></i>
                    Nuevo
                </a> -->
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
                                    <th class="col-4 text-center">Nombre Completo</th>
                                    <th class="col-3 text-center">Tabla Modificada</th>
                                    <th class="col-3 text-center">Se Modificó</th>
                                    <th class="col-2 text-center">Fecha Modificación</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="registro in registros" :key="registro.id">
                                    <td class="col-4 text-center">{{ registro.adminNombre }}</td>
                                    <td class="col-3 text-center">{{ registro.tablaModificada }}</td>
                                    <td class="col-3 text-center">{{ registro.objetoModificado }}</td>
                                    <td class="col-2 text-center">{{ registro.fechaModificacion }}</td>
                                </tr>
                            </tbody>
                        </table> 
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

  
  
  <script>
  import axios from 'axios';

  export default {
    data() {
      return {
        registros: [],
      };
    },
    mounted() {
      this.obtenerRegistrosModificaciones();
    },
    methods: {
      obtenerNombre(idAdmin) {
        return new Promise((resolve, reject) => {
        axios.get(`http://localhost:3000/empleados/${idAdmin}`)
          .then((response) => {
            let empleadoAdmin = response.data[0];
            const nombreCompleto = `${empleadoAdmin.nombre} ${empleadoAdmin.paterno} ${empleadoAdmin.materno}`;
            resolve(nombreCompleto);
          })
          .catch((error) => {
            console.error(error);
            reject(error);
          });
      });
      },
      obtenerRegistrosModificaciones() {
         axios.get('http://localhost:3000/registros')
         .then( async (response) => {
            for(let registro of response.data) {
                let datosModificacion = {
                adminNombre : await this.obtenerNombre(registro.id_admin),
                tablaModificada: registro.tabla_modificada,
                objetoModificado: registro.nombre_modificacion,
                fechaModificacion: registro.fecha_modificacion
                }
                this.registros.push(datosModificacion);
            }
         }).catch((error) => {
            console.error(error);
         });
      },
    },
  };
  </script>
  