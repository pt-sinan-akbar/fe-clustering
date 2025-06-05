import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AlgorithmView from '../views/AlgorithmView.vue'

const routes = [
	{
		path: '/',
		name: 'home',
		component: HomeView,
	},
	{
		path: '/algorithms/:algorithm',
		name: 'algorithm',
		component: AlgorithmView,
		props: true,
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

export default router
