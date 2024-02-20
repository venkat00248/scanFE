/* eslint-disable @typescript-eslint/no-explicit-any */
// import { menuItems } from '../../../Appconstant';
import './Latest.scss';


export const Latest = () => {
  const menuItems = sessionStorage.tenant_items ? JSON.parse(sessionStorage.tenant_items) : [];
  const config = sessionStorage.appConfig ? JSON.parse(sessionStorage.appConfig) : [];
  const tenantName = config?.data[0]?.name;
  console.log("menu Items", menuItems)
  return (
    <div className='Latest'>
      <section className="section menu" id="menu">
        <div style={{"marginTop":"25px","textAlign":"center","fontSize":"20px"}}>{tenantName} <i>Items</i></div>
        <div className="menu-container container">
          <div className="menu-content">
            <div className="menu-items">
              {menuItems.length ? menuItems.map((menuItem:any, index:number) => (
                <div className="menu-item flex" key={index}>
                  <img src={menuItem.url} alt="" className="menu-img" />
                  <div className="menuItem-details"> 
                    <h6 className="menuItem-topic">{menuItem.name}</h6>
                    <p className="menuItem-des">{menuItem.item_desc}</p>
                    <div className='spice'>
                      {[...Array(menuItem.spicy_level)].map((_, index) => (
                        <img key={index} src='https://h-app-scanner.s3.ap-southeast-2.amazonaws.com/img/chilli.png' alt='hi'/>
                      ))}
                    </div>
                  </div>
                  <div className="menuItem-price flex">
                    <span className="discount-price">  {menuItem.currency_code == "AUD" ||
                                  menuItem.currency_code == "US"
                                    ? "$"
                                    : "₹"}{menuItem.promotional_price}</span>
                    <span className="real-price">  {menuItem.currency_code == "AUD" ||
                                  menuItem.currency_code == "US"
                                    ? "$"
                                    : "₹"}{menuItem.item_price}</span>
                  </div>
                </div>
              )): <div className="container"> <img src='https://www.shutterstock.com/image-photo/restaurant-blackboard-announcing-reopening-after-600nw-1735273409.jpg' className='img'/></div>}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
