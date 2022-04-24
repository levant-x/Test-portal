import { CSSProperties } from "react";
import { Button } from "reactstrap";
import { IChildren } from "../../../types/common";
import Preloader from "../Preloader";

type Props = IChildren & {
  className?: string
  style?: CSSProperties
  isLoading?: boolean
  onClick?: Function
}

export default function SubmitButton({
  style,
  className,
  isLoading,
  children, 
  onClick,
}:Props) {
  return (
    <Button style={style} className={className} color="success" onClick={() => onClick?.()}>
      {isLoading ? <Preloader /> : (children ?? 'Сохранить')}
    </Button>
  )
}