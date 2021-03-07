<template>
  <div ref="root">
  </div>
</template>

<script>
  import { Game } from '../game';
  import Phaser from 'phaser'
  import { ref, onMounted, onUnmounted } from 'vue'

  export default {
    setup() {
      const root = ref(null)

      let game

      onMounted(() => {
        const config = {
          type: Phaser.WEBGL,
          width: window.innerWidth,
          height: window.innerHeight,
          backgroundColor: '#ababab',
          parent: root.value,
          scene: [ Game ]
        };

        game = new Phaser.Game(config);
      })

      onUnmounted(() => {
        console.log()
        game.destroy(true);
      })

      return {
        root
      }
    }
  }
</script>