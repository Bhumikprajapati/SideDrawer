import React from 'react';
import './App.css';
import SideDrawer from './components/sideDrawer'
import ShowData from './components/showdata'
import { useState } from 'react';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';

const App = () => {

  const [details,setDetails]=useState({firstName:'',lastName:'',age:'',id:''});
  const [error,setError]=useState({firstnameerror:'',lastnameerror:'',ageerror:''})
  const [data,setData] = useState([]);
  const [editflag,setEditFlag]=useState(false);
  const [state, setState] = useState( false);
  const toggleDrawer = ( open) => (event) => {
    setState(open );
  };
const handleChange = (e) => 
{  
  // const [name,value]=e.target
  // setDetails({
  //     ...details,
  //     [name]:value
  // })

  if(e.target.name === "firstName")
  { 
      if(e.target.value==='')
      {  setError({...error,firstnameerror:' Please Write First name'})
      }
      else{
        setError({...error,firstnameerror:''})
      }
      setDetails({...details,firstName:e.target.value})
  }
  else if(e.target.name === "lastName")
  {
    if(e.target.value==='')
     
    {  setError({...error,lastnameerror:' Please Write Last name'})
    } 
    else{
      setError({...error,lastnameerror:''})
    }
      setDetails({...details,lastName:e.target.value})
  }
  else if(e.target.name === "age")
  {

    if( isNaN(e.target.value) || Number(e.target.value) > 100  )
     
    {  setError({...error,ageerror:'not valid'})
    } 
    else{
      setError({...error,ageerror:''})
    }
      setDetails({...details,age:e.target.value})
  } 

}


const editHandler=(id)=>{
  setEditFlag(true);
 
  // toggleDrawer(true)
  setState(true)
  let index=data.findIndex((i)=>i.id===id)
      setDetails({
          firstName:data[index].firstName,
          lastName:data[index].lastName,
          age:data[index].age,
          id:data[index].id
      })
  
}
const deleteHandler=(id)=>{
  let d=data.filter((inid)=>inid.id!==id)
  setData(d)
 
} 
const submitted=(e)=>{
  e.preventDefault();
 
  if(editflag){
    
      let id=details.id;
      let index=data.findIndex((i)=>i.id===id)
      data[index]=details;
      setData([...data])
      setState(false); 
      setEditFlag(false) 
          
  }
  else{
    console.log("edit falg in submitted" , editflag)
    console.log("else here")
    setDetails({firstName:'',lastName:'',age:'',id:''});
    setState(false); //drawer open close
     setEditFlag(false)
      let id=Math.random(100)
      setData([...data,details.id=id])
      setData([...data,details]);
  } 
  setDetails({firstName:'',lastName:'',age:'',id:''});
}

const list = () => (
  <div> 
 <SideDrawer>
 <div style={{margin:'12px',display:'flex',alignItems:'center',justifyContent:'center'}}> 
      
      <form onSubmit={submitted}>
      <TextField style={{marginBottom:'15px'}} name="firstName" variant="outlined" label="First name" 
      placeholder='Write Your First name' value={details.firstName} 
       onChange={(e) => handleChange(e)} error={error.firstnameerror.length>1}  helperText={error.firstnameerror} /> 
       <br/>
      <TextField style={{marginBottom:'15px'}} variant="outlined"  label="Last name" 
      onChange={(e) => handleChange(e)} name="lastName"
       placeholder='Write Your Last name' value={details.lastName} 
      error={error.lastnameerror.length>1}   helperText={error.lastnameerror}/><br/>
      <TextField style={{marginBottom:'15px'}}  variant="outlined"  label="Age" name="age"
       placeholder='Write Your Age' value={details.age}
      onChange={(e) => handleChange(e)}  error={error.ageerror.length>1} 
       helperText={error.ageerror}/><br/>
      <Button style={{left:'25%'}} variant="contained" color="primary" type="submit">Submit</Button>
      </form>
     
  </div> 
   </SideDrawer>
  </div>
);  

  return (
    <div className="App">
       {
        <>    
          <Button
          variant="contained" color="primary"
          onClick={toggleDrawer(true)} >ADD DATA</Button>
          {<Drawer  anchor={'top'} open={state} onClose={toggleDrawer( false)}>
            {list()}
          </Drawer>}
        </>
      }
          <ShowData showAllData={data} deleteData={deleteHandler} editData={editHandler}  />
  
     
    </div>
  );
}

export default App;
