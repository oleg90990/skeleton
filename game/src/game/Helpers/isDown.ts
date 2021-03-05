import { Scene } from 'phaser'

export default function (game: Scene, key: string) {
  return game.input
    .keyboard
    .addKey(key)
    .isDown
}