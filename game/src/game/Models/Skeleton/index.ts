import { GameObjects, Scene } from 'phaser'
import Player from '../Player'

class Skeleton extends Player {
  public update() {
    this.updateLine()
  }
}

export default Skeleton
