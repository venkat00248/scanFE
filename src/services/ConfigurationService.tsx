/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpApiService from "./HttpApiService";

//  const configAPI = "http://h-app-scanner.s3-website-ap-southeast-2.amazonaws.com"
// //  const configAPIs = "http://happserver.ap-southeast-2.elasticbeanstalk.com/getTenantByName"
 const configAPI = "http://happserver-env-1.eba-xn6wqr76.ap-southeast-2.elasticbeanstalk.com"
 const configAPIs = "http://happserver-env-1.eba-xn6wqr76.ap-southeast-2.elasticbeanstalk.com/getTenantByName"

// const configAPI = "http://localhost:3000";
// const configAPIs = `${configAPI}/getTenantByName`;

// http://happserver-env-1.eba-xn6wqr76.ap-southeast-2.elasticbeanstalk.com
export class Configuration extends HttpApiService {
  constructor() {
    super(`${configAPI}`);
  }
  
  getConfiguration = ()=>{
    return this.get(`${configAPI}/config.json`)
  }
  getTenantDetails = (data:any)=>{
    return this.get(`${configAPIs}/?name=${data}`)
  }
  getLangHindi = ()=>{
    return this.get(`${configAPI}/hi.json`)
  }
  getLangEnglish = ()=>{
    return this.get(`${configAPI}/en.json`)
  }
 
}
export const ConfigurationService = new Configuration();