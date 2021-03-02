import { GameObjects, Scene } from 'phaser'
import Anims from './anims'
import Directions from './directions'
import { AnimsEnum } from './types'
import isIntersectionMap from '@/game/Helpers/isIntersectionMap'
import { 
  AnimationItem,
  DirectionEnum,
  DirectionItem,
} from '@/game/types'
import Socket from '@/game/Helpers/Socket'
import Skeleton from '../Skeleton'

class Player extends GameObjects.Image {
    private startX: number
    private startY: number
    private anim: AnimationItem
    private direction: DirectionItem
    private directionKey: DirectionEnum  
    private speed: number
    private f: number
    private motion: AnimsEnum
    private socket: Socket
    private powerArea: number
    private power: number
    private health: number

    constructor(scene: Scene, x: number, y: number, motion: AnimsEnum, direction: DirectionEnum, socket: Socket) {
        super(scene, x, y, 'skeleton')

        this.health = 100;
        this.power = 10;
        this.powerArea = 30;

        this.startX = x
        this.startY = y

        this.anim = Anims[motion]
        this.direction = Directions[direction]
        this.directionKey = direction
        this.speed = 1
        this.f = this.anim.startFrame
        this.depth = y + 64
        this.motion = motion
        this.socket = socket

        this.scene.time.delayedCall(100, this.changeFrame, [], this)
    }

    getHealth() {
      return this.health
    }

    getPower() {
      return this.power
    }

    getRect() {
      return new Phaser.Geom.Rectangle(
        this.x,
        this.y,
        50,
        50
      )
    }

    getRectAttack() {
      return new Phaser.Geom.Rectangle(
        this.x + this.direction.x * 15,
        this.y + this.direction.y * 15,
        this.powerArea,
        this.powerArea
      )
    }

    changeFrame ()
    {
        this.f++

        if (this.f === this.anim.endFrame)
        {
          if (this.motion !== AnimsEnum.die) {
            this.f = this.anim.startFrame
          } else {
            this.f = this.anim.endFrame - 1
          }
        }
        else
        {
            this.frame = this.texture.get(this.direction.offset + this.f)
        }

        this.scene.time.delayedCall(100, this.changeFrame, [], this)
    }

    emitIo() {
      this.socket.emit({
        direction: this.directionKey,
        motion: this.motion,
        x: this.x,
        y: this.y
      })
    }

    setAnimation(newMotion: AnimsEnum) {
        if (this.motion !== newMotion) {
            this.anim = Anims[newMotion]
            this.motion = newMotion
            this.f = this.anim.startFrame
            this.frame = this.texture.get(this.direction.offset + this.f)
            this.emitIo()
        }
    }

    setDirection(key: DirectionEnum) {
      this.directionKey = key
      this.direction = Directions[key]
      this.emitIo()
    }

    isDown(key: string): boolean {
      return this.scene
        .input
        .keyboard
        .addKey(key)
        .isDown
    }

    updateDirection() {
      if (!isIntersectionMap(this, this.direction, this.speed)) {
        this.x += this.direction.x * this.speed
        this.y += this.direction.y * this.speed
      }
    }

    update ()
    {
      const isDownW = this.isDown('W')
      const isDownD = this.isDown('D')
      const isDownS = this.isDown('S')
      const isDownA = this.isDown('A')
      const isDownR = this.isDown('R')
      const isDownSPACE = this.isDown('SPACE')

      if (isDownR) {
        this.setAnimation(AnimsEnum.idle)
        this.health = 100
      }


      if (this.isDie()) {
        return;
      }

      if (isDownW && !isDownD && !isDownS && !isDownA) { //w
          this.setDirection(DirectionEnum.north)
          this.updateDirection()
          this.setAnimation(AnimsEnum.walk)
      } if (isDownW && isDownD && !isDownS && !isDownA) { // wd
          this.setDirection(DirectionEnum.northEast)
          this.updateDirection()
          this.setAnimation(AnimsEnum.walk)
      } if (!isDownW && isDownD && !isDownS && !isDownA) { // d
          this.setDirection(DirectionEnum.east)
          this.updateDirection()
          this.setAnimation(AnimsEnum.walk)
      } if (!isDownW && isDownD && isDownS && !isDownA) { //ds
          this.setDirection(DirectionEnum.southEast)
          this.updateDirection()
          this.setAnimation(AnimsEnum.walk)
      } if (!isDownW && !isDownD && isDownS && !isDownA) { //s
          this.setDirection(DirectionEnum.south)
          this.updateDirection()
          this.setAnimation(AnimsEnum.walk)
      } if (!isDownW && !isDownD && isDownS && isDownA) { //sa
          this.setDirection(DirectionEnum.southWest)
          this.updateDirection()
          this.setAnimation(AnimsEnum.walk)
      } if (!isDownW && !isDownD && !isDownS && isDownA) { // a
          this.setDirection(DirectionEnum.west)
          this.updateDirection()
          this.setAnimation(AnimsEnum.walk)
      } if (isDownW && !isDownD && !isDownS && isDownA) { //aw
          this.setDirection(DirectionEnum.northWest)
          this.updateDirection()
          this.setAnimation(AnimsEnum.walk)
      }

      if (!isDownW && !isDownD && !isDownS && !isDownA && isDownSPACE) {
        this.setAnimation(AnimsEnum.attack)
      }

      if (!isDownW && !isDownD && !isDownS && !isDownA && !isDownSPACE) {
          this.setAnimation(AnimsEnum.idle)
      }
    }

    intersectionSkeleton(skeleton: Skeleton) {

    }

    attackSkeleton(skeleton: Skeleton) {
      this.health -= skeleton.getPower()

      if (this.isDie()) {
        this.setAnimation(AnimsEnum.die)
      }
    }

    isDie() {
      return this.health <= 0
    }
}

export default Player