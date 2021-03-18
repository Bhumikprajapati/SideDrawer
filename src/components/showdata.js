import React from 'react';
import { makeStyles,Table,TableBody,
        TableCell,TableContainer,
        TableHead,TableRow,
        Paper,Button,ButtonGroup } from '@material-ui/core';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
const BasicTable=(props)=> {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Website</TableCell>
            <TableCell >EDIT/DELETE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.showAllData.map((i, index) => (
            <TableRow key={i.id}>
              <TableCell >{i.firstName}</TableCell>
              <TableCell >{i.email}</TableCell>
              <TableCell >{i.address}</TableCell>
              <TableCell >{i.phone}</TableCell>
              <TableCell >{i.website}</TableCell>
              <TableCell>
                <ButtonGroup varient='contained' color='secondary'  >
                  <Button onClick={props.editData.bind(this, i.id)} >Edit</Button>
                  <Button onClick={props.deleteData.bind(this, i.id)} >Delete</Button>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default BasicTable
