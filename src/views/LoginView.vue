<template>
    <div class="containerlogin relative flex items-start h-screen">
      <!-- Capa de color sobre la imagen de fondo -->
      <div class="overlay absolute inset-0 bg-[#030136] opacity-70"></div>
  
      <!-- Formulario alineado a la izquierda y ocupando toda la altura -->
      <transition name="slide-fade">
        <div
          v-if="showForm"
          class="form-wrapper relative w-full sm:w-3/4 md:w-2/4 lg:w-1/4 h-full text-white shadow-lg"
        >
          <div class="formLogin h-full flex flex-col justify-center">
            <FormAuthVue @validate-login="onValidateLogin" />
          </div>
        </div>
      </transition>
    </div>
    <!-- <LoadingIndicator :isLoading="isLoading" /> -->
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import FormAuthVue from '@/components/login/FormAuth.vue';
 
  // import LoadingIndicator from '@/components/alerts/alertLoading.vue';
  import store from '@/store';

  export default {
    components: {
      FormAuthVue,
      //LoadingIndicator
    },
    setup() {
      const messageError = ref('');
      const statusError = ref(false);
      const showForm = ref(false);
      const router = useRouter();
      const route = useRoute();
      //const isLoading = ref(false);
      
  
  
      const onValidateLogin = async (data) => {
        //isLoading.value = true;
        console.log("DATOS CREDENTIALS",data)
  
          const user=  data.username
          const pass= data.password
       
          
         if(user ==="apm" && pass==="apm4$"){
        
          store.commit('setUsername', user);
       //   store.commit('setToken', token.token);
          store.commit('setRole', 'admin');
          store.commit('setIsAuthenticated', true);
  
          router.push('/');


         }else{
          console.log("error al autenticarte")
         }
    
    }

    console.log(store.state.role)
  
      onMounted(() => {
        const username = route.query.username;
        const password = route.query.password;
  
        if (username && password) {
          onValidateLogin({ username, password });
        }
  
        // Mostrar el formulario después de que el componente se monte
        showForm.value = true;
      });
  
      return {
        onValidateLogin,
        messageError,
        statusError,
        showForm,
        
        //isLoading
      };
    },
  };
  </script>
  
  <style scoped>
  .containerlogin {
    background-image: url('@/assets/login/background.jpg');
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 100%;
    position: absolute;
  }
  
  .slide-fade-enter-active {
    transition: all 1s ease;
  }
  .slide-fade-leave-active {
    transition: all 1s ease;
  }
  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateX(-100%);
    opacity: 0;
  }
  </style>