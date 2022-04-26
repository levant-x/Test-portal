import { CSSProperties } from "react";
import { Button } from "reactstrap";
import { IChildren, IClickable } from "../../../types/common";
import Preloader from "../Preloader";

type Props = IChildren & IClickable & {
  className?: string
  style?: CSSProperties
  isLoading?: boolean
}

export default function SubmitButton({
  style,
  className,
  isLoading,
  children, 
  onClick,
}:Props) {
  return (
    <Button style={style} className={className} color="success" onClick={onClick}>
      {isLoading ? <Preloader small color="light" /> : (children ?? 'Сохранить')}
    </Button>
  )
}