import { observe } from "mobx"
import { useState } from "react"

export default function useMutation(item: any) {
  const [,setValue] = useState<any>()
  observe(item, change => setValue(change.newValue))
}