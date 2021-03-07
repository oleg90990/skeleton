import { ServiceProviderInterface } from '@/game/types'

import Map from '@/game/Map'
import Camera from '@/game/Camera'
import Client from '@/game/Client'
import Intersection from '@/game/Intersection'

import Player from '@/game/Models/Player'

export const container = {
  Map, Camera, Client, Player
}

const services: ServiceProviderInterface = {
  items: [Map, Camera, Client, Player, Intersection]
}

export default services