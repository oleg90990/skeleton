import { GameObjects, Scene } from 'phaser'
import { PlayerInfo, DirectionOffset, Spritesheet } from './types'
import { MotionEnum, DirectionEnum } from './enums'
import { isIntersectionWater } from '@/game/Intersection'
import { setAttack } from '@/game/Client'

class Player extends GameObjects.Image {
    public directionOffset: DirectionOffset;
    public info: PlayerInfo
    public motionKey: MotionEnum
    public directionKey: DirectionEnum
    public f: number
    public spritesheet: Spritesheet

    constructor(scene: Scene, x: number, y: number, spritesheet: Spritesheet, info?: PlayerInfo) {
        super(scene, x, y, spritesheet.sprite)
        this.spritesheet = spritesheet
        this.info = info ? info : Object.assign({}, spritesheet.info)
        this.motionKey = MotionEnum.idle
        this.directionKey = DirectionEnum.west
        this.f = this.motion.startFrame
        this.depth = 2
        this.directionOffset = {
          x: 0, y: 0
        }
        this.scene.time.delayedCall(100, this.changeFrame, [], this)
    }

    get motion() {
      return this.spritesheet.motions[this.motionKey]
    }

    get direction() {
      return this.spritesheet.offsets[this.directionKey]
    }

    get area() {
      return new Phaser.Geom.Circle(
        this.x + 0,
        this.y + 20,
        35,
      )
    }

    get areaAttack() {
      return new Phaser.Geom.Circle(
        this.x + this.directionOffset.x * 20,
        this.y + this.directionOffset.y * 20,
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

      if (this.motionKey == MotionEnum.attack) {
        if (this.motion.attack === this.f) {
          setAttack()
        }
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
      this.info = Object.assign({}, info)
    }

    public move() {
      if (!isIntersectionWater(this)) {
        this.x += this.directionOffset.x * this.info.speed
        this.y += this.directionOffset.y * this.info.speed
      }
    }

    public removeHealth(health: number) {
      this.info.health -= health
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

export default Player
