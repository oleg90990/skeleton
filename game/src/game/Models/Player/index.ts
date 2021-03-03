import { GameObjects, Scene } from 'phaser'
import Motions from './motions'
import Directions from './directions'
import { AnimsEnum, PlayerInfo } from './types'
import isIntersectionMap from '@/game/Helpers/isIntersectionMap'
import {
  AnimationItem,
  DirectionEnum,
  DirectionItem,
  EmitRequestInterface,
} from '@/game/types'
import Skeleton from '../Skeleton'

class Player extends GameObjects.Image {
    public motion: AnimsEnum
    public dir: DirectionEnum
    public info: PlayerInfo
    private f: number

    constructor(scene: Scene, x: number, y: number, motion: AnimsEnum, dir: DirectionEnum, info: PlayerInfo) {
        super(scene, x, y, 'skeleton')

        this.info = info
        this.motion = motion
        this.dir = dir

        this.f = this.animation.startFrame
        this.scene.time.delayedCall(100, this.changeFrame, [], this)
    }

    get animation() {
      return Motions[this.motion]
    }

    get direction() {
      return Directions[this.dir]
    }

    get rect() {
      return new Phaser.Geom.Rectangle(
        this.x,
        this.y,
        50,
        50,
      )
    }

    get request(): EmitRequestInterface {
      return {
        x: this.x,
        y: this.y,
        dir: this.dir,
        motion: this.motion,
        info: this.info,
      }
    }

    get rectAttack() {
      return new Phaser.Geom.Rectangle(
        this.x + this.direction.x * 15,
        this.y + this.direction.y * 15,
        this.info.powerArea,
        this.info.powerArea,
      )
    }

    public changeFrame() {
        this.f++

        if (this.f === this.animation.endFrame) {
          if (this.animation.once === undefined || !this.animation.once) {
            this.f = this.animation.startFrame
          } else {
            this.f = this.animation.endFrame - 1
          }
        } else {
          this.frame = this.texture.get(this.direction.offset + this.f)
        }

        if (this.scene) {
          this.scene.time.delayedCall(100, this.changeFrame, [], this)
        }
    }

    public setAnimation(newMotion: AnimsEnum) {
      if (this.motion !== newMotion) {
        this.motion = newMotion
        this.f = this.animation.startFrame
        this.frame = this.texture.get(this.direction.offset + this.f)
      }
    }

    public setDirection(dir: DirectionEnum) {
      this.dir = dir
      this.updateDirection()
    }

    public isDown(key: string): boolean {
      return this.scene
        .input
        .keyboard
        .addKey(key)
        .isDown
    }

    public updateDirection() {
      if (!isIntersectionMap(this, this.direction, this.info.speed)) {
        this.x += this.direction.x * this.info.speed
        this.y += this.direction.y * this.info.speed
      }
    }

    public update() {
      const isDownW = this.isDown('W')
      const isDownD = this.isDown('D')
      const isDownS = this.isDown('S')
      const isDownA = this.isDown('A')
      const isDownR = this.isDown('R')
      const isDownSPACE = this.isDown('SPACE')

      if (isDownR) {
        this.setAnimation(AnimsEnum.idle)
        this.info.health = 100
      }

      if (this.isDie()) {
        return;
      }

      if (isDownW && !isDownD && !isDownS && !isDownA) { // w
          this.setDirection(DirectionEnum.north)
          this.setAnimation(AnimsEnum.walk)
      }

      if (isDownW && isDownD && !isDownS && !isDownA) { // wd
          this.setDirection(DirectionEnum.northEast)
          this.setAnimation(AnimsEnum.walk)
      }

      if (!isDownW && isDownD && !isDownS && !isDownA) { // d
          this.setDirection(DirectionEnum.east)
          this.setAnimation(AnimsEnum.walk)
      }

      if (!isDownW && isDownD && isDownS && !isDownA) { // ds
          this.setDirection(DirectionEnum.southEast)
          this.setAnimation(AnimsEnum.walk)
      }

      if (!isDownW && !isDownD && isDownS && !isDownA) { // s
          this.setDirection(DirectionEnum.south)
          this.setAnimation(AnimsEnum.walk)
      }

      if (!isDownW && !isDownD && isDownS && isDownA) { // sa
          this.setDirection(DirectionEnum.southWest)
          this.setAnimation(AnimsEnum.walk)
      }

      if (!isDownW && !isDownD && !isDownS && isDownA) { // a
          this.setDirection(DirectionEnum.west)
          this.setAnimation(AnimsEnum.walk)
      }

      if (isDownW && !isDownD && !isDownS && isDownA) { // aw
          this.setDirection(DirectionEnum.northWest)
          this.setAnimation(AnimsEnum.walk)
      }

      if (!isDownW && !isDownD && !isDownS && !isDownA && isDownSPACE) {
        this.setAnimation(AnimsEnum.attack)
      }

      if (!isDownW && !isDownD && !isDownS && !isDownA && !isDownSPACE) {
          this.setAnimation(AnimsEnum.idle)
      }
    }

    public set(x: number, y: number, motion: AnimsEnum, direction: DirectionEnum, info: PlayerInfo) {
      this.x = x;
      this.y = y;
      this.info = info
      this.setDirection(direction)
      this.setAnimation(motion)
    }

    public intersectionSkeleton(skeleton: Skeleton) {
      return true;
    }

    public attackSkeleton(skeleton: Skeleton) {
      console.log(skeleton.info)
      this.info.health -= skeleton.info.power

      if (this.isDie()) {
        this.setAnimation(AnimsEnum.die)
      }
    }

    public isDie() {
      return this.info.health <= 0
    }
}

export default Player
