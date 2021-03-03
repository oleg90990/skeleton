import { EmitResponseInterface, EmitRequestInterface } from '@/game/types'
import { Socket, io } from "socket.io-client"
import Player from '@/game/Models/Player'
export default class Client {
  private id!: string
  private client!: Socket;

  public connect(callback: () => void) {
    this.client = io("ws://localhost:3000", {
      reconnectionDelayMax: 1000,
    })

    this.client.on("connect", () => {
      this.id = this.client.id
      callback()
    })
  }

  public init(player: Player) {
    this.client.emit('init', player.request)
  }

  public onInit(callback: (data: EmitResponseInterface) => void) {
    this.client.on("init", (data: EmitResponseInterface) => {
      callback(data)
    })
  }

  public emit(player: Player) {
    this.client.emit('emit', player.request)
  }

  public onEmit(callback: (data: EmitResponseInterface) => void) {
    this.client.on("emit", (data: EmitResponseInterface) => {
      callback(data)
    })
  }

  public onDisconect(callback: (id: string) => void) {
     this.client.on("disconectitem", (id: string) => {
      callback(id)
    })
  }
}
