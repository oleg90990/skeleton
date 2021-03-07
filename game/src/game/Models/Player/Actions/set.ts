import Player from '../player'
import { MotionEnum, DirectionEnum } from '../enums'
import { PlayerInfo } from '../types'
import { PlayerStatus } from '@/game/Client/types'

export default function(player: Player, status: PlayerStatus) {
    player.setPoint(status.x, status.y)
    player.setMotion(status.motionKey)
    player.setDirection(status.directionKey)
    player.setPlayerInfo(status.info)
    player.setDirectionOffset(status.directionOffset)
}