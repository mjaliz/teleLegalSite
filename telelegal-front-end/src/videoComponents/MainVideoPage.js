import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./VideoComponent.css";
import CallInfo from "./CallInfo";
import ChatWindow from "./ChatWindow";

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
    <div className="main-video-page">
      <div className="video-chat-wrapper">
        {/* Div to hold our remote video, our local video and our chat window */}
        <video id="large-feed" autoPlay controls playsInline></video>
        <video id="own-feed" autoPlay controls playsInline></video>
        {apptInfo.proffessionalsFullName ? (
          <CallInfo apptInfo={apptInfo} />
        ) : (
          <></>
        )}
        {<ChatWindow />}
      </div>
    </div>
  );
};

export default MainVideoPage;
