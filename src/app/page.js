"use client";
import { useEffect, useState } from "react";
import Card from "./components/Card";
import DifferentLength from "./components/Chart";
import Device from "./components/Device";

function isValidCIDR(input) {
  // Regular expression for CIDR notation
  const cidrRegex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})(\/\d{2})$/;

  // Check if the input matches the CIDR notation
  const match = input.match(cidrRegex);

  if (!match) {
    return false;
  }

  // Check if each IP component is within the valid range (0-255)
  for (let i = 1; i <= 4; i++) {
    const octet = parseInt(match[i], 10);
    if (isNaN(octet) || octet < 0 || octet > 255) {
      return false;
    }
  }

  // Check if the subnet mask (if present) is valid
  if (match[5]) {
    const subnetMask = parseInt(match[5].substring(1), 10);
    if (isNaN(subnetMask) || subnetMask < 0 || subnetMask > 32) {
      return false;
    }
  }

  return true;
}

export default function Home() {
  const [data, setData] = useState([]);
  const [network, setnetwork] = useState("");
  const [networkstring, setnetworkstring] = useState("");

  const scan = ({ networkstring}) => {
    if (isValidCIDR(networkstring)) {
      console.log(networkstring);
      setnetwork(networkstring);
    }
  };
  

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/networkscan?network=${network}`)
      .then((response) => response.json())
      .then((response) => setData(JSON.parse(response)))
      .then(console.log);
  }, [network]);

  const mask = "255.255.255.0";
  const hosts = 250;

  return (
    <main className="flex flex-col h-max p-5 w-full rounded-l-3xl bg-white space-y-5">
      <div className="flex flex-col p-5 bg-blue-200 rounded-xl w-max self-center space-y-3 text-black">
        <input
          className="text-black"
          placeholder="Network to be scanned...."
          onChange={(event) => setnetworkstring(event.target.value)}
        ></input>
        <button
          className="bg-green-300 rounded-xl p-2"
          onClick={() => scan({ networkstring, setnetwork })}
        >
          Press me
        </button>
      </div>

      {data.length > 0 ? (
        <>
          <div className="flex flex-row space-x-5 align-middle items-center">
            <Card
              title={`Network: ${network}`}
              subtitles={[`Mask: ${mask}`, `Host capacity: ${hosts}`]}
            />
            <Card title={200} subtitles={["Active"]} />
            <Card title={12} subtitles={["Network devices"]} />
          </div>

          <div className="grid grid-flow-row grid-cols-6 gap-4 p-2 items-center content-center justify-center">
            {data.map((objeto) => (
              <Device
                key={objeto.mac}
                ip={objeto.ip}
                mac={objeto.mac}
                vendor={objeto.vendor}
              ></Device>
            ))}
          </div>
        </>
      ) : (
        <></>
      )}
    </main>
  );
}
