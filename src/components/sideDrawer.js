import React from 'react';
// import Button from '@material-ui/core/Button';
// import { TextField } from '@material-ui/core';

const SideDrawer = props => {
 

// let show;
// if(props.open){
//     show= (
//         <div style={{marginTop:'10px'}}> 
      
//     <form onSubmit={props.submitted}>
//     <TextField name="firstName" variant="outlined" label="First name" 
//     placeholder='Write Your First name' value={props.details.firstName} 
//      onChange={(e) => props.handleChange(e)} error={props.error.firstnameerror}  helperText={props.error.firstnameerror} />
     
//      <br/>
//     <TextField  variant="outlined"  label="Last name" 
//     onChange={(e) => props.handleChange(e)} name="lastName"
//      placeholder='Write Your Last name' value={props.details.lastName} 
//     error={props.error.lastnameerror}   helperText={props.error.lastnameerror}/><br/>
//     <TextField   variant="outlined"  label="Age" name="age"
//      placeholder='Write Your Age' value={props.details.age}
//     onChange={(e) => props.handleChange(e)}  error={props.error.ageerror} 
//      helperText={props.error.ageerror}/><br/>
//     <Button  variant="contained" color="primary" type="submit"  >Submit</Button>
//     </form>
   
// </div> 
// )
    
// }
// else{
//     show= null;
// }
  return (
      <div>
        {props.children}
        {/* {show} */}
    </div>
  );
}

export default SideDrawer;
