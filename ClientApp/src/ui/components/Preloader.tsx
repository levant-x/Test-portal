import { Spinner } from "reactstrap";

type Props = {
  small?: boolean,
  color?: string,
}

export default function Preloader({
  small, color
}: Props) {
  return (
    <div className='d-flex d-flex justify-content-center my-2'>
      <Spinner
        color={color ?? 'info'}
        size={small ? 'sm' : ''}
      >
        Loading...
      </Spinner>
    </div>
  )
}