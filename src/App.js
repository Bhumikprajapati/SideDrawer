import React from 'react';
import './App.css';
import SideDrawer from './components/sideDrawer';
import ShowData from './components/showdata';
import { useState } from 'react';
import { Button,Drawer } from '@material-ui/core';
import * as actions from './store/actions';
import { connect } from 'react-redux';
const App = (props) => {
  const {data,onAdd,onDelete,onEdit} =props
  const [details, setDetails] = useState({ firstName: '', email: '', address: '',phone:'',website:'',id:''});
  const [error, setError] = useState({ firstnameError: '', emailError: '',addressError:'', phoneError: '' })
  const [editflag, setEditFlag] = useState(false);
  const [state, setState] = useState(false);
  const toggleDrawer = (open) =>() => {
    setState(open);
  };
  const handleChange = (e) => {
 
    if (e.target.name === "firstName")
     {
      if (e.target.value === '') {
        setError({ ...error, firstnameError: ' Please Write First name' })
      }
      else {
        setError({ ...error, firstnameError: '' })
      }
      setDetails({ ...details, firstName: e.target.value })
    }
    else if (e.target.name === "email") 
    {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if (e.target.value === '')
         {
          setError({ ...error, emailError: ' Please Write Your email ' })
        }
        else if(!pattern.test(e.target.value)){
          setError({ ...error, emailError: ' Please Write Your email correctly' })

        }
        else {
          setError({ ...error, emailError: '' })
        }
        setDetails({ ...details, email: e.target.value })

      }
      else if (e.target.name === "address") 
      {
          if (e.target.value === '')
           {
            setError({ ...error, addressError: ' Please Write Your Address' })
          }
          else {
            setError({ ...error, addressError: '' })
          }
          setDetails({ ...details, address: e.target.value })
        }
        else if (e.target.name === "phone") 
        {
          const pattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;          ;
            if (e.target.value === '')
             {
              setError({ ...error, phoneError: ' Please Write Phone no.' })
            }
            else if(!pattern.test(e.target.value))
            {
              setError({ ...error, phoneError: ' Please Write Phone no correctly' })

            }
            else {
              setError({ ...error, phoneError: '' })
            }
            setDetails({ ...details, phone: e.target.value })
          }
          else if(e.target.name==='website')
          {
            setDetails({ ...details, website: e.target.value })
          }
  }
  const editHandler = (id) => {
    setEditFlag(true);
    setState(true)
    let index = data.findIndex((i) => i.id === id)
    setDetails({
      firstName: data[index].firstName,
      email: data[index].email,
      address: data[index].address,
      phone: data[index].phone,
      website: data[index].website,
      id: data[index].id
    })
  }
  const deleteHandler = (id) => {
    let ask=window.confirm('Sure to delete?')
    if(ask){
      onDelete(id);
    }
  }
  const submitted = (e) => {
    e.preventDefault();
    if (editflag) {
      let users=[...data]
      let id = details.id;
      let index = users.findIndex((i) => i.id === id)
      users[index] = details;
      setState(false);
      onEdit(users);
      setEditFlag(false)
    }
    else {
      let id = Math.random(100)
      details.id=id
      onAdd(details);
      setDetails({ firstName: '', email: '', address: '',phone:'',website:'',id:''});
      setState(false); //drawer open close     
    }
    setDetails({ firstName: '', email: '', address: '',phone:'',website:'',id:''});
  }
  return (
    <div className="App">
      {
        <>
          <Button
            variant="contained" color="primary"
            onClick={toggleDrawer(true)} >ADD DATA</Button>
          {<Drawer anchor={'top'} open={state} onClose={toggleDrawer(false)}>
          <SideDrawer 
           handleChange={handleChange} error={error} 
          submitted={submitted} details={details} 
           editflag={editflag} />
          </Drawer>}
        </>    
      }   
      <ShowData showAllData={data} deleteData={deleteHandler} editData={editHandler} />
    </div>
  );
}
const mapStateToProps=state=>{  
  return{
data:state.alldata
  }
}
const mapDispatchToProps=dispatch=>{
  return{
onAdd:(details)=>dispatch(actions.addData(details)),
onDelete:(id)=>dispatch(actions.deleteData(id)),
onEdit:(users)=>dispatch(actions.editData(users))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
