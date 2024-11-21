import { createRouter, createWebHistory } from '@ionic/vue-router';
import TabsPage from '../views/TabsPage.vue'
// Se importa el login 
import Login from '../views/LoginView.vue'
// Se importa el Storage 
import { Storage } from '@ionic/storage';
import InicioView from '../views/InicioView.vue';
import EnviosAllView from '../views/EnviosAllView.vue';


// Función que verifica la existencia del usuario en el storage,  
// para mantener o cerrar la sesión 
async function sesionActiva() {
  let storage = new Storage()
  await storage.create()
  let usuario = await storage.get('user')
  // Si existe retorna true, caso contrario false 
  return (usuario) ? true : false
}


const routes = [
  {
    path: '/',
    component: Login,
    // Se verifica la sesión antes de activar la ruta 
    beforeEnter: async (to, from, next) => {
      let res = await sesionActiva()
      if (res) {
        next('/tabs/inicio') // Redirección al componente AddStudent 
      } else {
        next() // Se muestra el componente 
      }
    }
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: 'inicio',
        component: InicioView,
        // Se verifica la sesión antes de activar la ruta 
        beforeEnter: async (to, from, next) => {
          let res = await sesionActiva()
          if (res) {
            next() // Se muestra el componente 
          } else {
            next('/') // Redirección al login 
          }
        }
      },{
        path: 'enviosAll',
        component: EnviosAllView,
        // Se verifica la sesión antes de activar la ruta 
        beforeEnter: async (to, from, next) => {
          let res = await sesionActiva()
          if (res) {
            next() // Se muestra el componente 
          } else {
            next('/') // Redirección al login 
          }
        }
      },
    ]
  }
]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
