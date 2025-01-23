<template>

    <div class="mb-10 pb-10">
        <div class="flex justify-between space-x-1 mb-3 pb-3">
            <componentPlots :data="data" />
            <componentVendor :data="data" />
            <ComponentPlates :data="data" />
            <ComponentProvidergps :data="data" />

        </div>

        <div class="flex justify-between space-x-1 mb-3 pb-3">

            <TableVendor :vendorsDetail="vendorsDetail" />
            <TablePlates :detail_plates="detail_plates" />
            <TableProvider :detail_gps_provider="detail_gps_provider" />
        </div>

        <GrafitVendor :vendorsDetail="vendorsDetail" />

    </div>
</template>

<script>
import { reactive, toRefs, ref, onMounted } from 'vue'
import componentPlots from '@/components/dashboard/ComponentPlots.vue'
import componentVendor from '@/components/dashboard/ComponentVendor.vue'
import { listDashboardApi } from '@/api/DashboardService'
import ComponentPlates from '@/components/dashboard/ComponentPlates.vue';
import ComponentProvidergps from '@/components/dashboard/ComponentProvidergps.vue';
import TableVendor from '@/components/dashboard/TableVendor.vue';
import TableProvider from '@/components/dashboard/TableProvider.vue';
import TablePlates from '@/components/dashboard/TablePlates.vue';
import GrafitVendor from '@/components/dashboard/GrafitVendor.vue';
export default {
    components: {
        componentPlots,
        componentVendor,
        ComponentPlates,
        ComponentProvidergps,
        TableVendor,
        TableProvider,
        TablePlates,
        GrafitVendor
    },
    setup() {

        const data = ref(null)
        const vendorsDetail = ref([])
        const detail_plates = ref([])
        const detail_gps_provider = ref([])


        const listDashboard = async () => {
            try {
                const response = await listDashboardApi();
                if (response) {
                    data.value = response.data
                    vendorsDetail.value = response.data.summary_table.detail_vendors
                    detail_plates.value  = response.data.summary_table.detail_plates
                    detail_gps_provider.value = response.data.summary_table.detail_gps_provider
                }
            } catch (error) {
                console.log("error al mostrar")
            }

        }

        const state = reactive({
            count: 0,
        })

        onMounted(listDashboard)

        return {
            ...toRefs(state),
            listDashboard,
            data,
            vendorsDetail,
            detail_plates,
            detail_gps_provider
        }
    }
}

</script>
<style scoped></style>