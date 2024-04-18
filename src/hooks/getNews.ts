import { useState, useEffect } from "react";
import axios from "axios";
import { INews } from "@/types/news";
import { baseUrl } from "@/app/utils/databases";

const useNews = () => {
  const [news, setNews] = useState<INews[]>([]);
  console.log(news);
  

  const getNews = async () => {
    try {
      const response = await axios.get(`${baseUrl}/news`);
      setNews(response.data.data);
      console.log(response.data.data);
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNews();
  }, []);


  
  return news;
};

export default useNews;
