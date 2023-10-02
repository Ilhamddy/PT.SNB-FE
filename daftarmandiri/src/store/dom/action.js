import { 
    ON_CHANGE_PAGE
} from "./actionType";

export const onChangePage = (lastTop) => {
    return {
        type: ON_CHANGE_PAGE,
        payload: {lastTop}
    }
}
