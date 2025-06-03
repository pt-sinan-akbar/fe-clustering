import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AlgorithmView from '../views/AlgorithmView.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
		},
		{
			path: '/algorithm',
			name: 'algorithm',
			component: AlgorithmView,
		}
	],
})

export default router
