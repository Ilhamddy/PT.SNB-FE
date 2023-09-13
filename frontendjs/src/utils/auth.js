import { useEffect } from "react";
import { useNavigate } from "react-router-dom";



export const useCheckActivity = () => {
    const history = useNavigate();

    useEffect(() => {
        let timeout = null;
        function checkActivity() {
            timeout && clearTimeout(timeout);
            timeout = setTimeout(() => { 
                history(`/logout`); 
            }, 30 * 60 * 1000);
        }
        document.addEventListener('keydown', checkActivity);
        document.addEventListener('mousedown', checkActivity);
        document.addEventListener('mousemove', checkActivity);
        checkActivity();
        return () => {
            clearTimeout(timeout);
            document.removeEventListener('keydown', checkActivity);
            document.removeEventListener('mousedown', checkActivity);
            document.removeEventListener('mousemove', checkActivity);
        }
    }, [history])
}