/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from "@mui/icons-material/Delete";
import { ScanAppService } from '../../services/ScanAppService';
import { useConfig } from '../../config/config';

export default function DeleteItem({data}:any) {
  const config: any = useConfig();
  const tdata = config?.data[0];
  const [open, setOpen] = React.useState(false);
console.log("data from item", data)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const fetchData = async () => {
    try {
      const res = await ScanAppService.deleteItems({
         _ids: [data._id ], 
         status: false, 
        updated_by: tdata?._id
      })

      console.log("res", res);
      // setMenuItems(res.data.data);
      if (res && res.data) {
        // setRows(res.data.data);
      }
      // Frame the formData object based on the form field values
    } catch (error) {
      console.error("Error posting or updating data:", error);
      // Handle errors while posting or updating data
    } 
  };
  React.useEffect(() => {
    fetchData();
  }, []);
  return (
    <React.Fragment>
      <Button  onClick={handleClickOpen}>
      <DeleteIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you Sure Want to delete Item?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Yes</Button>
          <Button onClick={handleClose} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
