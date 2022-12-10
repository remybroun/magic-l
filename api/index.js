import axios from "axios";
import * as qs from 'qs';
import {useUser} from '@/hooks/useUser';



export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Authorization",
    'X-Requested-With': 'XMLHttpRequest',
  },
    withCredentials: true,

});


instance.interceptors.response.use(response => {

    return response
  }, error => {
      // store.dispatch(dispatchAPIResponse(error.response))


    if(error?.response?.status === 401){

      axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/token/refresh/`, {"refresh": localStorage.getItem("refresh")}).then((response)=>{
        localStorage.setItem("jwt", response.data.access);
      })
    }
      return Promise.reject(error);
  }) 

instance.interceptors.request.use(
  async (config) => {
    config.headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export const api = {
  auth() {
    return {
      login: (userName, password) => instance.post(`api/token/`, {"username": userName, "password": password}),
      refresh: (refresh) => instance.post(`api/token/refresh/`, {"refresh": refresh}),
      logout: () => instance.post(`auth/logout`),
      loadUser: () => instance.post(`auth/user`),
    };
  },
  alerts() {
    return { 
      get: (params, offset=5) => instance.get(`api/watch/alerts?offset=${(params.page-1)*offset}/${params.search ? ("&search=" + params.search) : ""}`),
      one: (id) => instance.get(`api/watch/alerts/${id}`),
    };
  },
  transcripts() {
    return {
      get: (params, offset=5) => instance.get(`api/watch/transcripts?offset=${(params.page-1)*offset}/${params.search ? ("&search=" + params.search) : ""}`),
      one: (id) => instance.get(`api/watch/transcripts/${id}`),
    };
  },
  documents() {
    return {
      get: (page, offset=5) => instance.get(`api/watch/documents?offset=${(page-1)*offset}`),
      createDocument: (obj) => instance.post(`api/watch/documents/`, obj),
      download: (id) => instance.get(`api/watch/documents/${id}`),
    };
  },
};

