import { useEffect, useState } from "react";
import { getLoggedinUser } from "../helpers/api_helper";
import { useSelector } from "react-redux";

const useUser = () => {
  const {user} = useSelector((state) =>  {
    const user = localStorage.getItem('authUserMandiri')
      ? JSON.parse(localStorage.getItem('authUserMandiri'))
      : null
    
    return {
      user: state.UserPasien.loginUser?.data || user || null,
    }
  })

  return user;
};

export { useUser };