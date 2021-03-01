<template>
  <div ref="root">
  </div>
</template>

<script>
  import { Game } from '../game/Game';
  import Phaser from 'phaser'
  import { ref, onMounted } from 'vue'

  export default {
    setup() {
      const root = ref(null)

      onMounted(() => {
        const config = {
          type: Phaser.WEBGL,
          width: window.innerWidth,
          height: window.innerHeight - 5,
          backgroundColor: '#ababab',
          parent: root.value,
          scene: [ Game ]
        };

        new Phaser.Game(config);
      })

      return {
        root
      }
    }
  }
</script>