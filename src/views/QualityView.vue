<template>
    <div class="mb-10 pb-10">
        <div class="flex flex-wrap space-x-1 mb-3 pb-3">
            <!-- Iterar sobre cada objeto en detail_gps_provider y renderizar un componente por objeto -->
            <TableProvider 
                v-for="(item, index) in detail_gps_provider" 
                :key="index" 
                :detail_gps_provider="item" 
            />
        </div>
    </div>
</template>

<script>
import { reactive, toRefs, ref, onMounted } from 'vue'

import { listQualityApi } from '@/api/QualityService'

import TableProvider from '@/components/quality/TableProvider.vue';

export default {
    components: {
        TableProvider,
    },
    setup() {
        const detail_gps_provider = ref([])

        const listDashboard = async () => {
            try {
                const response = await listQualityApi();
                if (response) {
                    // Asignar la lista de datos a detail_gps_provider
                    detail_gps_provider.value = response.data 
                }
            } catch (error) {
                console.log("error al mostrar", error)
            }
        }

        const state = reactive({
            count: 0,
        })

        onMounted(listDashboard)

        return {
            ...toRefs(state),
            listDashboard,
            detail_gps_provider
        }
    }
}
</script>

<style scoped></style>
