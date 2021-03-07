import { Point } from '@/game/types'
import create from './create'
import preload from './Hooks/preload'

export let waterTiles: Phaser.Geom.Rectangle[] = []
export let grassTiles: Phaser.Geom.Rectangle[] = []

export function getRandomGrass() {
  return grassTiles[Math.floor(Math.random() * grassTiles.length)];
}

export default {
  preload,
  create: function(this: Phaser.Scene) {
    const {
      water,
      grass
    } = create.apply(this, [])

    waterTiles = water
    grassTiles = grass
  }
}