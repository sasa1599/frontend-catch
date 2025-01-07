import axios from "axios";

// const BASEURL = process.env.NEXT_PUBLIC_BASE_URL_BE;
const BASEURL = 'https://catch-your-moment.vercel.app/api';

export default axios.create({
  baseURL: BASEURL,
});
