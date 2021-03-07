import { onInitEnemy, initPlayer, updateEnemy, disconect, bonuses } from '@/game/Client'
import Player from '@/game/Models/Player/player'
import setPlayer from '@/game/Models/Player/Actions/set'
import { PlayerStatus } from '@/game/Client/types'
import Spritesheets from '@/game/Models/Player/Spritesheets'
import { player } from '@/game/Models/Player'
import { getBonusesArray } from '@/game/Models/Heart'

let enemies: any = {}

export default {
  create: function (this: Phaser.Scene) {
    onInitEnemy((status: PlayerStatus) => {
      if (status.id && !enemies[status.id]) {
        enemies[status.id] = this.add.existing(
          new Player(this, status.x, status.y, Spritesheets[status.sprite], status.info)
        )

        if (player) {
          initPlayer(player)
          bonuses(getBonusesArray())
        }
      }
    })

    updateEnemy((status: PlayerStatus) => {
      if (status.id && enemies[status.id]) {
        const enemy = enemies[status.id] as Player
        setPlayer(enemy, status)
      }
    })

    disconect((id: string) => {
      if (enemies[id]) {
        enemies[id].destroy()
        delete enemies[id]
      }
    })
  }
}