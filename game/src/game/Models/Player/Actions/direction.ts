import Player from '../player'
import { getDirection } from '@/game/Helpers/mousePointer'

export default function(player: Player) {
  player.setDirection(getDirection(player))
}