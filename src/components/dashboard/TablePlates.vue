<template>
  <div class="w-full max-w p-1 bg-white border border-gray-200 rounded-lg shadow sm:p-4">
    <div v-if="detail_plates && detail_plates.length > 0" >

      <div class="flex items-center justify-between mb-4">
        <h5 class="text-xl font-bold leading-none text-blue-900">
          Placas sin transmitir
        </h5>
        <button v-if="showMore && detail_plates.length > 10" @click="toggleView"
          class="text-sm font-medium text-orange-500 hover:underline">
          {{ showAll ? "Ver menos" : "Ver más" }}
        </button>
      </div>
      <div class="flow-root max-h-80 overflow-y-auto custom-scrollbar">
        <ul role="list" class="divide-y divide-gray-200">
          <li v-for="(vendor, index) in displayedVendors" :key="index" class="py-3 sm:py-4">
            <div class="flex items-center">

              <i class="mdi mdi-truck text-orange-500 text-2xl"></i>
              <div class="flex-1 min-w-0 ms-4">

                <p class="text-sm font-medium text-gray-900 truncate">
                  {{ vendor.plate }}
                </p>
              </div>

              <div class="inline-flex items-center text-base font-semibold text-blue-900">
                {{ vendor.time_off }}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div v-else class="flex flex-col items-center justify-center h-48 text-gray-500">
      <svg class="animate-spin h-12 w-12 text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
      <p class="mt-3 text-lg">Cargando datos...</p>
    </div>

  </div>
</template>

<script>
export default {
  name: "ComponentPlots",
  props: {
    detail_plates: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      showAll: false, // Estado para alternar entre ver todos o solo 10
    };
  },
  computed: {
    showMore() {
      return this.detail_plates.length > 10;
    },
    displayedVendors() {
      return this.showAll
        ? this.detail_plates
        : this.detail_plates.slice(0, 10);
    },
  },
  methods: {
    toggleView() {
      this.showAll = !this.showAll;
    },
  },
};
</script>

<style scoped>
/* Estilos adicionales */
i {
  font-size: 1.5rem;
}

.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #abc9ee #f4f4f4;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #abc9ee;
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background-color: #f4f4f4;
  border-radius: 4px;
}
</style>