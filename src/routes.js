import Home from './views/Home.vue';
import NotFound from './components/NotFound.vue';

/*https://router.vuejs.org/guide/essentials/dynamic-matching.html#catch-all-404-not-found-route
Used this syntax to catch any routes that do not match the routes defined here, and show the Not Found component in that case. */

export default [
	{ name: 'home', path: '/', component: Home },
	{ name: 'notFound', path: '/:pathMatch(.*)*', component: NotFound }
]
