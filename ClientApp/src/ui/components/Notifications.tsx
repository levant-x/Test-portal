import { Alert } from "reactstrap";
import useNotifications from "../../application/use-notifications";

export default function Notifications() {
  const { messages, onClose } = useNotifications()

  return (
    <div className="d-flex justify-content-center">
      {messages.filter(message => message.type === 'alert').map(message => 
        <Alert
          key={message.id}
          color={message.level}
          className='mx-1'
          toggle={() => onClose(message.id)}
        >
          {message.body}
        </Alert>)}
    </div>
  )
}