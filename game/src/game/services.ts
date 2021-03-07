import { ServiceProviderInterface } from '@/game/types'

//Service
import Map from '@/game/Map'
import Camera from '@/game/Camera'
import Client from '@/game/Client'
import Intersection from '@/game/Intersection'

//Models
import Player from '@/game/Models/Player'
import Heart from '@/game/Models/Heart'
import Enemy from '@/game/Models/Enemy'

export const container = {
  Map, Camera, Client, Player
}

const services: ServiceProviderInterface = {
  items: [Map, Camera, Client, Player, Intersection, Heart, Enemy]
}

export default services