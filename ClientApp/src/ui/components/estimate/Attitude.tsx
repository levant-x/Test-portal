import { LIKE_ACTIVE_CLASS_NAME } from "../../../config/consts";
import { Estimation, IClickable, IHoverable } from "../../../types/common";
import { IArticle } from "../../../types/models";
import HandsCounter from "./HandsCounter";

type Props = IHoverable & IClickable<Estimation> & Omit<
  IArticle, 'id' | 'author' | 'commentsNum'
>

export default function Attitude({
  likesNum,
  dislikesNum,
  estimation,
  canBeEstimated,
  onClick,
  onHover,
}: Props) {
  const isLiked = estimation === Estimation.liked ? LIKE_ACTIVE_CLASS_NAME : ''
  const isDisliked = estimation === Estimation.disliked ? LIKE_ACTIVE_CLASS_NAME : ''
  const disabilityClass = canBeEstimated ? '' : 'gray'

  return (
    <span>
      <HandsCounter 
        count={likesNum} 
        className={`me-2 ${isLiked}`}
        onClick={() => onClick?.(Estimation.liked)}   
        onHoverChange={onHover}     
      >
        <i className={`bi bi-hand-thumbs-up-fill ${disabilityClass}`}></i>
      </HandsCounter>

      <HandsCounter 
        count={dislikesNum}
        className={isDisliked}
        onClick={() => onClick?.(Estimation.disliked)}  
        onHoverChange={onHover}     
      >
        <i className={`bi bi-hand-thumbs-down-fill ${disabilityClass}`}></i>
      </HandsCounter>
    </span>
  )
}