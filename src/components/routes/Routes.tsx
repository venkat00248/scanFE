// import { SocialLoginList } from "../Social/SocialLoginList";

import { AdminDashBoard } from "../AdminDashBoard/AdminDashBoard";
import { DashBoard } from "../DashBoard/DashBoard";
import { LogIn } from "../Dialog/LogIn";
import { LoginDialog } from "../Dialog/LoginDialog";
import { Home } from "../Home/Home";
import { Items } from "../Items/Items";
import { PacManLoader } from "../Loader/PacManLoader";
import { RippleLoader } from "../Loader/RippleLoader";
import { TenantLogIn } from "../Tenant/TenantLogIn";
import { Latest } from "../layouts/Latest/Latest";
import { MultiFileUpload } from "../multiFileUpload/multiFileUpload";
import { Onboarding } from "../payment/Onboarding";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Routes:any = [
    //routes
    // { path: "custom", element: <Header /> },
    { path: "/:tenant/home", element: <Home />,showHeader:true  },
    {path:"/:tenant/latest", element: <Latest/>},
    {path:"/:tenant/login", element: <LoginDialog/>},
    {path:"/:tenant/onboarding", element: <Onboarding/>,showHeader: false},
    {path:"/:tenant/addItems", element: <Items/>},
    {path:"/:tenant/loader", element: <RippleLoader/>},
    {path:"/:tenant/pmloader", element: <PacManLoader/>},
    {path:"/:tenant/tenantLogin", element: <TenantLogIn/>,showHeader: false  },
    { path: "/:tenant/", element: <TenantLogIn />, index: true,showHeader: false  },
    {path:"/:tenant/dashBoard", element:<DashBoard/>, showHeader:true},
    {path:"/adminDashBoard", element:<AdminDashBoard/>, showHeader:true},
    {path:"/adminLogin", element:<LogIn/>, showHeader:true},
    {path:"/multifile", element:<MultiFileUpload/>, showHeader:true}
   
   
  ];
  
