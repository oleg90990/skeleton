import Player from '@/game/Models/Player'
import Scene from '@/game'

export default function (scene: Scene, main: Phaser.Cameras.Scene2D.Camera, player: Player) {
  if (player) {
    main.scrollX = player.x - window.innerWidth / 2
    main.scrollY = player.y - window.innerHeight / 2
  }
}
