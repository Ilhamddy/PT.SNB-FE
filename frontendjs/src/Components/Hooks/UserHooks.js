import { useEffect, useState } from "react";
import { getLoggedinUser, setAuthorization } from "../../helpers/api_helper";
import { useDispatch } from "react-redux";
import { loginUser, logoutUser } from "../../store/actions";
import { useSelectorRoot } from "../../store/reducers";

const useProfile = () => {
  const userProfile = useSelectorRoot(state => state.Login.user)
  let token = userProfile ? userProfile["token"] : null;
  const dispatch = useDispatch()
  
  useEffect(() => {
    if (userProfile && token) {
      setAuthorization(token)
    } 
  }, [token, userProfile, dispatch])

  return { userProfile, token };
};

export { useProfile };