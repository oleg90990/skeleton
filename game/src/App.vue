<template>
  <Game />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Game from './components/Game.vue';

@Options({
  components: {
    Game,
  },
})
export default class App extends Vue {
}

</script>

<style>
body {
  margin: 0px;
}
</style>
