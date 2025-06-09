'use client';
import { get } from "http";
import Image from "next/image";

import { useState , useEffect } from "react";
import Map from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

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
      const query = await fetch('https://freeipapi.com/api/json/');
      const data = await query.json();
      console.log(data);
      setIpinfo(data);
    };
    fetchIpInfo();
  }, []);


    const [location , setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      }
      ,
      (error) => {
        console.error('Error getting location:', error);
      }
    );
  }, []);
  
return (
  <div className="flex items-center justify-center min-h-screen">
    <div className="flex flex-col items-center space-y-6">
      <h1>Your IP Address: {ip}</h1>

      {ipinfo && (
        <div>
          <p>Country: {ipinfo.countryName}</p>
          <p>Region: {ipinfo.regionName}</p>
          <p>City: {ipinfo.cityName}</p>
          <p>ZipCode: {ipinfo.zipCode}</p>
        </div>
      )}

      {location && (
        <div>
          <h5 className="text-sm font-bold">
            Your Location from browser using navigator.geolocation.getCurrentPosition
          </h5>
          <h5 className="text-sm font-bold">[Allow First From Browser]</h5>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      )}
      
    </div>
  </div>
);
}
