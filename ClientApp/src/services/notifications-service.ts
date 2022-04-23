import { makeAutoObservable } from 'mobx'
import { INotifier, INotifyable, Message, Options } from '../types/common'

class Notifier implements INotifyable, INotifier {
  private _lastID = 0
  private _messages: Message[] = []  

  get messages(): Message[] {
    return [...this._messages]
  }

  constructor() {
    makeAutoObservable(this)
  }

  notify(message: Message): void {
    const {type} = message
    if (type === 'close') this._close(message.id)
    else if (type === 'alert') this._alert(message)
  }

  private _alert(message: Message): void {
    this._lastID++
    this._messages.push({
      ...message,
      id: this._lastID,
    })
  }

  private _close(id: number): void {    
    this._messages = this._messages.filter(message => message.id !== id)
  }
}

export default new Notifier()