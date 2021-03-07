import Player from '../player'
import Enemy from '@/game/Models/Enemy/enemy'
import { MotionEnum }  from '../enums'
import { setStatus } from '@/game/Client'

export default function(player: Player, enemy: Enemy) {
  player.removeHealth(enemy.info.power)

  if (player.isDie()) {
    player.setMotion(MotionEnum.die)
    setStatus(player)
  }
}