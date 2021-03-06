import { GameObjects, Scene } from 'phaser'
import Player from '../Player'
import { AnimsEnum } from '../Player/types'

class Skeleton extends Player {
  public update() {
    // if (this.motion === AnimsEnum.walk) {
    //   this.setDirection(this.dir)
    // }
    this.setAnimation(this.motion)
    this.updateLine()
  }
}

export default Skeleton
