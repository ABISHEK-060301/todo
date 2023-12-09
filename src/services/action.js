import { SETLIST, CHECKED } from "./actionTypes";

export const addList = (list, id) => {
    return {
        type: SETLIST,
        payload: { list: list, id: id, checked: false }
    }
}

export const checkBox = (data) => {
    return {
        type: CHECKED,
        payload: data
    }
}