import { onInitEnemy, initPlayer, updateEnemy, disconect, bonuses, onEnemyAttack } from '@/game/Client'
import Enemy from './enemy'
import setPlayer from '@/game/Models/Player/Actions/set'
import AttackPlayer from '@/game/Models/Player/Actions/attack'
import { PlayerStatus } from '@/game/Client/types'
import Spritesheets from '@/game/Models/Player/Spritesheets'
import { player } from '@/game/Models/Player'
import { getBonusesArray } from '@/game/Models/Heart'
import { intersectionPlayerEnemy, intersectionPlayerAttackEnemy } from '@/game/Intersection'

let enemies: any = {}

export default {
  create: function (this: Phaser.Scene) {
    onInitEnemy((status: PlayerStatus) => {
      if (status.id && !enemies[status.id]) {
        enemies[status.id] = this.add.existing(
          new Enemy(this, status.x, status.y, Spritesheets[status.sprite], status.info)
        )

        if (player) {
          initPlayer(player)
          bonuses(getBonusesArray())
        }
      }
    })

    updateEnemy((status: PlayerStatus) => {
      if (status.id && enemies[status.id]) {
        const enemy = enemies[status.id] as Enemy

        setPlayer(enemy, status)

        // if (player) {
        //   intersectionPlayerEnemy(player, enemy)
        //   intersectionPlayerAttackEnemy(player, enemy)
        // }
      }
    })

    disconect((id: string) => {
      if (enemies[id]) {
        enemies[id].destroy()
        delete enemies[id]
      }
    })

    onEnemyAttack((id: string) => {
      if (player && intersectionPlayerAttackEnemy(player, enemies[id])) {
        AttackPlayer(player)
      }
    })
  }
}