import Player from '../player'
import { MotionEnum, DirectionEnum } from '../enums'
import { setStatus } from '@/game/Client'
import { getRandomGrass } from '@/game/Map'
import Spritesheets from '../Spritesheets'

export default function(player: Player) {
  if (player.isDie()) {
    const grass = getRandomGrass()
    player.setPoint(grass.x, grass.y)
    player.setMotion(MotionEnum.idle)
    player.setDirection(DirectionEnum.north)
    player.setPlayerInfo(Spritesheets['minotaur'].info)
    setStatus(player)
  }
}