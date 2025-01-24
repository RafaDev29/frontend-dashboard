<template>
    <div class="w-full p-3 bg-white border border-gray-200 rounded-lg shadow">
        <div v-if="data && data.summary_card && data.summary_card.plates !== undefined" class="space-y-2">
            <!-- Icono e información -->
            <div class="flex items-center space-x-4">
                <!-- Icono de placas -->
                <i class="mdi mdi-truck text-orange-500 text-2xl"></i>
                <div>
                    <!-- Total de placas retransmitiendo -->
                    <h5 class="text-2xl font-bold text-blue-900">
                        {{ data.summary_card.plates.active }}
                    </h5>
                    <p class="text-gray-600 font-medium">Total de placas retransmitiendo</p>
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
        data: {
            type: Object,
            default: null,
        },
    },
};
</script>

<style scoped>
i {
    font-size: 2.5rem;
}
</style>