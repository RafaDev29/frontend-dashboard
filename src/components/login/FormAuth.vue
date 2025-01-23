<template>
    <div class="flex items-center justify-center min-h-screen bg-[#ffffff] p-4">
      <div class="w-full max-w-md bg-transparent shadow-none p-6">
        <div class="flex justify-center mb-4">
          <img :src="LogoImage" alt="Logo" class="w-[80px] h-[80px]">
        </div>
        <h1 class="text-lg text-[#030136] text-center mb-4 font-bold">¡Bienvenido de Nuevo!</h1>
        <p class="text-xs text-gray-900 text-center mb-4">
          Ingresa tus credenciales
        </p>
        <v-form ref="loginForm" @submit.prevent="validateLogin">
          <v-text-field
            v-model="username"
            label="Usuario"
            prepend-inner-icon="mdi-account-outline"
            variant="outlined"
            color="#030136"
            class="text-black w-full mb-4"
            :error="usernameError"
            :error-messages="usernameError ? ['El campo Usuario es obligatorio'] : []"
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Contraseña"
            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            :type="showPassword ? 'text' : 'password'"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            color="#030136"
            class="text-black w-full mb-4"
            @click:append-inner="togglePasswordVisibility"
            :error="passwordError"
            :error-messages="passwordError ? ['El campo Contraseña es obligatorio'] : []"
          ></v-text-field>
          <v-btn type="submit" color="#030136" class="w-full mt-4 font-bold text-white">Ingresar</v-btn>
        </v-form>
        <div class="mt-8 text-gray-400 text-sm text-center">
          <p class="font-semibold">
            Retransmisiones
          </p>
          <p>
            de posicionamiento gps
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import logoImage from '@/assets/login/icono.png';
  
  export default {
    setup(_, { emit }) {
      const username = ref('');
      const password = ref('');
      const showPassword = ref(false);
      const usernameError = ref(false);
      const passwordError = ref(false);
  
      const validateLogin = () => {
        usernameError.value = !username.value;
        passwordError.value = !password.value;
  
        if (!usernameError.value && !passwordError.value) {
          const data = {
            username: username.value,
            password: password.value,
          };
          emit('validate-login', data);
        }
      };
  
      const togglePasswordVisibility = () => {
        showPassword.value = !showPassword.value;
      };
  
      return {
        username,
        password,
        showPassword,
        usernameError,
        passwordError,
        validateLogin,
        togglePasswordVisibility,
        LogoImage: logoImage,
      };
    },
  };
  </script>
  
  <style scoped>
  /* No se requiere mucho CSS adicional con Tailwind CSS aplicado directamente */
  </style>