const { default: axios } = require("axios");
const { useState, useMemo, useEffect } = require("react");

export const useFetch = (url, method = "GET", options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refreshIndex, setRefreshIndex] = useState(0);
  const optionString = JSON.stringify(options);
  const requestOptions = useMemo(() => {
    const opts = { ...options };
    if (method === "POST" && !opts.data) {
      opts.data = {};
    }
    return opts;
  }, [method, optionString]);
  useEffect(() => {
    const apiCall = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data: responce } = await axios({
          url,
          method,
          ...requestOptions,
        });
        if (!responce.success) {
          throw new Error(responce?.message);
        }
        setData(responce);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    apiCall();
  }, [url, refreshIndex, requestOptions]);
  const refetch = () => {
    setRefreshIndex((prev) => prev + 1);
  };
  return { data, loading, error, refetch };
};
