import React, { useState, useEffect } from "react";
import { FaLocationArrow } from "react-icons/fa6";
const UserLocation = () => {
  const [ipaddress, setIpaddress] = useState("");
  const [geolocation, setGeolocation] = useState([]);
  useEffect(() => {
    getIpaddress();
  }, []);
  const getIpaddress = async () => {
    try {
      const response = await fetch("https://api.ipify.org");
      const data = await response.text();
      setIpaddress(data);
      handleGeoLocation();
    } catch (error) {
      console.error("Error fetching IP address:", error);
    }
  };
  const handleGeoLocation = async () => {
    try {
      const response = await fetch(`http://ip-api.com/json/${ipaddress}`);
      const data = await response.json();
      setGeolocation(data);
    } catch (error) {
      console.error("Error fetching Geo Location:", error);
    }
  };
  return (
    <>
      <div className="container">
        <h3 className="text-success mb-5">Get User Location Information</h3>
        <div className="row g-3">
          <div className="col-auto">
            <label htmlFor="ipaddress" className="m-2 fw-bold">
              IP Address:
            </label>
          </div>
          <div className="col-auto">
            <input
              type="text"
              className="form-control"
              id="ipaddress"
              value={ipaddress}
              onChange={(e) => setIpaddress(e.target.value)}
              autoFocus
            />
          </div>
          <div className="col-auto">
            <button
              type="submit"
              className="btn btn-primary mb-3"
              onClick={handleGeoLocation}
            >
              <FaLocationArrow /> Get Info
            </button>
          </div>
        </div>
        {ipaddress && geolocation.country && (
          <div className="card bg-success" style={{ width: "30rem" }}>
            <div className="card-header text-white fw-bold">IP Geolocation</div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <b>Country: </b>
                {geolocation.country}({geolocation.countryCode})
              </li>
              <li className="list-group-item">
                <b>Region: </b>
                {geolocation.regionName}({geolocation.region})
              </li>
              <li className="list-group-item">
                <b>City: </b>
                {geolocation.city}
              </li>
            </ul>
          </div>
        )}
        {ipaddress && !geolocation.country && (
          <div className="card bg-danger" style={{ width: "30rem" }}>
            <div className="card-header text-white fw-bold">No Data Found!</div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserLocation;
