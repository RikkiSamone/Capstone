import React, { useEffect, useRef } from 'react';

const VideoChat = ({ roomName }) => {
  const jitsiContainerRef = useRef(null);

  useEffect(() => {
    const domain = "meet.jit.si";
    const options = {
      roomName: roomName,
      width: "100%",
      height: "100%",
      parentNode: jitsiContainerRef.current,
      configOverwrite: { startWithAudioMuted: true },
      interfaceConfigOverwrite: {
        filmStripOnly: false,
      },
    };

    const api = new window.JitsiMeetExternalAPI(domain, options);

    return () => {
      api.dispose(); // Clean up when the component unmounts
    };
  }, [roomName]);

  return (
    <div ref={jitsiContainerRef} style={{ width: "100%", height: "600px" }}></div>
  );
};

export default VideoChat;