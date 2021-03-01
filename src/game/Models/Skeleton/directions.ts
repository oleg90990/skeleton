const directions: any = {
  "west": { // a
    "offset": 0,
    "x": -2,
    "y": 0,
    "opposite": "east"
  },
  "northWest": { // aw
    "offset": 32,
    "x": -2,
    "y": -1,
    "opposite": "southEast"
  },
  "north": { // w
    "offset": 64,
    "x": 0,
    "y": -2,
    "opposite": "south"
  },
  "northEast": { // wd
    "offset": 96,
    "x": 2,
    "y": -1,
    "opposite": "southWest"
  },
  "east": { // d
    "offset": 128,
    "x": 2,
    "y": 0,
    "opposite": "west"
  },
  "southEast": { //ds
    "offset": 160,
    "x": 2,
    "y": 1,
    "opposite": "northWest"
  },
  "south": { // s
    "offset": 192,
    "x": 0,
    "y": 2,
    "opposite": "north"
  },
  "southWest": { //sd
    "offset": 224,
    "x": -2,
    "y": 1,
    "opposite": "northEast"
  }
};

export default directions;