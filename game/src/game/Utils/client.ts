// import { EmitResponseInterface, EmitRequestInterface } from '@/game/types'
import { Socket, io } from "socket.io-client"
import { BonusInterface } from '@/game/types'

/**
 * The Singleton class defines the `getInstance` method that lets clients access
 * the unique singleton instance.
 */
class Client {
  private static instance: Client
  private id!: string
  private socket!: Socket;

  private constructor() { }

  public static getInstance(): Client {
    if (!Client.instance) {
        Client.instance = new Client();
    }

    return Client.instance;
  }

  public connect(callback: () => void) {
    let url = 'ws://46.17.40.175:3000'

    if (process.env.NODE_ENV === 'development') {
      url = 'ws://localhost:3000'
    }

    this.socket = io(url, {
      reconnectionDelayMax: 1000,
    })

    this.socket.on("connect", () => {
      this.id = this.socket.id
      callback()
    })
  }

  public on(event: string, callback: Function) {
    this.socket.on(event, callback)
  }

  public emit(event: string, callback: any) {
    this.socket.emit(event, callback)
  }

  // private id!: string
  // private socket!: Socket;

  // constructor(callback: () => void) {
  //   let url = 'ws://46.17.40.175:3000'

  //   if (process.env.NODE_ENV === 'development') {
  //     url = 'ws://localhost:3000'
  //   }

  //   this.socket = io(url, {
  //     reconnectionDelayMax: 1000,
  //   })

  //   this.socket.on("connect", () => {
  //     this.id = this.socket.id
  //     callback()
  //   })
  // }

  // public init(player: Player) {
  //   const request = player.request
  //   request.id = this.id
  //   this.client.emit('init', request)
  // }

  // public onInit(callback: (data: EmitResponseInterface) => void) {
  //   this.client.on("init", (data: EmitResponseInterface) => {
  //     callback(data)
  //   })
  // }

  // public emit(player: Player) {
  //   const request = player.request
  //   request.id = this.id
  //   this.client.emit('emit', request)
  // }

  // public onEmit(callback: (data: EmitResponseInterface) => void) {
  //   this.client.on("emit", (data: EmitResponseInterface) => {
  //     callback(data)
  //   })
  // }

  // public onDisconect(callback: (id: string) => void) {
  //    this.client.on("disconectitem", (id: string) => {
  //     callback(id)
  //   })
  // }

  // public onBonus(callback: (bonus: Bonus) => void) {
  //   this.client.on("bonus", (bonus: Bonus) => {
  //     callback(bonus)
  //   })
  // }

  // public onRemoveBonus(callback: (id: string) => void) {
  //   this.client.on("removebonus", (id: string) => {
  //     callback(id)
  //   })
  // }

  // public removeBonus(id: string) {
  //   this.client.emit("removebonus", id)
  // }

  // public initBonuses(bonuses: Heart[]) {
  //   this.client.emit("initbonuses", bonuses.map(({ x, y, id, value }) => {
  //     return { x, y, id, value }
  //   }))
  // }

  // public onInitBonuses(callback: (bonuses: any) => void) {
  //   this.client.on("initbonuses", (bonuses: Heart[]) => {
  //     callback(bonuses)
  //   })
  // }
}

export function connect(callback: () => void) {
  Client.getInstance().connect(callback);
}

export function onBonus(callback: (bonus: BonusInterface) => void) {
  Client.getInstance().on("bonus", (bonus: BonusInterface) => {
    callback(bonus)
  })
}

export function onRemoveBonus(callback: (id: string) => void) {
  Client.getInstance().on("removebonus", (id: string) => {
    callback(id)
  })
}

export function emitUseBonus(id: string) {
  Client.getInstance().emit("removebonus", id)
}