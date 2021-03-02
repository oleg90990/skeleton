import { EmitRespnseInterface, EmitRequestInterface } from '@/game/types'
import { Socket, io } from "socket.io-client"

export default class Client
{

  private id!: string
  private client!: Socket;

  connect(callback: Function) {
    this.client = io("ws://46.17.40.175:3000/", {
      reconnectionDelayMax: 1000
    })

    this.client.on("connect", () => {
      this.id = this.client.id
      callback()
    })
  }

  init(data: EmitRequestInterface) {
    data.id = this.id
    this.client.emit('init', data)
  }

  onInit(callback: (data: EmitRespnseInterface) => void) {
    this.client.on("init", (items: any) => {
      for (let id in items) {
        if (id !== this.id) {
          callback(items[id])
        }
      }
    })
  }

  emit(data: EmitRequestInterface) {
    this.client.emit('emit', data)
  }

  onEmit(callback: (data: EmitRespnseInterface) => void) {
    this.client.on("emit", (data: EmitRespnseInterface) => {
      callback(data)
    })
  }

  onDisconect(callback: (id: string) => void) {
     this.client.on("disconectitem", (id: string) => {
      callback(id)
    })
  }
}