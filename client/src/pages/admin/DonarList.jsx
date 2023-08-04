import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import moment from "moment";
import API from "../../services/API";

const DonarList = () => {
  const [data, setData] = useState([]);

  const getDonarList = async () => {
    try {
      const { data } = await API.get("/admin/donar-list");
      if (data?.success) {
        setData(data?.donarData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDonarList();
  }, []);

  const handleDelete = async (id) => {
    try {
      const answer = window.prompt(
        "Are you sure want to delete this donar ? ",
        "Sure"
      );
      if (!answer) return;
      const { data } = await API.delete(`/admin/deleteDonar/${id}`);
      alert(data?.message);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Date & Time</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((record) => (
            <tr key={record._id}>
              <th>{record.name || record.organizationName + "(ORG)"}</th>
              <th>{record.email}</th>
              <th>{record.phone}</th>
              <th>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</th>
              <th>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(record._id)}
                >
                  Delete
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default DonarList;
