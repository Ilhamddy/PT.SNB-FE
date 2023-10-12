import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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