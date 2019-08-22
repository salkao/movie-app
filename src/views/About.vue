<template>
  <v-container
      class="pa-2"
      fluid>
      <v-row>
        <v-col lg="4"
          v-for="(favourite, i) in favourites"
          :key="i">
          <router-link :to="link(favourite)">
            <v-card light>
              <v-list-item three-line>
              <v-list-item-content class="align-self-start">
                <v-list-item-title
                  class="headline mb-2"
                  v-text="favourite.title">
                </v-list-item-title>
                <v-list-item-subtitle v-text="'Rating: '+favourite.rating"></v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-avatar
                size="125"
                tile>
                <v-img :src="favourite.cover"></v-img>
              </v-list-item-avatar>
            </v-list-item>
          </v-card>
        </router-link>
        </v-col>
      </v-row>
  </v-container>
</template>

<script>
const firebase = require('firebase');

export default {
  data() {
    return {
      sort: true,
      db: firebase.firestore(),
      favourites: [],
    };
  },
  methods: {
    fav() {
      const favArray = [];
      this.db.collection('favourites').get().then((q) => {
        q.forEach(doc => this.favourites.push(doc.data()));
      });
    },
    link(favourite) {
      console.log(favourite);
      return `/movies/${favourite.id}`;
    },
  },
  computed: {
  },
  created() {
    this.fav();
  },
};
</script>
<style lang="scss" scoped>
</style>
