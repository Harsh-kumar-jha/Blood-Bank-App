import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../components/shared/Spinner";
import Layout from "../components/shared/Layout/Layout";
import Modal from "../components/shared/modal/Modal";
import API from "../services/API";
import moment from "moment";

const HomePage = () => {
  const { loading, error } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);

  const getBloodRecord = async () => {
    const { data } = await API.get("/inventory/get-inventory");
    if (data?.success) {
      setData(data?.inventory);
    }
    try {
    } catch (error) {
      console.log(`Error Occur at HomePage Component : ${error}`);
    }
  };

  useEffect(() => {
    getBloodRecord();
  });
  return (
    <Layout>
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="container">
            <h3
              className="ms-4 "
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              style={{ cursor: "pointer" }}
            >
              <i className="fa-solid fa-plus text-success py-5"></i>
              Add Inventory
            </h3>
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
                {data?.map((record) => (
                  <tr key={record._id}>
                    <th>{record.bloodRecord}</th>
                    <th>{record.inventoryType}</th>
                    <th>{record.quantity}</th>
                    <th>{record.donarEmail}</th>
                    <th>
                      {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>

            <Modal />
          </div>
        </>
      )}
    </Layout>
  );
};

export default HomePage;
