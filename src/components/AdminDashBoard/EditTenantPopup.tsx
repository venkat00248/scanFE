/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import './Styles.scss'
import { EditTenant } from "./EditTenant";
import EditIcon from '@mui/icons-material/Edit';
import { useTenantFormData } from "../payment/stateManagement/FormDataContext";

type Anchor = "top" | "left" | "bottom" | "right";

export const EditTenantPopup = ({item, data}:any) => {


  const {
    setTenantDetails,
    setThemeDetails,
    setFileSrc
    
  } = useTenantFormData();
  React.useEffect(() => {
    console.log("Setting tenant details:", data);
    if(data){
    setTenantDetails({tenantName:data.row.name,email:data.row.email });
    setThemeDetails({ primaryColor: data.row. primary_color, secondaryColor: data.row.secondary_color })
    setFileSrc(data.row.url)
    }
  }, []);
    console.log("itemmm", data)
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (
    <Box
      //   sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }},
      height="87vh"
      // width="120px"
      role="presentation"
      // onClick={toggleDrawer("bottom", false)}
      // onKeyDown={toggleDrawer("bottom", false)}
      // style={{background:"#000"}}
    >
      <button
       className="closeicon"
        onClick={toggleDrawer("bottom", false)}
      >
        <CloseIcon  />
      </button>
     <EditTenant item={item}/>
    </Box>
  );

  return (
    <div>
      <React.Fragment key={"bottom"}>
        <Button onClick={toggleDrawer("bottom", true)}><EditIcon sx={{ fontSize: 20 }}/></Button>
        <Drawer
          anchor={"bottom"}
          open={state["bottom"]}
          onClose={toggleDrawer("bottom", false)}
                >
          {list}
        </Drawer>
      </React.Fragment>
    </div>
  );
};
