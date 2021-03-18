import React from 'react';
import {TextField,Button} from '@material-ui/core';
const SideDrawer = props => {
  const {handleChange,error,submitted,details,editflag}=props
  return (
      <div>
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
    </div>
  );
}

export default SideDrawer;
