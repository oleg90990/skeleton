import Player from '../player'

export default function(player: Player, value: number) {
  player.addHealth(value)
}