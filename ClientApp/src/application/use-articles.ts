import { reaction } from "mobx";
import { useState } from "react";
import articlesService from "../services/articles-service";

export default function useArticles() {
  const [isLoading, setLoadingStatus] = useState(articlesService.isLoading)
  reaction(() => articlesService.isLoading, newStatus => setLoadingStatus(newStatus))

  return {
    isLoading,
    articles: articlesService.articles,
  }
}