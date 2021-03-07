import Player from './player'
import { ServiceInterface } from '@/game/types'
import isDown from '@/game/Helpers/isDown'
import { isDownMouse } from '@/game/Helpers/mousePointer'
import Spritesheets from './Spritesheets'
import { getRandomGrass } from '@/game/Map'

//Actions
import Move from './Actions/move'
import Reset from './Actions/reset'
import Attack from './Actions/attack'
import Idle from './Actions/idle'
import Direction from './Actions/direction'

//Client
import { initPlayer, setStatus } from '@/game/Client'

export let player: Player | undefined = undefined

export default {
  execute: function (this: Phaser.Scene) {
    const grass = getRandomGrass()

    player = this.add.existing(
      new Player(this, grass.x, grass.y, Spritesheets['minotaur'])
    )

    initPlayer(player)
  },
  preload: function (this: Phaser.Scene) {
    this.load.spritesheet('skeleton', require('@/assets/skeleton.png'), {
      frameWidth: 128,
      frameHeight: 128,
    })
    this.load.spritesheet('spider', require('@/assets/spider.png'), {
      frameWidth: 128,
      frameHeight: 128,
    })
    this.load.spritesheet('zombie', require('@/assets/zombie.png'), {
      frameWidth: 128,
      frameHeight: 128,
    })
    this.load.spritesheet('minotaur', require('@/assets/minotaur.png'), {
      frameWidth: 128,
      frameHeight: 128,
    })
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

    setStatus(player)
  },
}