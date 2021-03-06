import Skeleton from '../Skeleton'
import { getDirection } from '@/game/Helpers/mousePointer'

export default function(player: Skeleton) {
  player.setDirection(getDirection(player))
}