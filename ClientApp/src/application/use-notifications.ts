import { reaction } from "mobx";
import { useState } from "react";
import { Message } from "../types/common";
import notifier from '../services/notifications-service'

export default function useNotifications() {
  const [messages, setMessages] = useState<Message[]>(notifier.messages)
  reaction(() => notifier.messages, newOnes => setMessages(newOnes))

  const onClose = (id: number) => notifier.notify({
    id,
    type: 'close',
  })
  const onUpdateClick = () => {console.warn('not implemented yet!'); }
  
  return {
    messages,
    onClose,
    onUpdateClick,
  }
}