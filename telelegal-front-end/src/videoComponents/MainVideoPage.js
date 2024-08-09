import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./VideoComponent.css";
import CallInfo from "./CallInfo";
import ChatWindow from "./ChatWindow";
import ActionButtons from "./ActionButtons";
import addStream from "../redux-elements/actions/addStream";
import { useDispatch } from "react-redux";

const MainVideoPage = () => {
  // Get query string finder hook
  const [searchParams, setSearchParams] = useSearchParams();
  const [apptInfo, setApptInfo] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMedia = async () => {
      const constraints = {
        video: true, // Must have one constraint, just do not show it yet
        audio: false,
      };
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        // dispatch will send this function to redux dispatcher so all reducers will notify
        // we send 2 args, the who and the stream
        dispatch(addStream("localStream", stream));
      } catch (err) {
        console.log(err);
      }
    };
    fetchMedia();
  }, []);

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
      <ActionButtons />
    </div>
  );
};

export default MainVideoPage;
