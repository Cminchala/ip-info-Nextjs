'use client';
import Image from "next/image";

import { useState , useEffect } from "react";

export default function Home() {
  const [ip, setIp] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/ip-info')
      .then(res => res.json())
      .then(data => {
        setIp(data.ip);
      })
      .catch((error) => {
        console.error('Error fetching IP:', error);
      });
  }, []);

  type IpInfo = {
    ip: string;
    countryName: string;
    cityName: string;
    regionName: string;
    zipCode: string;
    [key: string]: any;
  };

  const [ipinfo, setIpinfo] = useState<IpInfo | null>(null);

  useEffect(() => {
    const fetchIpInfo = async () => {
      const query = await fetch('https://freeipapi.com/api/json/8.8.8.8');
      const data = await query.json();
      console.log(data);
      setIpinfo(data);
    };
    fetchIpInfo();
  }, []);

  

  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1>Your IP Address: {ip}</h1>
      
      {ipinfo && (
      <div className="mt-4">
        <p>Country: {ipinfo.countryName}</p>
        <p>Region: {ipinfo.regionName}</p>
        <p>City: {ipinfo.cityName}</p>
        <p>ZipCode: {ipinfo.zipCode}</p>
      </div>
      )}
    </div>
    
  );
}
