/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useParams } from "react-router-dom";
// import { menuItems } from '../../Appconstant';
import "../layouts/Latest/Latest.scss";
import "./DashBoard.scss";
import { useEffect, useState } from "react";
import { ScanAppService } from "../../services/ScanAppService";
import { Button } from "react-bootstrap";
import { useConfig } from "../../config/config";
import { EditItemPopup } from "./EditItemPopup";
import DeleteItem from "./DeleteItem";
import { useFormData } from "../Items/stateManagement/FormDataContext";
import { RippleLoader } from "../Loader/RippleLoader";
// import { menuItems } from '../../../Appconstant';
export const DashBoard = () => {
  const { tenant } = useParams();
   const {menuItems, setMenuItems} =  useFormData()
const [loading, setLoading]= useState(false)
  const config: any = useConfig();
  const tdata = config?.data[0];
  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await ScanAppService.getItems(tdata?._id);

      console.log("res fro", res);
      if (res?.data?.data) {
        //check if data is defined ...
        const data = res.data.data;
        // setMenuItems(res.data.data);
        // sessionStorage.menuItem = JSON.stringify(data);
        setMenuItems(
          data.filter((item: any) => item.is_special && item.status == true)
        );
        setLoading(false)
        // setMenuItems(data);
      }

      // Frame the formData object based on the form field values
    } catch (error) {
      console.error("Error posting or updating data:", error);
      // Handle errors while posting or updating data
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(()=>{
    console.log("menuu Items", menuItems)
  },[menuItems])
  return (
    <div className="Latest minHeight">
      {loading ? <RippleLoader/>: <section className="section menu" id="menu">
        <div className="buttonWrapperr">
          {menuItems.length < 5 && (
            <Link to={`/${tenant}/addItems`}>
              {/* style={{background: `${config?.data[0]?.primary_color} !important`, color: `${config?.data[0]?.secondary_color}  !important`}}  */}
              <Button
                variant="contained"
                style={{
                  background: `${config?.data[0]?.primary_color}`,
                  color: `${config?.data[0]?.secondary_color} `,
                }}
              >
                {/* <AddIcon/> */}
                Add Items
              </Button>
            </Link>
          )}
        </div>

        {/* <div className="menu-container container">
          <div className="menu-content">
            <div className="menu-items">
              {menuItems.slice(0,5).map((menuItem:any, index:any) => (
                <div className="menu-item flex" key={index}>
                  <img src={menuItem.url} alt="" className="menu-img" />
                  <div className="menuItem-details">
                    <h6 className="menuItem-topic">{menuItem.name}</h6>
                    <p className="menuItem-des">{menuItem.name}</p>
                    <div className='spice'>
                      {[...Array(menuItem.spiceLevel)].map((_, index) => (
                        <img key={index} src='https://h-app-scanner.s3.ap-southeast-2.amazonaws.com/img/chilli.png' alt='hi'/>
                      ))}
                    </div>
                  </div>
                  <div className="menuItem-price flex">
                    <span className="discount-price">{menuItem.item_price}{menuItem.currency_code}</span>
                    <span className="real-price">{menuItem.promotional_price}{menuItem.currency_code}</span>
                  </div>
                </div>
              ))}
            </div>
</div>
        </div> */}
        <div className="" style={{margin:"10px"}}>
          <div className="row">
            <div className="col-12">
              <div className="card my-4">
                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                  <div
                    className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3"
                    style={{
                      background: `${config?.data[0]?.primary_color}`,
                      color: `${config?.data[0]?.secondary_color}  !important`,
                    }}
                  >
                    <h4
                      className="text-capitalize ps-3"
                      style={{ color: `${config?.data[0]?.secondary_color}` }}
                    >
                      All Items
                    </h4>
                  </div>
                </div>
                <div className="card-body px-0 pb-2">
                  <div className="table-responsive p-0">
                    <table className="table align-items-center justify-content-center mb-0">
                      <thead>
                        <tr>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Item Name
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Item Price
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Promotional Price
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Status
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">
                            Spicy level
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-1">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {console.log("length menu item,s", menuItems)}
                        {menuItems.length > 0 &&
                          menuItems.filter((item: any) => item.is_special && item.status == true)
                            .slice(0, 5)
                            .map((menuItem: any, index: any) => (
                              <tr>
                                <td>
                                  <div className="d-flex px-2">
                                    <div>
                                      <img
                                        src={menuItem.url}
                                        alt={menuItem.name}
                                        className="avatar avatar-sm rounded-circle me-2"
                                      />
                                    </div>
                                    <div className="my-auto">
                                      <h6 className="mb-0 text-sm">
                                        {menuItem.name}
                                      </h6>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <p className="text-sm font-weight-bold mb-0">
                                    {menuItem.currency_code == "AUD" ||
                                    menuItem.currency_code == "US"
                                      ? "$"
                                      : "₹"}
                                    {menuItem.item_price}
                                  </p>
                                </td>
                                <td>
                                  <p className="text-sm font-weight-bold mb-0">
                                    {menuItem.currency_code == "AUD" ||
                                    menuItem.currency_code == "US"
                                      ? "$"
                                      : "₹"}
                                    {menuItem.promotional_price}
                                  </p>
                                </td>
                                <td>
                                  <span className="text-xs font-weight-bold">
                                    <span className="badge badge-sm bg-gradient-success">
                                      {menuItem.status ? "Active" : "In-Active"}
                                    </span>
                                  </span>
                                </td>
                                <td className="align-middle text-center">
                                  {/* <div className="d-flex align-items-center justify-content-center">
                          <span className="me-2 text-xs font-weight-bold">60%</span>
                          <div>
                            <div className="progress">
                              <div className="progress-bar bg-gradient-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width: "60%;"}}></div>
                            </div>
                          </div>
                        </div> */}
                                  <div className="spice">
                                    {[...Array(menuItem.spicy_level)].map(
                                      (_, index) => (
                                        <img
                                          key={index}
                                          src="https://h-app-scanner.s3.ap-southeast-2.amazonaws.com/img/chilli.png"
                                          alt="hi"
                                        />
                                      )
                                    )}
                                  </div>
                                </td>
                                <td className="align-middle text-center">
                                  <button className="btn btn-link text-secondary mb-0">
                                    {/* <i className="fa fa-edit text-xs"></i> */}
                                    <EditItemPopup data={menuItem} id={index}/>
                                  </button>
                                  <button className="btn btn-link text-secondary mb-0">
                                    {/* <i className="fa fa-trash-can  text-xs"></i> */}
                                    <DeleteItem data={menuItem} />
                                  </button>
                                </td>
                              </tr>
                            ))}
                        {menuItems.length <= 0 && (
                          <tr>
                            <td>
                              {" "}
                              <div className="d-flex px-2">
                                {" "}
                                You don't have items. Pls. add new item
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>}
    </div>
  );
};
