import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

 function BasicTable(props) {
  const classes = useStyles();
  

// console.log(props.showAllData)
  return (
 
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell >EDIT/DELETE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.showAllData.map((i,index) => (
            <TableRow key={i.firstName}>
              {/* <TableCell component="th" scope="row">
              </TableCell> */}
              <TableCell >{i.firstName}</TableCell>
              <TableCell >{i.lastName}</TableCell>
              <TableCell >{i.age}</TableCell>
              <TableCell>
                <ButtonGroup varient='contained' color='secondary'>
               <Button onClick={props.editData.bind(this,i.id)} >Edit</Button>
              <Button onClick={props.deleteData.bind(this,i.id)} >Delete</Button>
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
