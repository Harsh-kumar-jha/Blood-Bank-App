import React, { useEffect, useState } from "react";
import Header from "../../components/shared/Layout/Header";
import API from "../../services/API";
import moment from "moment";

const Analytics = () => {
  const [data, setData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const color = [
    "#884A39",
    "#C38154",
    "#FFC26F",
    "#4F709C",
    "#4942E4",
    "#0079FF",
    "#FF0060",
    "#22A699",
  ];

  // Get Recent Blood Group data
  const getRecentBloodRecord = async () => {
    const { data } = await API.get("/inventory/get-recent-inventory");
    if (data?.success) {
      setInventoryData(data?.inventory);
    }
    try {
    } catch (error) {
      console.log(`Error Occur at HomePage Component : ${error}`);
    }
  };

  useEffect(() => {
    getRecentBloodRecord();
  });

  // Get Blood Group data
  const getBloodGroupData = async () => {
    try {
      const { data } = await API.get("/analytics/bloodGroup-data");
      if (data?.success) {
        setData(data?.bloodGroupData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBloodGroupData();
  }, []);

  return (
    <>
      <Header />
      <div className="d-flex flex-row flex-wrap">
        {data?.map((records, index) => (
          <>
            <div
              className="card m-2 p-1"
              key={index}
              style={{ width: "18rem", backgroundColor: `${color[index]}` }}
            >
              <div className="card-body">
                <h1 className="card-title bg-light text-dark text-center mb-3">
                  {records.bloodGroup}
                </h1>
                <p className="card-text">
                  Total In : <b>{records.totalIn}</b> (ml)
                </p>
                <p className="card-text">
                  Total Out : <b>{records.totalOut}</b> (ml)
                </p>
              </div>
              <div className="card-footer bg-dark text-light text-center">
                Available Blood : <b>{records.availableBlood}</b> (ml)
              </div>
            </div>
          </>
        ))}
      </div>
      <div className="container my-3">
        <h1 className="my-3 text-center">Recent Blood Group Transaction</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Blood Group</th>
              <th scope="col">Inventory Type</th>
              <th scope="col">Quantity (in ml)</th>
              <th scope="col">Donar Email</th>
              <th scope="col">Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {inventoryData?.map((record) => (
              <tr key={record._id}>
                <th>{record.bloodRecord}</th>
                <th>{record.inventoryType}</th>
                <th>{record.quantity}</th>
                <th>{record.email}</th>
                <th>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Analytics;
