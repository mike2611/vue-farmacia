<template>
    <div>
      <h2>Registros de modificaciones</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>ID Admin</th>
            <th>Tabla Modificada</th>
            <th>Tipo Modificación</th>
            <th>Fecha Modificación</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="registro in registros" :key="registro.id">
            <td>{{ registro.id }}</td>
            <td>{{ registro.id_admin }}</td>
            <td>{{ registro.tabla_modificada }}</td>
            <td>{{ registro.tipo_modificacion }}</td>
            <td>{{ registro.fecha_modificacion }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
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
      async obtenerRegistrosModificaciones() {
        try {
          const response = await fetch('/registros');
          if (response.ok) {
            this.registros = await response.json();
          } else {
            console.error('Error al obtener los registros de modificaciones');
          }
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
  </script>
  