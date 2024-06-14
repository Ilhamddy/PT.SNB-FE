import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setActivationKey } from "../store/actions";

export const useCheckActivity = () => {
    const history = useNavigate();

    useEffect(() => {
        let timeout = null;
        function checkActivity() {
            timeout && clearTimeout(timeout);
            timeout = setTimeout(() => { 
                try{
                    history(`/logout`); 
                } catch(error) {
                    console.error(error);
                }
            }, 30 * 60 * 1000);
        }
        checkActivity();

        try{
            document.addEventListener('keydown', checkActivity);
            document.addEventListener('mousedown', checkActivity);
            document.addEventListener('mousemove', checkActivity);
        }catch(error){
            console.error(error);
        }
        
        return () => {
            clearTimeout(timeout);
            try{
                document.removeEventListener('keydown', checkActivity);
                document.removeEventListener('mousedown', checkActivity);
                document.removeEventListener('mousemove', checkActivity);
            }catch(error){
                console.error(error);
            }
        }
    }, [history])
}

export const useActivationKey = () => {
    const dispatch = useDispatch()
    useEffect(() => {
      // content type
      let activation = localStorage.getItem('activationKey')
      activation = activation ? activation : null
      dispatch(setActivationKey(activation))
    }, [dispatch])
  }
  