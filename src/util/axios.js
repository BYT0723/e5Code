import axios from "axios";
import cookie from "./cookie";

class HttpRequest {
  constructor(baseUrl){
    this.baseUrl = baseUrl
  }

  getConfig(){
    const config = {
      baseUrl: this.baseUrl,
      header: {
        'Content-Type': 'application/json;charset=utf-8',
      }
    }
    return config
  }

  request(param){
    axios.defaults.headers.common
    const instance = axios.create({
      baseURL: this.baseUrl
    })
    instance.defaults.headers.common['Authorization'] = cookie.getCookie('token');
    param = { ...this.getConfig(), ...param }
    return instance(param)
  }
}


export const user =  new HttpRequest("http://127.0.0.1:8051");
export const project = new HttpRequest("http://127.0.0.1:8052");
