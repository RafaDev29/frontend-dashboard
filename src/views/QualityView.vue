<template>
    <componentPlots/>
    </template>
    
    <script>
    import { reactive, toRefs } from 'vue'
    import componentPlots from '@/components/dashboard/ComponentPlots.vue'
    
    export default {
        components :{
        componentPlots
    },
        setup () {
            const state = reactive({
                count: 0,
            })
        
            return {
                ...toRefs(state),
            }
        }
    }
    
    </script>
    <style scoped>
    </style>