<template>
  <div class=" w-full max-w  p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
    <h3 class="text-xl font-bold text-gray-800 mb-6 text-center">
      Transportistas: Placas y Tramas
    </h3>
    <div v-if="vendorsDetail.length > 0" class="overflow-x-auto">
      <!-- Gráfico -->
      <canvas ref="barChart" class="w-[850px] h-96"></canvas>
    </div>
    <div
      v-else
      class="flex flex-col items-center justify-center h-48 text-gray-500"
    >
      <i class="mdi mdi-loading mdi-spin text-blue-900 text-4xl"></i>
      <p class="mt-2 text-lg">Cargando datos...</p>
    </div>
  </div>
</template>



<script>
import { ref, watch, nextTick } from "vue";
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

    const renderChart = () => {
      const ctx = barChart.value.getContext("2d");
      const labels = props.vendorsDetail.map((vendor) => vendor.name);
      const tracksData = props.vendorsDetail.map((vendor) => vendor.tracks);

      if (chartInstance.value) {
        chartInstance.value.destroy(); // Destruye el gráfico anterior si existe
      }

      chartInstance.value = new Chart(ctx, {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              label: "Tramas retransmitidas",
              data: tracksData,
              backgroundColor: "#2563EB",
              borderRadius: 5,
              barThickness: 15,
            },
          ],
        },
        options: {
          responsive: true,
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
        if (newData.length > 0) {
          await nextTick(); // Asegúrate de que el DOM esté listo antes de renderizar
          renderChart();
        }
      },
      { immediate: true } // Ejecuta el watch al inicializar el componente
    );

    return {
      barChart,
    };
  },
};
</script>
