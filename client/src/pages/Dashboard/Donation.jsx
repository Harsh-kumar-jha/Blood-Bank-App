import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import moment from "moment";
import API from "../../services/API";
import { useSelector } from "react-redux";

const Donation = () => {
  const [data, setData] = useState([]);
  const { user } = useSelector((state) => state.auth);

  const getDonar = async () => {
    try {
      const { data } = await API.post("/inventory/get-inventory-hospital", {
        filter: {
          inventoryType: "in",
          donar: user?._id,
        },
      });
      if (data?.success) {
        setData(data?.inventory);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDonar();
  }, []);
  return (
    <Layout>
      <div className="container mt-4">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Blood Group</th>
              <th scope="col">Inventory Type</th>
              <th scope="col">Quantity</th>
              <th scope="col">Email</th>
              <th scope="col">Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((record) => (
              <tr key={record._id}>
                <th>{record.bloodGroup}</th>
                <th>{record.inventoryType}</th>
                <th>{record.quantity}</th>
                <th>{record.email}</th>
                <th>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Donation;
