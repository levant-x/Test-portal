import { LIKE_ACTIVE_CLASS_NAME } from "../../../config/consts";
import { Estimation } from "../../../types/common";
import { IArticle } from "../../../types/models";
import HandsCounter from "./HandsCounter";

type Props = Omit<IArticle, 'id' | 'author' | 'commentsNum'> & {
  onLikeToggle?: (isLiked: boolean) => void
}

export default function Attitude({
  likesNum,
  dislikesNum,
  estimation,
  canBeEstimated,
  onLikeToggle,
}: Props) {
  const isLiked = estimation === Estimation.liked ? LIKE_ACTIVE_CLASS_NAME : ''
  const isDisliked = estimation === Estimation.disliked ? LIKE_ACTIVE_CLASS_NAME : ''

  // TODO move to the service
  const toggleHover = (e: Element) => {
    //if (!canBeEstimated) return
    e.classList.toggle(LIKE_ACTIVE_CLASS_NAME)
  }

  return (
    <span>
      <HandsCounter 
        count={likesNum} 
        className={`me-2 ${isLiked}`}
        onClick={() => onLikeToggle?.(true)}   
        onHoverChange={toggleHover}     
      >
        <i className="bi bi-hand-thumbs-up"></i>
      </HandsCounter>

      <HandsCounter 
        count={dislikesNum}
        className={isDisliked}
        onClick={() => canBeEstimated && onLikeToggle?.(false)}  
        onHoverChange={toggleHover}     
      >
        <i className="bi bi-hand-thumbs-down"></i>
      </HandsCounter>
    </span>
  )
}