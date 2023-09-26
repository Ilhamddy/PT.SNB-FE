import { useEffect, useState } from "react";
import { getLoggedinUser } from "../helpers/api_helper";
import { useSelector } from "react-redux";

const useProfile = () => {

  const { data: userProfile, loading, error } = useSelector((selector) => selector.Login)


  return { userProfile, loading, error };
};

export { useProfile };