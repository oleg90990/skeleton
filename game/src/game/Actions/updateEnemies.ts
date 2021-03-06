import Skeleton from '@/game/Models/Skeleton'
import Scene from '@/game'

export default function (scene: Scene, enemies: Skeleton[]) {
  for (const id in enemies) {
    if (enemies[id]) {
      enemies[id].update()
    }
  }
}
