import React, { useState, useEffect, useRef } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";

const APP_ID = "6f8f0531c23e4710bf58e93327268310";
const TOKEN =
  "007eJxTYDCadmFbS/yKWxkvN3vKpvtuNrPbvlVUbevuz6Y223wuTJBVYDBLs0gzMDU2TDYyTjUxNzRISjO1SLU0NjYyNzKzMDY0CBGfk9YQyMiw0ySRhZEBAkF8VgaP5NKkVAYGAFSEHlg=";
const CHANNEL = "Hcube";

const client = AgoraRTC.createClient({
  mode: "rtc",
  codec: "vp8",
});

const Videocall = () => {
  const [joined, setJoined] = useState(false);

  const VideoPlayer = ({ user }) => {
    const ref = useRef();

    useEffect(() => {
      user.videoTrack.play(ref.current);
      return () => {
        user.videoTrack.stop();
      };
    }, [user.videoTrack]);

    return (
      <div>
        Uid: {user.uid}
        <div ref={ref} style={{ width: "400px", height: "400px" }}></div>
      </div>
    );
  };

  const VideoRoom = () => {
    const [users, setUsers] = useState([]);
    const [localTracks, setLocalTracks] = useState([]);

    const handleUserJoined = async (user, mediaType) => {
      await client.subscribe(user, mediaType);

      if (mediaType === "video") {
        setUsers((previousUsers) => [...previousUsers, user]);
      }

      if (mediaType === "audio") {
        user.audioTrack.play();
      }
    };

    const handleUserLeft = (user) => {
      setUsers((previousUsers) =>
        previousUsers.filter((u) => u.uid !== user.uid)
      );
    };

    useEffect(() => {
      client.on("user-published", handleUserJoined);
      client.on("user-left", handleUserLeft);

      const init = async () => {
        try {
          const uid = await client.join(APP_ID, CHANNEL, TOKEN, null);
          const [audioTrack, videoTrack] =
            await AgoraRTC.createMicrophoneAndCameraTracks();
          setLocalTracks([audioTrack, videoTrack]);
          setUsers((previousUsers) => [
            ...previousUsers,
            { uid, videoTrack, audioTrack },
          ]);
          await client.publish([audioTrack, videoTrack]);
        } catch (error) {
          console.error("Failed to join the channel:", error);
        }
      };

      init();

      return () => {
        // Cleanup tracks and client
        localTracks.forEach((track) => {
          track.stop();
          track.close();
        });
        client.unpublish(localTracks).then(() => client.leave());
        client.off("user-published", handleUserJoined);
        client.off("user-left", handleUserLeft);
      };
    }, [localTracks]);

    return (
      <div className="p-4 border border-gray-300 rounded-md shadow-sm">
        {users.map((user) => (
          <VideoPlayer key={user.uid} user={user} />
        ))}
      </div>
    );
  };

  return (
    <>
      <h1>Consultation with Dr. Juhi</h1>
      {!joined && <button onClick={() => setJoined(true)}>Join now</button>}
      {joined && <VideoRoom />}
    </>
  );
};

export default Videocall;
