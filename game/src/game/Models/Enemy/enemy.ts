import Player from '@/game/Models/Player/player'

class Enemy extends Player {
  public changeFrame() {
    this.f++

    if (this.f === this.motion.endFrame) {
      if (this.motion.once === undefined || !this.motion.once) {
        this.f = this.motion.startFrame
      } else {
        this.f = this.motion.endFrame - 1
      }
    } else {
      this.frame = this.texture.get(this.direction + this.f)
    }

    if (this.scene) {
      this.scene.time.delayedCall(100, this.changeFrame, [], this)
    }
  }
}

export default Enemy
