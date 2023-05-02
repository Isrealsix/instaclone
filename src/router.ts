import { createRouter, createWebHistory } from 'vue-router';
import HelloWorldVue from './components/HelloWorld.vue';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/",
			name: "quizes",
			component: HelloWorldVue
		}
	]
});

export default router;