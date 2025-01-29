export const SET_FILTER = "SET_FILTER";


export function setFilter(data: boolean ) {
   
    return {
        type: SET_FILTER,
        payload : data
    };
}