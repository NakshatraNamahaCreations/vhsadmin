import React, { useState, useEffect } from "react";
import Header from "./Header";
import Sidenav from "./Sidenav";
import DataTable from "react-data-table-component";
import axios from "axios";

function UserManagement() {
  const [searchItems, setSearchItems] = useState("");
  const [totalRecords, setTotalRecords] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterdata, setfilterdata] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.vijayhomesuperadmin.in/api/getcustomerdatapagewise?page=${currentPage}&search=${searchItems}`
        );
        const result = await response.json();

        setfilterdata(result?.customers);
        setTotalRecords(result?.totalRecords); // Assuming you have a state variable for total records
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage, searchItems]);

  const deleteuser = async (id) => {
    axios({
      method: "post",
      url: "https://api.vijayhomesuperadmin.in/api/deletetercustomer/" + id,
    })
      .then(function (response) {
        //handle success
        console.log(response);
        alert("Deleted successfully");
        window.location.reload();
      })
      .catch(function (error) {
        //handle error
        console.log(error.response.data);
      });
  };
  const columns = [
    {
      name: "Sl  No",
      selector: (row, index) => (currentPage - 1) * 15 + index + 1,
    },
    {
      name: "Customer Name",
      selector: (row) => row.customerName,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },

    {
      name: "Contact",
      selector: (row) => row.mainContact,
    },
    {
      name: "Action",
      selector: (row) => (
        <div>
          <a onClick={() => deleteuser(row?._id)} className="hyperlink mx-1">
            Delete
          </a>
        </div>
      ),
    },
  ];

  return (
    <div className="row">
      <div className="col-md-2">
        <Sidenav />
      </div>
      <div className="col-md-10 ">
        <Header />
        <div className="row">
          <div className="mt-5">
            <input
              type="text"
              placeholder="Search by name /email"
              className="w-25 form-control"
              value={searchItems}
              onChange={(e) => setSearchItems(e.target.value)}
            />
          </div>
          <div className="mt-1 border">
            <DataTable
              columns={columns}
              data={filterdata}
              pagination
              paginationServer
              paginationTotalRows={totalRecords}
              paginationPerPage={15}
              paginationRowsPerPageOptions={[15, 30, 50]}
              onChangePage={(current) => setCurrentPage(current)}
              selectableRowsHighlight
              subHeaderAlign="left"
              highlightOnHover
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserManagement;
