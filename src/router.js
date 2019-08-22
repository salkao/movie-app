import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Movie from './views/Movie.vue';
import yearSort from './views/yearSort.vue';
import likesSort from './views/likesSort.vue';
import search from './views/search.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/movies/:id',
      name: 'movie',
      component: Movie,
    },
    {
      path: '/yearSort',
      name: 'yearSort',
      component: yearSort,
    },
    {
      path: '/likesSort',
      name: 'likesSort',
      component: likesSort,
    },
    {
      path: '/search/:parameter',
      name: 'search',
      component: search,
    },
  ],
});
