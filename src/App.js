import React from 'react';
import './App.css';
import SideDrawer from './components/sideDrawer';
import ShowData from './components/showdata';
import { useState } from 'react';
import { Button,Drawer, TextField } from '@material-ui/core';
import * as actions from './store/actions';
import { connect } from 'react-redux';
const App = (props) => {
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
    let index = props.data.findIndex((i) => i.id === id)
    setDetails({
      firstName: props.data[index].firstName,
      email: props.data[index].email,
      address: props.data[index].address,
      phone: props.data[index].phone,
      website: props.data[index].website,
      id: props.data[index].id
    })
  }
  const deleteHandler = (id) => {
    let ask=window.confirm('Sure to delete?')
    if(ask){
      props.onDelete(id);
    }
  }
  const submitted = (e) => {
    e.preventDefault();
    if (editflag) {
      let users=[...props.data]
      let id = details.id;
      let index = users.findIndex((i) => i.id === id)
      users[index] = details;
      setState(false);
      props.onEdit(users);
      setEditFlag(false)
    }
    else {
      setEditFlag(false)
      let id = Math.random(100)
      details.id=id
      props.onAdd(details);
      setDetails({ firstName: '', email: '', address: '',phone:'',website:'',id:''});
      setState(false); //drawer open close    
   
    }
    setDetails({ firstName: '', email: '', address: '',phone:'',website:'',id:''});
  }

  const list = () => (
    <div>
      <SideDrawer>
        <div style={{ margin: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',marginRight:'40px' }}>
          <form onSubmit={submitted}>
            <TextField style={{ marginBottom: '15px' }} name="firstName" variant="outlined" label="First name*"
              placeholder='Write Your First name' value={details.firstName}
              onChange={(e) => handleChange(e)} error={error.firstnameError.length > 1} helperText={error.firstnameerror} />
            <br />
            <TextField style={{ marginBottom: '15px' }} variant="outlined" label="Email*"
              onChange={(e) => handleChange(e)} name="email"
              placeholder='Write Your Email' value={details.email}
              error={error.emailError.length > 1} helperText={error.emailError} />
              <br />
            <TextField style={{ marginBottom: '15px' }} variant="outlined" label="Address*" name="address"
              placeholder='Write Your Address' value={details.address}
              onChange={(e) => handleChange(e)} error={error.addressError.length > 1}
              helperText={error.addressError} />
              <br />
              <TextField style={{ marginBottom: '15px' }} variant="outlined" label="Phone*" name="phone"
              placeholder='Write Your Phone No.' value={details.phone}
              onChange={(e) => handleChange(e)} error={error.phoneError.length > 1}
              helperText={error.phoneError} />
              <br/>
              <TextField style={{ marginBottom: '15px' }} variant="outlined" label="Website" name="website"
              placeholder='Write Your Website name(if any).' value={details.website}
              onChange={(e) => handleChange(e)}  />
              <br/>
            <Button style={{ left: '25%' }} variant="contained" color="primary" type="submit">{!editflag?'Add User':'Update User'}</Button>
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
          {<Drawer anchor={'top'} open={state} onClose={toggleDrawer(false)}>
            {list()}
          </Drawer>}
        </>
        
      }   
      <ShowData showAllData={props.data} deleteData={deleteHandler} editData={editHandler} />
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
