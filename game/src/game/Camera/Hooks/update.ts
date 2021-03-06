import { player } from '@/game/Models/Player'

export default function (this: Phaser.Scene) {
  if (player) {
    this.cameras.main.scrollX = player.x - window.innerWidth / 2
    this.cameras.main.scrollY = player.y - window.innerHeight / 2
  }
}