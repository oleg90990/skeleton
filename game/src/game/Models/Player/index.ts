import Skeleton from './Skeleton'
import { ServiceInterface } from '@/game/types'
import isDown from '@/game/Helpers/isDown'
import { isDownMouse } from '@/game/Helpers/mousePointer'

//Actions
import Move from './Actions/move'
import Reset from './Actions/reset'
import Attack from './Actions/attack'
import Idle from './Actions/idle'
import Direction from './Actions/direction'

export let player: Skeleton | undefined = undefined

export default {
  execute: function (this: Phaser.Scene) {
    player = this.add.existing(
      new Skeleton(this)
    )
  },
  preload: function (this: Phaser.Scene) {
    this.load.spritesheet('skeleton', require('@/assets/skeleton.png'), {
      frameWidth: 128,
      frameHeight: 128,
    })
    // this.Afewload.spritesheet('zombie', require('@/assets/zombie.png'), {
    //   frameWidth: 128,
    //   frameHeight: 128,
    // })
  },
  update: function (this: Phaser.Scene) {
    if (!player) {
      return
    }

    if (isDown(this, 'R') && player.isDie()) {
        Reset(player)
    }

    if (player.isDie()) {
      return;
    }

    if (!isDown(this, 'SPACE') && isDownMouse(this)) {
      Move(player)
    }

    if (isDown(this, 'SPACE')) {
      Attack(player)

      if (isDownMouse(this)) {
        Direction(player)
      }
    }

    if (!isDownMouse(this) && !isDown(this, 'SPACE')) {
      Idle(player)
    }
  },
}