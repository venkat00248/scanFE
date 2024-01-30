/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import Button from '@mui/material/Button';
import IconButton from "@mui/material/IconButton";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from "@mui/icons-material/Delete";
import { useConfig } from '../../config/config';
export default function Review() {
  const config: any = useConfig();
  // console.log(window.location.pathname.split('/')?.[1]);
  // console.log("pathhhh",window.location);
  console.log("config from tenant", config?.data[0].business_url);
  const [open, setOpen] = React.useState(true);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
const handleClick = ()=>{
 
  const otherApplicationURL =  config? config?.data[0].business_url :'https://g.page/r/CZm8bL5bE_yTEB0/review'
  window.open(otherApplicationURL, '_blank');
  setOpen(false);
}
  return (
    <React.Fragment>
      <IconButton color="primary" style={{display:"none"}} onClick={handleClickOpen}>
      <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Customer Review ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Your Valuable Review Help us to grow Higher
         
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClick}>Yes</Button>
          <Button onClick={handleClose} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
