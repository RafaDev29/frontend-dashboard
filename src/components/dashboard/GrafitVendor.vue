<template>
    <div class="p-6 bg-white border border-gray-200 rounded-lg shadow">
      <div v-if="vendorsDetail.length > 0">
        <h3 class="text-lg font-bold text-gray-700 mb-4">Transportistas, Tramas y Placas</h3>
        <div class="flex items-end justify-between space-x-4">
          <!-- Iterar sobre cada transportista -->
          <div
            v-for="vendor in vendorsDetail"
            :key="vendor.name"
            class="flex flex-col items-center space-y-2"
          >
            <!-- Barras de tramas -->
            <div class="relative w-10 bg-blue-200 rounded-lg overflow-hidden">
              <div
                class="bg-blue-600 h-full rounded-lg"
                :style="{ height: calculateHeight(vendor.tracks, maxTracks) }"
              ></div>
              <span
                class="absolute -top-6 text-sm font-bold text-gray-700"
                >{{ vendor.tracks }}</span
              >
            </div>
            <!-- Barras de placas -->
            <div class="relative w-10 bg-orange-200 rounded-lg overflow-hidden">
              <div
                class="bg-orange-500 h-full rounded-lg"
                :style="{ height: calculateHeight(vendor.plates, maxPlates) }"
              ></div>
              <span
                class="absolute -top-6 text-sm font-bold text-gray-700"
                >{{ vendor.plates }}</span
              >
            </div>
            <!-- Nombre del transportista -->
            <span class="text-xs font-medium text-gray-600 text-center">
              {{ vendor.name }}
            </span>
          </div>
        </div>
      </div>
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
      vendorsDetail: {
        type: Array,
        default: () => [],
      },
    },
    computed: {
      maxTracks() {
        // Encuentra el valor máximo de tramas para calcular proporciones
        return Math.max(...this.vendorsDetail.map((item) => item.tracks), 1);
      },
      maxPlates() {
        // Encuentra el valor máximo de placas para calcular proporciones
        return Math.max(...this.vendorsDetail.map((item) => item.plates), 1);
      },
    },
    methods: {
      calculateHeight(value, maxValue) {
        // Calcula la altura en porcentaje relativo al valor máximo
        return `${(value / maxValue) * 100}%`;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilo adicional para ajustar las barras */
  .relative {
    min-height: 100px;
  }
  </style>
  