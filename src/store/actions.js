import * as actionTypes from './actionTypes';

export const addData=(details)=>{
      
    return{
        
        type:actionTypes.ADD_DATA,
        details:details
    }
}
export const editData=(users)=>{
    return{
        type:actionTypes.EDIT_DATA,
        users:users
    }
}
export const deleteData=(id)=>{
    return{
        type:actionTypes.DELETE_DATA,
        id:id

    }
}
