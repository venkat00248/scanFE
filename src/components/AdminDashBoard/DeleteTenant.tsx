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
import { ScanAppService } from '../../services/ScanAppService';
import { useConfig } from '../../config/config';
import { useTenantFormData } from '../payment/stateManagement/FormDataContext';
import { Alert } from '@mui/material';

export default function DeleteTenant({data}:any) {
  const [open, setOpen] = React.useState(false);
  const config: any = useConfig();
  const tdata = config?.data[0];
  const [statusFlag, setStatusFlag] = React.useState("");
  const { rows, setRows } = useTenantFormData();
console.log("data from dete", data)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const deleteTenant = async () => {
    try {
      const res = await ScanAppService.deleteTenants({
        _ids: [data._id],
        status: false,
        updated_by: tdata?._id,
      });

      console.log("res", res);
      // setMenuItems(res.data.data);
      if (res && res.data) {
        // setRows(res.data.data);
        if (res?.data?.statusCode === 200) {
          setStatusFlag("success");
          setTimeout(() => {
          setStatusFlag("");
          setOpen(false);
          },6000)
          // const data = res?.data?.data[0];

          // setMenuItems(menuItems.filter((item: any) => {
          //   if (item._id == data._id) {
          //       item.status = data.status;
          //   }
          // }))

          // setRows((items: any) => {
          //   const updatedItems = items.map((item: any) => {
          //     if (item._id === data._id) {
          //       // Use a single "=" to update the status property
          //       item.status = data.status;
          //     }
          //     return item;
          //   });

          //   return updatedItems;
          // });
          console.log("menu Items 111", rows);
        }
      }
      // Frame the formData object based on the form field values
    } catch (error) {
      console.error("Error posting or updating data:", error);
      // Handle errors while posting or updating data
    }
  };


  return (
    <React.Fragment>
      <IconButton color="primary"  onClick={handleClickOpen}>
      <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you Sure Want to delete Tenant?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {statusFlag != "" && (
              <div>
                <Alert onClose={() => {}}>{`${statusFlag}`}</Alert>
              </div>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteTenant}>Yes</Button>
          <Button onClick={handleClose} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
