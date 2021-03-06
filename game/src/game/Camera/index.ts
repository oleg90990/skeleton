import create from './Hooks/create'
import update from './Hooks/update'

const set = function(this: Phaser.Scene, x: number, y: number) {
  // this.cameras.main.scrollY = y
  // this.cameras.main.scrollX = x
}

export default {
  create, update, set
}