import * as actionTypes from './actionTypes';

const initialState={
    alldata:[]
}
const reducer=(state=initialState,action)=>{
 
     switch(action.type){
         case actionTypes.ADD_DATA:   
             return{
                 ...state,
                 alldata:[...state.alldata,action.details]
             }
        case actionTypes.DELETE_DATA:
            return{
                ...state,
                alldata:[...state.alldata.filter(i=>(i.id!==action.id))]

            } 
        case actionTypes.EDIT_DATA:
            return{
              ...state,
              alldata:action.users
            } 
        default:
            return state    
     }
}
export default reducer;