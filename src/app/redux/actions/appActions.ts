
export function changeIsLoading(value:boolean){
return{
    type:'change',
    payload:value
}
}

export function updateData(value:boolean){
return{
    type:'update',
    payload:value
}
}
