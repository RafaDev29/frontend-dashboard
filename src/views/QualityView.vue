<template>
    <div class="mb-10 pb-10">
        <!-- Mostrar spinner de cargando mientras se espera la respuesta -->
        <div v-if="loading" class="flex flex-col items-center justify-center h-48 text-gray-500">
            <svg class="animate-spin h-12 w-12 text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
            <p class="mt-3 text-lg">Cargando datos...</p>
        </div>

        <!-- Mostrar datos cuando se han cargado -->
        <div v-else>
            <div class="flex flex-wrap space-x-1 mb-3 pb-3">
                <!-- Iterar sobre cada objeto en detail_gps_provider y renderizar un componente por objeto -->
                <TableProvider 
                    v-for="(item, index) in detail_gps_provider" 
                    :key="index" 
                    :detail_gps_provider="item" 
                />
            </div>
        </div>
    </div>
</template>

<script>
import {  ref, onMounted, onBeforeUnmount } from 'vue'

import { listQualityApi } from '@/api/QualityService'

import TableProvider from '@/components/quality/TableProvider.vue';

export default {
    components: {
        TableProvider,
    },
    setup() {
        const detail_gps_provider = ref([]);
        const loading = ref(true); // Estado para controlar el indicador de carga

        const listDashboard = async () => {
            loading.value = true; // Activar el indicador de carga
            try {
                const response = await listQualityApi();
                if (response) {
                    // Asignar la lista de datos a detail_gps_provider
                    detail_gps_provider.value = response.data;
                }
            } catch (error) {
                console.log("Error al mostrar", error);
            } finally {
                loading.value = false; // Desactivar el indicador de carga
            }
        };

        let intervalId = null;

        onMounted(() => {
            listDashboard(); // Ejecutar inmediatamente al montar
            // Configurar la ejecución cada 10 segundos
            intervalId = setInterval(listDashboard, 10000);
        });

        onBeforeUnmount(() => {
            // Limpiar el intervalo cuando el componente se desmonte
            if (intervalId) {
                clearInterval(intervalId);
            }
        });

        return {
            listDashboard,
            detail_gps_provider,
            loading
        };
    }
};
</script>

<style scoped></style>
