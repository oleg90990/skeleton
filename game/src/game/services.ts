import { ServiceProviderInterface } from '@/game/types'

//Service
import Map from '@/game/Map'
import Camera from '@/game/Camera'
import Client from '@/game/Client'
import Intersection from '@/game/Intersection'
import ToolBar from '@/game/ToolBar'

//Models
import Player from '@/game/Models/Player'
import Heart from '@/game/Models/Heart'
import Enemy from '@/game/Models/Enemy'

//Scenes
import Menu from '@/game/Scenes/Menu'

export const container = {
  Map, Camera, Client, Player
}

const services: ServiceProviderInterface = {
  items: [Map, Camera, ToolBar, Client, Player, Intersection, Heart, Enemy, Menu]
}

export default services