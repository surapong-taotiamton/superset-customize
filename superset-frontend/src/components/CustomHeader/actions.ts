export const CHANGE_HEADER = "CHANGE_HEADER";


export function changeHeader(data: any[] ) {
   
    return {
        type: CHANGE_HEADER,
        payload : data
    };
}