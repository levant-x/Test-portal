import { LIKE_ACTIVE_CLASS_NAME } from "../../../config/consts"
import { IChildren } from "../../../types/common"

type Props = {
  count: number
  className?: string
  isOn?: boolean
  onClick?: Function
  onHoverChange?: (e: Element, isHovered: boolean) => void
} & IChildren

export default function HandsCounter({
  count, 
  children,
  className, 
  isOn, 
  onHoverChange,
  onClick,
}: Props) {
  return (
    <span className={`${isOn ? LIKE_ACTIVE_CLASS_NAME : ''}${className} ms-1`}>
      <span className="mx-1">{count}</span>

      <span 
        onClickCapture={() => onClick?.()}
        onMouseOver={e => onHoverChange?.(e.target as Element, true)}
        onMouseLeave={e => onHoverChange?.(e.target as Element, false)}
      >
        {children}
      </span>
    </span>
  )
}