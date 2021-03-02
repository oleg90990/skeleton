import { GameObjects, Scene } from 'phaser'
import Anims from '@/game/Models/Player/anims'
import Directions from '@/game/Models/Player/directions'
import { AnimsEnum } from '@/game/Models/Player/types'
import isIntersectionMap from '@/game/Helpers/isIntersectionMap'
import { 
  AnimationItem,
  DirectionEnum,
  DirectionItem,
} from '@/game/types'

class Skeleton extends GameObjects.Image {
    private startX: number
    private startY: number
    private anim: AnimationItem
    private direction: DirectionItem
    private directionKey: DirectionEnum
    private speed: number
    private f: number
    private motion: AnimsEnum
    private powerArea: number
    private power: number
    private health: number

    constructor(scene: Scene, x: number, y: number, motion: AnimsEnum, direction: DirectionEnum) {
        super(scene, x, y, 'skeleton')

        this.power = 10
        this.powerArea = 30
        this.health = 100

        this.startX = x
        this.startY = y

        this.anim = Anims[motion]
        this.direction = Directions[direction]
        this.speed = 1
        this.f = this.anim.startFrame
        this.depth = y + 64
        this.motion = motion
        this.directionKey = direction

        this.scene.time.delayedCall(100, this.changeFrame, [], this)
    }

    getHealth() {
      return this.health
    }

    getPower() {
      return this.power
    }

    getMotion() {
      return this.motion
    }

    getDirection() {
      return this.directionKey
    }

    getRectAttack() {
      return new Phaser.Geom.Rectangle(
        this.x + this.direction.x * 15,
        this.y + this.direction.y * 15,
        this.powerArea,
        this.powerArea
      )
    }

    getRect() {
      return new Phaser.Geom.Rectangle(
        this.x,
        this.y,
        50,
        50
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

    setAnimation(newMotion: AnimsEnum) {
        if (this.motion !== newMotion) {
            this.anim = Anims[newMotion]
            this.motion = newMotion
            this.f = this.anim.startFrame
            this.frame = this.texture.get(this.direction.offset + this.f)
        }
    }

    setDirection(key: DirectionEnum) {
      this.direction = Directions[key]
    }

    updateDirection() {
      if (!isIntersectionMap(this, this.direction, this.speed)) {
        this.x += this.direction.x * this.speed
        this.y += this.direction.y * this.speed
      }
    }

    set (x: number, y: number, motion: AnimsEnum, direction: DirectionEnum)
    {
      this.x = x;
      this.y = y;
      this.setDirection(direction)
      this.updateDirection()
      this.setAnimation(motion)
    }
}

export default Skeleton