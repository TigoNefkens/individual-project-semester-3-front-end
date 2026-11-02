import React, { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import Online from "../assets/online.png"

const OnlineCount = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const client = new Client({
      webSocketFactory: () => socket,
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("STOMP connected");

        client.subscribe("/topic/online-count", (message) => {
          setCount(Number(message.body));
        });

        publishOnline();
      },
    });

    client.activate();

    const publishOnline = () => {
      if (client.connected) {
        client.publish({ destination: "/app/user/online", body: "" });
      } else {
        setTimeout(publishOnline, 100);
      }
    };

    const publishOffline = () => {
      if (client.connected) {
        client.publish({ destination: "/app/user/offline", body: "" });
      }
    };

    const handleBeforeUnload = () => {
      publishOffline();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      publishOffline();
      window.removeEventListener("beforeunload", handleBeforeUnload);
      client.deactivate();
    };
  }, []);

  return (
    <div style={{display:"flex", flexDirection:"row", margin:"0px", justifyContent:"center"}}>
        <img src={Online} style={{width:"10%", height:"10%", marginTop:"3%"}}></img>
      <h3>Active users: {count}</h3>
    </div>
  );
};

export default OnlineCount;
