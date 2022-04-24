import { reaction } from "mobx";
import { useState } from "react";
import { IData, IEntityStore } from "../types/common";

export default function useEntity<T extends IData>(store: IEntityStore<T>) {
  const [isLoading, setLoadingStatus] = useState(store.isLoading)
  reaction(() => store.isLoading, newStatus => setLoadingStatus(newStatus))

  return {
    isLoading,
    entity: store.entity,
    save: store.save.bind(store),
    errors: store.errors,
  }
}