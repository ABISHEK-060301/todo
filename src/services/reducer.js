
export const initState = {
    toDoList: []
}

export const reducer = (state = { ...initState }, action) => {

    switch (action.type) {
        case "SETLIST":
            return { toDoList: [...state.toDoList, action.payload] }

        case "CHECKED":
            return { toDoList: [...action.payload] }

        default:
            return { ...state }
    }
}