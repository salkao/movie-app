import Vue from 'vue';
import vuetify from './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCRWBQrRDOmZ5x7Vn1MrGQ74VTbmbN34q0",
  authDomain: "movie-app-7cf00.firebaseapp.com",
  databaseURL: "https://movie-app-7cf00.firebaseio.com",
  projectId: "movie-app-7cf00",
  storageBucket: "movie-app-7cf00.appspot.com",
  messagingSenderId: "469192259681",
  appId: "1:469192259681:web:53ec836be7edc09d"
};
if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
