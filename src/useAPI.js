import { useState, useEffect } from "react";
import axios from "axios";

const useAPI = endpoint => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const response = await axios.get(endpoint);
    setData(response.data);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  return data;
};

export default useAPI;
