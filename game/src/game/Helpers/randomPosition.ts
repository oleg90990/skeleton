import { Scene } from 'phaser'
import { AvailableLand } from '@/game/types'

export default function(array: AvailableLand[]): AvailableLand {
  return array[Math.floor(Math.random() * array.length)];
}
