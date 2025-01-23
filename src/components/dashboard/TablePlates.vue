<template>
  <div class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8">
    <div class="flex items-center justify-between mb-4">
      <h5 class="text-xl font-bold leading-none text-blue-900">
        Placas sin transmitir
      </h5>
      <button v-if="showMore && vendorsDetail.length > 10" @click="toggleView"
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
                {{ vendor.name }}
              </p>
            </div>
 
            <div class="inline-flex items-center text-base font-semibold text-blue-900">
              {{ vendor.tracks }} placas
            </div>
          </div>
        </li>
      </ul>
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
  data() {
    return {
      showAll: false, // Estado para alternar entre ver todos o solo 10
    };
  },
  computed: {
    showMore() {
      return this.vendorsDetail.length > 10;
    },
    displayedVendors() {
      return this.showAll
        ? this.vendorsDetail
        : this.vendorsDetail.slice(0, 10);
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