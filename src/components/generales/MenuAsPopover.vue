<template>
    <div class="text-center">
        <v-menu v-model="menu" :close-on-content-click="false" location="end" @click:outside="rotateIcon">
            <template v-slot:activator="{ props }">
                <v-btn icon="mdi-chevron-down" size="small" variant="text" v-bind="props" :class="{ 'rotated': isRotated }"
                    @click="rotateIcon"></v-btn>
            </template>

            <v-card min-width="200">
                <v-list>
                    <v-list-item :prepend-avatar="avatarPath" :title="username" :subtitle="rol">
                        <template v-slot:append>
                        </template>
                    </v-list-item>
                </v-list>

                <v-divider></v-divider>
                <v-list>
                    <v-list-item v-if="rol == 'Estudiante'" class="px-5">
                        <div class="cursor-pointer transition hover:text-blue-300
                        ease-in duration-100 flex gap-2 rounded-lg items-center text-gray-400 text-sm">
                            <i class="fa-solid fa-user"></i>
                            <router-link href="/perfil" to="/perfil"> <span> Perfil</span></router-link> 
                        </div>
                    </v-list-item>
                </v-list>
                <v-divider></v-divider>
                <v-list>
                    <v-list-item class="px-3">
                        <div class="py-2 px-5 bg-red-400 hover:bg-red-500 cursor-pointer transition 
                        ease-in duration-100 flex justify-between rounded-lg items-center text-white text-sm"
                            @click="logout">
                            <span> Cerrar sesión</span>
                            <i class="fa-solid fa-right-from-bracket"></i>
                        </div>
                    </v-list-item>
                </v-list>
            </v-card>
        </v-menu>
    </div>
</template>
<script>
import { ref } from "vue";

export default {
    props: {
        username: String,
        rol: String,
        avatarPath: String
    },
    data: () => ({
        fav: true,
        menu: false,
        message: false,
        hints: true
    }),
    setup() {
        const isRotated = ref(false);

        const rotateIcon = () => {
            isRotated.value = !isRotated.value;
        };
        const logout = () => {
            localStorage.clear();
            location.reload();
        }

        return {
            logout,
            rotateIcon,
            isRotated
        }
    }
}
</script>
<style lang="scss">
i {
    transition: transform 0.3s ease;
    /* Agrega esta línea */
}

.rotated {
    transform: rotate(180deg);
}

.v-list-item__content {
    .v-list-item-title {
        font-size: 0.8rem !important;
    }

    .v-list-item-subtitle {
        font-size: 0.8rem !important;
    }
}
</style>