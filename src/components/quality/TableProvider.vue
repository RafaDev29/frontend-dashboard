<template>
  <div class="relative w-full mb-5 pb-5 bg-white border border-gray-200 rounded-lg shadow sm:p-4">
    <!-- Provider Name -->
    <div class="mb-4 text-lg font-bold text-gray-800 flex items-center">
      <i class="mdi mdi-satellite-uplink text-orange-500 mr-2"></i>
      {{ detail_gps_provider.providerName }}
    </div>

    <!-- Timeline Container -->
    <div class="relative w-full overflow-x-auto custom-scrollbar ">
      <div class="relative w-[2400px] h-[58px] bg-gray-100 rounded-lg border ">
        <!-- Hour Markers -->
        <div class="absolute inset-0 flex">
          <div 
            v-for="hour in 24" 
            :key="hour"
            class="relative w-[100px] border-r border-gray-300 flex justify-center items-start"
          >
            <div 
              class="w-4 h-4 rounded-full mt-1"
              :class="{
                'bg-orange-500': hour === 1 || hour === 24,
                'bg-gray-400': hour !== 1 && hour !== 24
              }"
            ></div>
            <span class="absolute top-6 text-xs text-gray-600">
              {{ hour === 24 ? '23:59' : (hour-1).toString().padStart(2, '0') + ':00' }}
            </span>
          </div>
        </div>

        <!-- Gap Segments -->
        <div
          v-for="(gap, index) in detail_gps_provider.gaps"
          :key="index"
          class="absolute h-full bg-red-500/50"
          :style="getGapStyle(gap)"
        >
          <div 
            class="absolute top-[-1.5rem] left-1/2 transform -translate-x-1/2 cursor-pointer z-10000 mt-10"
            @mouseover="showTooltip($event, gap)"
            @mouseleave="hideTooltip"
          >
            <i class="mdi mdi-alert-circle-outline text-red-600 text-sm "></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Tooltip -->
    <div
      v-if="tooltip.visible"
      class="fixed z-50 bg-gray-800 text-white text-sm rounded shadow-lg px-4 py-2"
      :style="{ top: `${tooltip.y}px`, left: `${tooltip.x}px` }"
    >
      <div class="flex items-center space-x-2 mb-1">
        <i class="mdi mdi-clock text-sm"></i>
        <span><strong>Inicio:</strong> {{ tooltip.data.startTime }}</span>
      </div>
      <div class="flex items-center space-x-2 mb-1">
        <i class="mdi mdi-clock-end text-sm"></i>
        <span><strong>Fin:</strong> {{ tooltip.data.endTime }}</span>
      </div>
      <div class="flex items-center space-x-2">
        <i class="mdi mdi-timer text-sm "></i>
        <span><strong>Duración:</strong> {{ tooltip.data.duration }}</span>
      </div>
    </div>

    <!-- Transmission Status -->
    <div 
      class="mt-4 px-4 py-2 rounded-lg flex items-center space-x-2"
      :class="detail_gps_provider.isConstant 
        ? 'bg-green-100 text-green-800' 
        : 'bg-red-100 text-red-800'"
    >
      <i 
        :class="detail_gps_provider.isConstant 
          ? 'mdi mdi-radio-tower text-green-600' 
          : 'mdi mdi-alert-circle-outline text-red-600'"
        class="text-xl"
      ></i>
      <span>
        {{ detail_gps_provider.isConstant 
          ? 'Retransmitiendo actualmente' 
          : 'No transmitiendo por el momento' }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    detail_gps_provider: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      tooltip: {
        visible: false,
        x: 0,
        y: 0,
        data: null,
      },
    };
  },
  methods: {
    getGapStyle(gap) {
      const startPercent = this.timeToPercentage(gap.startTime);
      const endPercent = this.timeToPercentage(gap.endTime);
      return {
        left: `${startPercent}%`,
        width: `${endPercent - startPercent}%`,
      };
    },
    timeToPercentage(time) {
      const [hours, minutes] = time.split(":").map(Number);
      const totalMinutes = hours * 60 + minutes;
      return (totalMinutes / (24 * 60)) * 100;
    },
    showTooltip(event, gap) {
      const target = event.currentTarget;
      const rect = target.getBoundingClientRect();
      
      this.tooltip.visible = true;
      this.tooltip.x = rect.left + rect.width / 2 + window.scrollX;
      this.tooltip.y = rect.top - 60 + window.scrollY;
      this.tooltip.data = gap;
    },
    hideTooltip() {
      this.tooltip.visible = false;
      this.tooltip.data = null;
    },
  },
};
</script>

<style scoped>

.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #60666f #f4f4f4;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #595e65;
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background-color: #f4f4f4;
  border-radius: 4px;
}

</style>
