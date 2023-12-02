/* eslint-disable @typescript-eslint/no-explicit-any */
import "./AdminDashBoard.scss";

import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { ScanAppService } from "../../services/ScanAppService";
import { RippleLoader } from "../Loader/RippleLoader";
import { EditTenantPopup } from "./EditTenantPopup";
import DeleteTenant from "./DeleteTenant";
import { Alert } from "@mui/material";
interface Column {
  id:
    | "name"
    | "email"
    | "url"
    | "currency_code"
    | "primary_color"
    | "secondary_color"
    | "action"
    | "Delete"
    | "generateQR";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: string | number, column:any) => string | JSX.Element | undefined;
}


export const AdminDashBoard = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loading, setLoading] = React.useState(true);
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    console.log("event", event)
    setPage(newPage);
  };
 const handleGenerateQR = async(column:any) =>{

  console.log("iyee", column?.row)
  const res = await ScanAppService.genateQR({tenantName:column?.row?.name, email:column?.row?.email})
  if(res?.data?.data) {
    // setIsNotOnboarded(false);
    setResponse({message:res.data.data.message, statusCode:res.data.statusCode})
    setTimeout(()=>{
    setResponse({message:"", statusCode:0})

    },3000)
  }
  console.log("res",res, column)
 }
  const columns: readonly Column[] = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "email", label: "Email", minWidth: 100 },
    {
      id: "url",
      label: "Logo",
      // minWidth: 170,
      align: "right",
      format: (value: string | number) => <img src={String(value)} alt="Logo" />,
    },
    {
      id: "currency_code",
      label: "Currency code",
      minWidth: 170,
      align: "right",
      // format: (value: number | string) => value.toLocaleString('en-US'),
    },
    {
      id: "primary_color",
      label: "Primary Color",
      minWidth: 170,
      align: "right",
      // format: (value: number | string) => value.toFixed(2),
    },
    {
      id: "secondary_color",
      label: "Secondary color",
      minWidth: 170,
      align: "right",
      // format: (value: number) => value.toFixed(2),
    },
  
    {
      id: "action",
      label: "Action",
      minWidth: 170,
      align: "right",
      format: (item: any, column:any) => <EditTenantPopup item={item} data={column} />,
    },
    {
      id: "Delete",
      label: "Delete",
      minWidth: 170,
      align: "right",
      format: ( column:any) => <DeleteTenant data={column} />,
  
    },
    {
      id: "generateQR",
      label: "Generate QR",
      minWidth: 170,
      align: "right",
      format: (item: any, column: any) => <button  className="btn btn-primary" onClick={()=>{handleGenerateQR(column); console.log("co;um", item)}}>Generate QR</button>,
    }
    
  ];
  const [response , setResponse]= React.useState({message: "",statusCode: 0})
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [rows, setRows] = React.useState([]);
  const fetchData = async () => {
    try {
      setLoading(false);
      const res = await ScanAppService.getTenants();

      console.log("res", res);
      // setMenuItems(res.data.data);
      if (res && res.data) {
        setRows(res.data.data);
      }
      // Frame the formData object based on the form field values
    } catch (error) {
      console.error("Error posting or updating data:", error);
      // Handle errors while posting or updating data
    } finally {
      setLoading(false); // Set loading to false whether the API call succeeds or fails
    }
  };
  React.useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="adminDashBoard">
      {loading ? ( // Show loading message or spinner when loading is true
        <RippleLoader />
      ) : (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
           {response.statusCode==200 &&  
          <Alert >
         QR code is sent to your Registerd Email ID
          </Alert>
        } 
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1}>
                        {columns.map((column:any) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {/* {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value} */}
                              {column.format
                                ? column.format(value as string | number, column={row})
                                : String(value)}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </div>
  );
};
