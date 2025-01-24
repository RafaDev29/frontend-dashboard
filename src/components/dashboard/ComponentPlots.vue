<template>
    <div class="w-full p-3 bg-white border border-gray-200 rounded-lg shadow">
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