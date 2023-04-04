import axios from "axios";
const fetch = (url: string) => axios.get(url).then((res) => res.data);
export default fetch;