
import { Form, Input, message, Modal, Select, Table, DatePicker } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "./../components/Spinner";
import Layout from "./../components/Layout/Layout";
import {
    //  BorderlessTableOutlined,
    //   PieChartOutlined,
      EditOutlined,
      DeleteOutlined,
    } from "@ant-design/icons";

const AdminPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [viewData, setViewData] = useState("table");
    const [loading, setLoading] = useState(false);
    const [allTransection, setAllTransection] = useState([]);
    const [editable, setEditable] = useState(null);
    const columns = [
        
        {
          title: "Name",
          dataIndex: "name",
        },
        {
          title: "Email",
          dataIndex: "email",
        },
        {
          title: "Actions",
          render: (text, record) => (
            <div>
              <EditOutlined
                onClick={() => {
                  setEditable(record);
                  setShowModal(true);
                }}
              />
              <DeleteOutlined
                className="mx-2"
                onClick={() => {
                  handleDelete(record);
                }}
              />
            </div>
          ),
        },
      ];

 //useEffect Hook
 useEffect(() => {
    const getAllTransactions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        setLoading(true);
        const res = await axios.post("/users/get-user", {
        });
        setLoading(false);
        setAllTransection(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
        message.error("Ftech Issue With Tranction");
      }
    };
    getAllTransactions();
  }, []);

      const handleDelete = async (record) => {
        try {
          setLoading(true);
          await axios.post("/users/delete-user", {
            userid: record._id,
          });
          setLoading(false);
          message.success("User Deleted!");
        } catch (error) {
          setLoading(false);
          console.log(error);
          message.error("unable to delete");
        }
      };
    
      

  return (
    <Layout>
         <div className="content">
          <Table columns={columns} dataSource={allTransection} />
      </div>
         
    </Layout>
  )
}
export default AdminPage;