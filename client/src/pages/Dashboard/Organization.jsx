import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import moment from "moment";
import API from "../../services/API";
import { useSelector } from "react-redux";

const Organization = () => {
  const [data, setData] = useState([]);
  const { user } = useSelector((state) => state.auth);

  const getOrganization = async () => {
    try {
      if (user?.role === "donar") {
        const { data } = await API.get("/inventory/get-organization");
        if (data?.success) {
          setData(data?.organizations);
        }
        if (user?.role === "hospital") {
          const { data } = await API.get(
            "inventory/get-organization-for-hospital"
          );
          if (data?.success) {
            setData(data?.organization);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getOrganization();
  }, [user]);
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
              <th>{record.organizationName}</th>
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

export default Organization;
