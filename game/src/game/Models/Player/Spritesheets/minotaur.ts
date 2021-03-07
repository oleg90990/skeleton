import { Spritesheet } from '../types'

const minotaur: Spritesheet = {
  sprite: 'minotaur',
  info: {
    health: 1500,
    power: 100,
    powerArea: 20,
    speed: 0.8,
  },
  offsets: {
    west: 0,
    northWest: 24,
    north: 48,
    northEast: 72,
    east: 96,
    southEast: 120,
    south: 144,
    southWest: 168,
  },
  motions: {
    idle: {
      startFrame: 0,
      endFrame: 4,
    },
    walk: {
      startFrame: 4,
      endFrame: 12,
    },
    attack: {
      startFrame: 12,
      endFrame: 18,
      attack: 16,
    },
    die: {
      startFrame: 21,
      endFrame: 24,
      once: true,
    },
    shoot: {
      startFrame: 21,
      endFrame: 24,
      once: true,
    },
  }
}

export default minotaur