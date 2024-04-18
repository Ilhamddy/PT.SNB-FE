import { baseUrl } from "@/app/utils/databases";
import { INews } from "@/types/news";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useGetNewsById = () => {
  const router = useRouter();
  const [getNewsId, setGetNewsId] = useState<INews[]>([]);
  const params = useParams();
  console.log(params);

  console.log(params.newsDetail);

  const getNewsById = async () => {
    try {
      const response = await axios.get(`${baseUrl}/news/${params.newsDetail}`);
      setGetNewsId(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(getNewsById.title);

  useEffect(() => {
    getNewsById();
  }, []);

  return getNewsId;
};

export default useGetNewsById;
