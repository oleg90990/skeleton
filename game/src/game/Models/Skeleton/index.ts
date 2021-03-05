import { GameObjects, Scene } from 'phaser'
import Player from '../Player'

class Skeleton extends Player {
  public update() {
    this.setDirection(this.dir)
    this.setAnimation(this.motion)
    this.updateLine()
  }
}

export default Skeleton
