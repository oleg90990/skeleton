import Player from '../player'
import Enemy from '@/game/Models/Enemy/enemy'
import { MotionEnum }  from '../enums'
import { setStatus } from '@/game/Client'

export default function(player: Player, enemy: Enemy) {
  const distance = Phaser
    .Math.Distance.Between(
      player.x, player.y,
      enemy.x, enemy.y
    )

  const rate = enemy.info.power - (enemy.info.powerArea + 20 - distance);

  player.removeHealth(rate)

  if (player.isDie()) {
    player.setMotion(MotionEnum.die)
    setStatus(player)
  }
}