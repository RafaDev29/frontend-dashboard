<template>
    <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
      <div v-if="data && data.summary_card && data.summary_card.gps_providers !== undefined" class="space-y-4">
        <!-- Icono e información -->
        <div class="flex items-center space-x-4">
          <!-- Icono de proveedores GPS -->
          <i class="mdi mdi-satellite-uplink text-orange-500 text-4xl"></i>
          <div>
            <!-- Número de proveedores GPS -->
            <h5 class="text-3xl font-bold text-blue-900">
              {{ data.summary_card.gps_providers.active }} / {{ data.summary_card.gps_providers.registered }}
            </h5>
            <p class="text-gray-600 font-medium">Proveedores GPS activos</p>
          </div>
        </div>
  
        <!-- Barra de progreso -->
        <div class="w-full bg-gray-200 rounded-full h-4">
          <div
            class="h-4 rounded-full"
            :style="{
              width: progress + '%',
              backgroundColor: progressColor
            }"
          ></div>
        </div>
        <p class="text-sm text-gray-500">
          {{ progress }}% Proveedores GPS activos
        </p>
      </div>
  
      <!-- Indicador de carga -->
      <div v-else class="flex items-center justify-center h-20">
        <i class="mdi mdi-loading mdi-spin text-blue-900 text-4xl"></i>
        <span class="ml-2 text-blue-900 font-medium">Cargando...</span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ComponentPlots",
    props: {
      data: {
        type: Object,
        default: null,
      },
    },
    computed: {
      progress() {
        if (
          this.data &&
          this.data.summary_card &&
          this.data.summary_card.gps_providers
        ) {
          const active = this.data.summary_card.gps_providers.active || 0;
          const registered =
            this.data.summary_card.gps_providers.registered || 1; // Evitar división por 0
          return Math.round((active / registered) * 100);
        }
        return 0;
      },
      progressColor() {
        // Cambia el color según el porcentaje
        if (this.progress < 50) {
          return "#FFA500"; // Naranja
        }
        return "#1E3A8A"; // Azul oscuro
      },
    },
  };
  </script>
  
  <style scoped>
  i {
    font-size: 2.5rem;
  }
  </style>
  