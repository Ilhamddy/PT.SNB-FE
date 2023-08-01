import { useDispatch, useSelector } from "react-redux"
import { changePageState } from "../store/actions";

/**
 * 
 * @param {import("../store/pageState/action").PageName} pageName 
 * @returns {[any, (stateName: string, newState: any) => void]}
 */
const usePageState = (pageName) => {

    const pageState = useSelector((state) => state?.PageState?.[pageName] ?? ({}))
    const dispatch = useDispatch();

    const setPageState = (stateName, newState) => {
        dispatch(changePageState(pageName, stateName, newState))
    }

    return [pageState, setPageState]
}

export default usePageState