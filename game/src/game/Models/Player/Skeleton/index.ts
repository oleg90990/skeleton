import { GameObjects, Scene } from 'phaser'
import { info } from './config'
import { PlayerInfo, DirectionOffset } from '../types'
import { MotionEnum, DirectionEnum } from '../enums'
import Motions from './motions'
import Directions from './directions'
import { container } from '@/game/services'

class Skeleton extends GameObjects.Image {
    public info: PlayerInfo
    public motionKey: MotionEnum
    public directionKey: DirectionEnum
    private f: number
    private directionOffset: DirectionOffset;

    constructor(scene: Scene) {
        super(scene, -300, 900, 'skeleton')

        this.info = info
        this.motionKey = MotionEnum.idle
        this.directionKey = DirectionEnum.west

        this.f = this.motion.startFrame

        this.directionOffset = {
          x: 0, y: 0
        }

        this.scene.time.delayedCall(100, this.changeFrame, [], this)
    }

    get motion() {
      return Motions[this.motionKey]
    }

    get direction() {
      return Directions[this.directionKey]
    }

    get area() {
      return new Phaser.Geom.Circle(
        this.x + 0,
        this.y + 20,
        30,
      )
    }

    get areaAttack() {
      return new Phaser.Geom.Circle(
        this.x + this.directionOffset.x * this.info.powerArea,
        this.y + this.directionOffset.y * this.info.powerArea,
        this.info.powerArea,
      )
    }

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

    public setMotion(newMotion: MotionEnum) {
      if (this.motionKey !== newMotion) {
        this.motionKey = newMotion
        this.f = this.motion.startFrame
        this.frame = this.texture.get(this.direction + this.f)
      }
    }

    public setDirectionOffset(directionOffset: DirectionOffset) {
      this.directionOffset = directionOffset
    }

    public setDirection(directionKey: DirectionEnum) {
      this.directionKey = directionKey
    }

    public setPoint(x: number, y: number) {
      this.x = x
      this.y = y
    }

    public setPlayerInfo(info: PlayerInfo) {
      this.info = info
    }

    public move() {
      // if (!isIntersectionMap(this, this.scene as Game)) {
        this.x += this.directionOffset.x * this.info.speed
        this.y += this.directionOffset.y * this.info.speed
      // }
    }

    public removeHealth(health: number) {
      this.info.health += health
    }

    public addHealth(health: number) {
      this.info.health += health
    }

    public isDie() {
      return this.info.health <= 0
    }

    public destroy() {
      super.destroy()
    }
}

export default Skeleton
