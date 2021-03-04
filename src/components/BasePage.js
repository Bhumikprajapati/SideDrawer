
import { useState } from 'react';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import ShowData from './showdata';


const BasePage=(props)=>{
    const [details,setDetails]=useState({firstName:'',lastName:'',age:'',id:''});
    const [error,setError]=useState({firstnameerror:'',lastnameerror:'',ageerror:''})
    const [data,setData] = useState([]);
    const [editflag,setEditFlag]=useState(false);
    const [id,setId]=useState()
const handleChange = (e) => 
{  
    // const [name,value]=e.target
    // setDetails({
    //     ...details,
    //     [name]:value
    // })
  
    if(e.target.name === "firstName")
    { 
        if(e.target.name==='')
        {  setError({...error,firstnameerror:' Please Write First name'})
        }     
        setDetails({...details,firstName:e.target.value})
    }
    else if(e.target.name === "lastName")
    {
        setDetails({...details,lastName:e.target.value})
    }
    else if(e.target.name === "age")
    {
        Number(e.target.value) > 100 ? setError({...error,ageerror:'Age is not valid'}) : setError({...error,ageerror:''})
        setDetails({...details,age:e.target.value})
    }  

}
const editHandler=(id)=>{
    
    setEditFlag(true);
    let index=data.findIndex((i)=>i.id===id)
        // console.log(index)
       // alert("in edit index "+index)
        setDetails({
            firstName:data[index].firstName,
            lastName:data[index].lastName,
            age:data[index].age,
            id:data[index].id
        })
    // setData()

}
const deleteHandler=(id)=>{
    // console.log(id)
    let d=data.filter((inid)=>inid.id!==id)
    // console.log(d)
    setData(d)
    
    // .filter((id)=>id.i!==i)
    // console.log(props.showAllData)
  } 
const submitted=(e)=>{
    e.preventDefault();
    if(editflag){
        let id=details.id;
        let index=data.findIndex((i)=>i.id===id)
        
        //alert("submit id"+index);
        console.log("details"+JSON.stringify())
        data[index]=details;
        setData([...data])
        
        
    }
    else{
        setEditFlag(false)
        let id=Math.random(100)
        setData([...data,details.id=id])
        setData([...data,details]);
        setId(id)
       
    }
  
    // console.log(data)


   }
  // alert(`FirstName:${details.firstName} LastName:${details.lastName} Age:${details.age}`)
return(
<div style={{marginTop:'10px'}}> 
    <form onSubmit={submitted}>
    <TextField name="firstName" variant="outlined" label="First name" 
    placeholder='Write Your First name' value={details.firstName} 
     onChange={(e) => handleChange(e)} error={error.firstnameerror}  helperText={error.firstnameerror} />
     
     <br/>
    <TextField  variant="outlined"  label="Last name" 
    onChange={(e) => handleChange(e)} name="lastName"
     placeholder='Write Your Last name' value={details.lastName} 
    error={error.lastnameerror}   helperText={error.lastnameerror}/><br/>
    <TextField   variant="outlined"  label="Age" name="age"
     placeholder='Write Your Age' value={details.age}
    onChange={(e) => handleChange(e)}  error={error.ageerror} 
     helperText={error.ageerror}/><br/>
    <Button  variant="contained" color="primary" type="submit" >Submit</Button>
    </form>
    <br/>
   
      <ShowData showAllData={data} deleteData={deleteHandler} editData={editHandler}  />
  
     {/* <p style={{color:'green'}}>first name:{i.firstName}</p>
    <p style={{color:'green'}}>Last name:{i.lastName}</p>
    <p style={{color:'green'}}>first name:{i.age}</p> */}
    
    
    
</div> 
)
}
export default BasePage;