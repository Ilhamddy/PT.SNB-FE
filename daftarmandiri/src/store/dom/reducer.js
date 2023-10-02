import {
    ON_CHANGE_PAGE
} from "./actionType";

const INIT_STATE = {
    kontainerPage: {
        lastTop: 0
    },
}

const dom = (state = INIT_STATE, action) => {
    switch (action.type) {
        case ON_CHANGE_PAGE: 
            return {
                ...state,
                kontainerPage: {
                    lastTop: action.payload.lastTop
                },
            };

        default:
            return { ...state };
    }
};


export default dom;