import axios from "axios";

// const BASEURL = process.env.NEXT_PUBLIC_BASE_URL_BE;
const BASEURL = 'http://localhost:8001/api';

export default axios.create({
  baseURL: BASEURL,
});