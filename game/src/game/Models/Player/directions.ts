import { Direction } from '@/game/types.js'

const directions: Direction = {
  west: { // a
    offset: 0,
    x: -2,
    y: 0    
  },
  northWest: { // aw
    offset: 32,
    x: -2,
    y: -1    
  },
  north: { // w
    offset: 64,
    x: 0,
    y: -2    
  },
  northEast: { // wd
    offset: 96,
    x: 2,
    y: -1    
  },
  east: { // d
    offset: 128,
    x: 2,
    y: 0    
  },
  southEast: { //ds
    offset: 160,
    x: 2,
    y: 1    
  },
  south: { // s
    offset: 192,
    x: 0,
    y: 2    
  },
  southWest: { //sd
    offset: 224,
    x: -2,
    y: 1    
  }
}

export default directions