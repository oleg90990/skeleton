import { player } from '@/game/Models/Player'

let text: any = {}

export default {
  create: function(this: Phaser.Scene) {
    text = this.add.text(
      this.cameras.main.scrollX,
      this.cameras.main.scrollY,
      'Health: 0'
    );
  },
  update: function(this: Phaser.Scene) {
    if (player) {
      text.destroy()
      text = this.add.text(
        this.cameras.main.scrollX + 15,
        this.cameras.main.scrollY + 10,
        `Health: ${player.info.health <= 0 ? 0 : player.info.health.toFixed(0)}`
      );
    }
  },
}