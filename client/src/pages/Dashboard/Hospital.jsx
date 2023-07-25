import React, { useState, useEffect } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import moment from "moment";

const Hospital = () => {
  const [data, setData] = useState([]);

  const getHospital = async () => {
    try {
      const { data } = await API.get("/inventory/get-hospitals");
      if (data?.success) {
        setData(data?.hospitals);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getHospital();
  }, []);
  return (
    <Layout>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Address</th>
            <th scope="col">Date & Time</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((record) => (
            <tr key={record._id}>
              <th>{record.hospitalName}</th>
              <th>{record.email}</th>
              <th>{record.phone}</th>
              <th>{record.address}</th>
              <th>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Hospital;
