import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import UserProfileView from '@/views/users/UserProfileView.vue'
import EditUserProfileView from '@/views/users/EditUserProfileView.vue'
import VisitsLogView from '@/views/visits/VisitsLogView.vue'
import MapView from '@/views/map/MapView.vue'
import DeceasedDetailView from '@/views/deceased/DeceasedDetailView.vue'
import RegisterVisitView from '@/views/visits/RegisterVisitView.vue'
import AdminDashboardView from '@/views/admin/AdminDashboardView.vue'
import DeceasedSearchView from '@/views/deceased/DeceasedSearchView.vue'
import RegisterAndEditDeceasedView from '@/views/deceased/RegisterAndEditDeceasedView.vue'
import OwnersAdministrationView from '@/views/admin/OwnersAdministrationView.vue'
import GravesAdministrationView from '@/views/admin/GravesAdministrationView.vue'
import SystemLogView from '@/views/admin/SystemLogView.vue'
import RegisterRepairView from '@/views/admin/RegisterRepairView.vue'
import RepairsAdministrationView from '@/views/admin/RepairsAdministrationView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/profile',
    name: 'profile',
    component: UserProfileView
  },
  {
    path: '/editProfile',
    name: 'editProfile',
    component: EditUserProfileView
  },
  {
    path: '/visits',
    name: 'visits',
    component: VisitsLogView
  },
  {
    path: '/map',
    name: 'map',
    component: MapView
  },
  {
    path: '/deceased/:id',
    name: 'deceased',
    component: DeceasedDetailView
  },
  {
    path: '/visit/:id',
    name: 'visit',
    component: RegisterVisitView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: AdminDashboardView
  },
  {
    path: '/deceased/search',
    name: 'searchDeceased',
    component: DeceasedSearchView
  },
  {
    path: '/deceased/register/:graveId',
    name: 'registerDeceased',
    component: RegisterAndEditDeceasedView
  },
  {
    path: '/deceased/edit/:id',
    name: 'editDeceased',
    component: RegisterAndEditDeceasedView
  },
  {
    path: '/owners',
    name: 'owners',
    component: OwnersAdministrationView
  },
  {
    path: '/graves',
    name: 'graves',
    component: GravesAdministrationView
  },
  {
    path: '/systemLog',
    name: 'systemLog',
    component: SystemLogView
  },
  {
    path: '/repair/register/:graveId',
    name: 'registerRepair',
    component: RegisterRepairView
  },
  {
    path: '/repairs',
    name: 'repairs',
    component: RepairsAdministrationView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
