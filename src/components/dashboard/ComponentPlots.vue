<template>
    <div class="max-w-sm p-3 bg-white border border-gray-200 rounded-lg shadow">
        <div v-if="data && data.summary_card && data.summary_card.tracks !== undefined"
            class="flex items-center space-x-4">
            <!-- Icono usando MDI -->
            <i class="mdi mdi-signal-cellular-outline text-orange-500 text-4xl"></i>
            <div>
                <!-- Número de tramas retransmitidas -->
                <h5 class="text-2xl font-bold text-blue-800">
                    {{ data.summary_card.tracks }}
                </h5>
                <p class="text-gray-600 font-medium">Tramas retransmitidas</p>
            </div>
        </div>
        <div v-else class="flex items-center justify-center h-20">
            <!-- Indicador de carga -->
            <i class="mdi mdi-loading mdi-spin text-blue-500 text-4xl"></i>
            <span class="ml-2 text-blue-700 font-medium">Cargando...</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "ComponentPlots",
    props: {
        data: {
            type: Object,
            default: null, // Permitir que sea nulo hasta que lleguen los datos
        },
    },
    setup(props) {
        console.log("Data recibida:", props.data);

        return {};
    },
};
</script>

<style scoped>
i {
    font-size: 2.5rem;
}
</style>