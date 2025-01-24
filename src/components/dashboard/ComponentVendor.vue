<template>
  <div class="w-full p-3 bg-white border border-gray-200 rounded-lg shadow">
    <div v-if="data && data.summary_card && data.summary_card.tracks !== undefined" class="space-y-2">
      <!-- Icono e información -->
      <div class="flex items-center space-x-4">
        <!-- Icono de transportistas -->
        <i class="mdi mdi-office-building-marker text-orange-500 text-2xl"></i>
        <div>
          <!-- Número de transportistas -->
          <h5 class="text-2xl font-bold text-blue-900">
            {{ data.summary_card.transport_vendors.active }} / {{ data.summary_card.transport_vendors.registered }}
          </h5>
          <p class="text-gray-600 font-medium">Transportistas retransmitiendo</p>
        </div>
      </div>

      <!-- Barra de progreso -->
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div class="h-2 rounded-full" :style="{
          width: progress + '%',
          backgroundColor: progressColor
        }"></div>
      </div>
      <p class="text-sm text-gray-500">
        {{ progress }}% de transportistas retransmitiendo
      </p>
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
        this.data.summary_card.transport_vendors
      ) {
        const active = this.data.summary_card.transport_vendors.active || 0;
        const registered =
          this.data.summary_card.transport_vendors.registered || 1; // Evitar división por 0
        return Math.round((active / registered) * 100);
      }
      return 0;
    },
    progressColor() {

      if (this.progress < 50) {
        return "#FFA500";
      }
      return "#1E3A8A";
    },
  },
};
</script>

<style scoped>
i {
  font-size: 2.5rem;
}
</style>