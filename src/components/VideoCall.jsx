import React, { useEffect, useRef, useState } from "react";
import { createSocketConnection } from "../utils/socket";
import { useParams } from "react-router-dom";

const VideoCall = () => {
  const { targetUserId } = useParams();
  const remoteVideoRef = useRef(null);
  const [socket, setSocket] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);

  useEffect(() => {
    const socket = createSocketConnection();
    setSocket(socket);

    const pc = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    });

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", {
          target: targetUserId,
          candidate: event.candidate,
        });
      }
    };

    pc.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    setPeerConnection(pc);

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        stream.getTracks().forEach((track) => pc.addTrack(track, stream));
      });

    socket.on("offer", async (data) => {
      await pc.setRemoteDescription(new RTCSessionDescription(data.offer));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      socket.emit("answer", { target: data.from, answer });
    });

    socket.on("answer", async (data) => {
      await pc.setRemoteDescription(new RTCSessionDescription(data.answer));
    });

    socket.on("ice-candidate", async (data) => {
      try {
        await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
      } catch (e) {
        console.error("Error adding received ice candidate", e);
      }
    });

    return () => {
      pc.close();
      socket.disconnect();
    };
  }, [targetUserId]);

  const startCall = async () => {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    socket.emit("offer", { target: targetUserId, offer });
  };

  return (
    <div>
      <video ref={remoteVideoRef} autoPlay />
      <button onClick={startCall}>Start Call</button>
    </div>
  );
};

export default VideoCall;
