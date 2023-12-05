"use client";
import { useEffect, useState } from "react";
import Card from "./components/Card";
import Device from "./components/Device";

function isValidCIDR(input) {
  const cidrRegex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})(\/\d{2})$/;
  const match = input.match(cidrRegex);

  if (!match) {
    return false;
  }

  // check valid range (0-255)
  for (let i = 1; i <= 4; i++) {
    const octet = parseInt(match[i], 10);
    if (isNaN(octet) || octet < 0 || octet > 255) {
      return false;
    }
  }

  // subnet mask
  if (match[5]) {
    const subnetMask = parseInt(match[5].substring(1), 10);
    if (isNaN(subnetMask) || subnetMask < 0 || subnetMask > 31) {
      return false;
    }
  }

  return true;
}

function filterObjectsBySubstring(objects, searchString, set) {
  if (searchString === "") {
    return objects;
  }
  const searchLowerCase = searchString.toLowerCase();

  return objects.filter((obj) => {
    for (let key in obj) {
      if (
        obj.hasOwnProperty(key) &&
        typeof obj[key] === "string" &&
        obj[key].toLowerCase().includes(searchLowerCase)
      ) {
        return true;
      }
    }
    return false;
  });
}

export default function Home() {
  const [data, setData] = useState([]);
  const [network, setnetwork] = useState("");
  const [text, settext] = useState("");
  const [hosts, sethosts] = useState(0);
  const [retries, setretries] = useState(3);
  const [timeout, settimeout] = useState(15);
  const [scan, setscan] = useState(false);
  const [animate, setanimate] = useState(false);
  const [filter, setfilter] = useState("");
  const [mask, setmask] = useState("");

  const validate = ({ text }) => {
    if (isValidCIDR(text)) {
      setnetwork(text);
      setscan(true);
    }
  };

  useEffect(() => {
    if (scan) {
      fetch(`http://127.0.0.1:5000/api/networkscan?network=${network}&retries=${retries}&timeout=${timeout}
      `)
        .then((response) => response.json())
        .then((response) => setData(JSON.parse(response)))
        .then(console.log);
      sethosts(data.length);
      setscan(false);
      const msk = network.split("/");
      setmask(msk[1]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scan]);

  return (
    <main className="flex flex-col h-max p-5 w-max rounded-l-3xl bg-white space-y-5 justify-self-center">
      <div className="flex flex-col p-5 bg-blue-50 rounded-xl w-max self-center space-y-3 text-black shadow-xl">
        <p>Network</p>
        <input
          className="text-black rounded-xl shadow-xl p-2"
          placeholder="Eg: 10.10.10.0/24"
          onChange={(event) => settext(event.target.value)}
        ></input>
        <p>Number of retries</p>
        <input
          className="text-black rounded-xl shadow-xl p-2"
          placeholder="Retries: 5"
          onChange={(event) => setretries(event.target.value)}
        ></input>
        <p>Timeout</p>
        <input
          className="text-black rounded-xl shadow-xl p-2"
          placeholder="Timeout: 15(s)"
          onChange={(event) => settimeout(event.target.value)}
        ></input>
        <button
          className={`bg-black text-white rounded-xl p-2 shadow-md hover:bg-green-200 duration-300 hover:text-black hover:shadow-green-500 ${
            animate && "animate-ping"
          }`}
          onClick={() => validate({ text })}
          onMouseDown={() => setanimate(true)}
          onMouseUp={() => setanimate(false)}
        >
          Scan
        </button>
      </div>

      {data.length > 0 ? (
        <>
          <div className="flex flex-row space-x-5 align-middle items-center">
            <Card
              title={`Network: ${network}`}
              subtitles={[`Mask: ${mask}`, `Host capacity: ${hosts}`]}
            />
            <Card title={data.length} subtitles={["Active"]} />
            <Card title={12} subtitles={["Network devices"]} />
          </div>

          <input
            className="text-black rounded-full justify-self-center p-5 bg-blue-50 shadow-2xl border-2 border-blue-100 "
            placeholder="Search:"
            onChange={(event) => setfilter(event.target.value)}
          />

          <div className="grid grid-flow-row grid-cols-3 gap-4 p-2 items-center content-center justify-center w-content">
            {filterObjectsBySubstring(data, filter).map((device) => (
              <Device
                key={device.mac}
                ip={device.ip}
                mac={device.mac}
                vendor={device.vendor}
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
