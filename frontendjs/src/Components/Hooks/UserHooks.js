import { useEffect, useState } from "react";
import { getLoggedinUser } from "../../helpers/api_helper";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/actions";

const useProfile = () => {
  const userProfileSession = getLoggedinUser();
  let token =
  userProfileSession &&
  userProfileSession["token"];
  const [loading, setLoading] = useState(userProfileSession ? false : true);
  const [userProfile, setUserProfile] = useState(
    userProfileSession ? userProfileSession : null
  );
  const dispatch = useDispatch()

  useEffect(() => {
    const userProfileSession = getLoggedinUser();
    let token =
      userProfileSession &&
      userProfileSession["token"];
    setUserProfile(userProfileSession ? userProfileSession : null);
    setLoading(token ? false : true);
  }, []);
  
  useEffect(() => {
    if (userProfile && !loading && token) {
      setAuthorization(token)
    } else if (!userProfile && loading && !token) {
      dispatch(logoutUser())
    }
  }, [token, userProfile, loading, dispatch])

  return { userProfile, loading, token };
};

export { useProfile };