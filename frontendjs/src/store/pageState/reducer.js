import {
    CHANGE_PAGE_STATE,
} from "./actionType";

const INIT_STATE = {}

const payment = (state = INIT_STATE, action) => {
    switch (action.type) {
        case CHANGE_PAGE_STATE:
            return {
                ...state,
                [action.payload.pageName]: {
                    ...state[action.payload.pageName],
                    [action.payload.stateName]: action.payload.newState
                },
            };
        
        default:
            return { ...state };
    }
};
  

export default payment;