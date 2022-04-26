import { useEffect, useRef } from 'react';
import { IScrollable, Options } from "../types/common"

type Args = IScrollable & {
  options?: Options,
}

export default function useScroll({
  onScroll,
  options,
}: Args) {
  const ref = useRef<HTMLDivElement | null>(null)  
  const scrollTracker = new IntersectionObserver(([entry]) => {
    entry.isIntersecting && onScroll?.(options)
  })

  useEffect(() => ref.current && scrollTracker.observe(ref.current))
  return ref
}