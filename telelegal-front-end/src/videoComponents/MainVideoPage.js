import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const MainVideoPage = () => {
  // Get query string finder hook
  const [searchParams, setSearchParams] = useSearchParams();
  const [apptInfo, setApptInfo] = useState({});
  useEffect(() => {
    // Grab token from query string
    const token = searchParams.get("token");
    console.log(token);
    const fetchDecodedToken = async () => {
      const res = await axios.post("https://localhost:9000/validate-link", {
        token,
      });
      console.log(res.data);
      setApptInfo(res.data);
    };
    fetchDecodedToken();
  }, []);

  return (
    <div>
      {apptInfo.proffessionalsFullName} at {apptInfo.apptDate}
    </div>
  );
};

export default MainVideoPage;
