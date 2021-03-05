import { GameObjects, Scene } from 'phaser'
import Motions from './motions'
import Directions from './directions'
import { AnimsEnum, PlayerInfo } from './types'
import isDown from '@/game/Helpers/isDown'
import { isDownMouse, getDirection, getPosition } from '@/game/Helpers/mousePointer'
import {
  AnimationItem,
  DirectionEnum,
  DirectionItem,
  EmitRequestInterface,
} from '@/game/types'
import Skeleton from '../Skeleton'
import isIntersectionMap from '@/game/Helpers/isIntersectionMap'
import Game from '@/game'

class Player extends GameObjects.Image {
    public line: any
    public motion: AnimsEnum
    public dir: DirectionEnum
    public info: PlayerInfo
    private f: number

    constructor(scene: Scene) {
        super(scene, 0, 0, 'skeleton')

        this.info = {
          health: 1000,
          power: 1,
          powerArea: 30,
          speed: 1,
        }

        this.motion = AnimsEnum.idle
        this.dir = DirectionEnum.west

        this.f = this.animation.startFrame
        this.scene.time.delayedCall(100, this.changeFrame, [], this)

        this.line = this.scene.add.line(
          0, 0, 60, 0, 0, 0,
          0xff0000
        );
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

    get rectAttack() {
      return new Phaser.Geom.Rectangle(
        this.x + this.direction.x * 15,
        this.y + this.direction.y * 15,
        this.info.powerArea,
        this.info.powerArea,
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

    public updateLine() {
      let length = this.info.health / 2
      this.line.x = this.x - (length - 64) / 2
      this.line.y = this.y - 40
      this.line.setTo(length, 0, 0, 0);
    }

    public reset() {
      const any: any = this.scene
      const pos = any.getRandPosition()
      this.x = pos.x
      this.y = pos.y
      this.setAnimation(AnimsEnum.idle)
      this.info.health = 100
      this.setDepth(100)
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

    public setDirection() {
      this.dir = getDirection(this)
      if (!isIntersectionMap(this, this.scene as Game)) {
        const { x, y } = getPosition(this)
        this.x += x * this.info.speed
        this.y += y * this.info.speed
      }
    }

    public update() {
      const isDownR = isDown(this.scene, 'R')
      const isDownSPACE = isDown(this.scene, 'SPACE')

      if (isDownR && this.isDie()) {
        this.reset()
      }

      if (this.isDie()) {
        return;
      }

      if (isDownMouse(this) && !isDownSPACE) {
        this.setAnimation(AnimsEnum.walk)
        this.setDirection()
      } 

      if (isDownSPACE) {
        this.setAnimation(AnimsEnum.attack)
      }

      if (!isDownMouse(this) && !isDownSPACE) {
        this.setAnimation(AnimsEnum.idle)
      }

      this.updateLine()
    }

    public set(x: number, y: number, motion: AnimsEnum, direction: DirectionEnum, info: PlayerInfo) {
      this.setAnimation(motion)
      this.dir = direction
      this.x = x;
      this.y = y;
      this.info = info
    }

    public setAttack(power: number) {
      this.info.health -= power

      if (this.isDie()) {
        this.setAnimation(AnimsEnum.die)
        this.setDepth(0)
      }
    }

    public addHealth(health: number) {
      this.info.health += health
    }

    public isDie() {
      return this.info.health <= 0
    }

    public destroy() {
      this.line.destroy()
      super.destroy()
    }
}

export default Player
