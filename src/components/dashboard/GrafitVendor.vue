<template>
  <div class="w-full max-w p-6 bg-white border border-gray-300 rounded-lg shadow-md">
    <h3 class="text-2xl font-semibold text-gray-800 mb-6 text-center">
      Transportistas: Placas y Tramas
    </h3>
    <div v-if="vendorsDetail && vendorsDetail.length > 0" class="overflow-auto">
      <!-- Gráfico -->
      <canvas ref="barChart" class="w-full h-96"></canvas>
    </div>
    <div v-else class="flex flex-col items-center justify-center h-48 text-gray-500">
      <svg class="animate-spin h-12 w-12 text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
      <p class="mt-3 text-lg">Cargando datos...</p>
    </div>
  </div>
</template>

<script>
import { ref, watch, onUnmounted, nextTick } from "vue";
import { Chart } from "chart.js/auto";

export default {
  props: {
    vendorsDetail: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const barChart = ref(null);
    const chartInstance = ref(null);

    const validateData = (data) => Array.isArray(data) && data.length > 0;

    const destroyChart = () => {
      if (chartInstance.value) {
        chartInstance.value.destroy();
        chartInstance.value = null;
      }
    };

    const createChart = async () => {
      if (!barChart.value || !validateData(props.vendorsDetail)) return;

      const ctx = barChart.value.getContext("2d");
      if (!ctx) return;

      const labels = props.vendorsDetail.map((vendor) => vendor.name);
      const tracksData = props.vendorsDetail.map((vendor) => vendor.tracks);

      destroyChart(); // Destruir cualquier instancia previa del gráfico

      chartInstance.value = new Chart(ctx, {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              label: "Tramas retransmitidas",
              data: tracksData,
              backgroundColor: "#3B82F6",
              borderColor: "#2563EB",
              borderWidth: 2,
              borderRadius: 5,
              barThickness: 15,
            },
          ],
        },
        options: {
          responsive: true,
          animation: {
            duration: 800,
            easing: "easeOutQuint",
          },
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Transportistas",
              },
            },
            y: {
              title: {
                display: true,
                text: "Cantidad de tramas",
              },
              beginAtZero: true,
            },
          },
        },
      });
    };

    watch(
      () => props.vendorsDetail,
      async (newData) => {
        if (validateData(newData)) {
          await nextTick();
          createChart(); // Reconstruir el gráfico completamente
        }
      },
      { immediate: true }
    );

    onUnmounted(() => {
      destroyChart(); // Limpiar el gráfico al desmontar el componente
    });

    return {
      barChart,
    };
  },
};
</script>
