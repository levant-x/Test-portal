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
  const isOnClass = isOn ? 'attitude-involved ' : ''

  return (
    <>
      <span className={`${isOnClass}${className} ms-1`}>
        {count} 

        <span 
          onClickCapture={() => onClick?.()}
          onMouseOver={e => onHoverChange?.(e.target as Element, true)}
          onMouseLeave={e => onHoverChange?.(e.target as Element, false)}
        >
          {children}
        </span>
      </span>
    </>
  )
}