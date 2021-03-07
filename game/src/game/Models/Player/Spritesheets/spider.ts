import { Spritesheet } from '../types'

const spider: Spritesheet = {
  sprite: 'spider',
  info: {
    health: 800,
    power: 0.6,
    powerArea: 20,
    speed: 1.4,
  },
  offsets: {
    west: 0,
    northWest: 32,
    north: 64,
    northEast: 96,
    east: 128,
    southEast: 160,
    south: 192,
    southWest: 224,
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
      endFrame: 20,
    },
    die: {
      startFrame: 20,
      endFrame: 28,
      once: true,
    },
    shoot: {
      startFrame: 28,
      endFrame: 32,
    },
  }
}

export default spider