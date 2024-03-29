import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";

import Modal from "react-bootstrap/Modal";
import DataTable from "react-data-table-component";
import Sidenav from "./Sidenav";
import Header from "./Header";

function Category() {
  const [category, setcategory] = useState("");
  const [catagoryImage, setCatagoryImage] = useState("");
  const [title, settitle] = useState("");
  const [categorydata, setcategorydata] = useState([]);
  const [search, setsearch] = useState("");
  const [filterdata, setfilterdata] = useState([]);
  const [editCatagoryData, setEditCatagoryData] = useState({});
  const [editCatagoryName, setEditCatagoryName] = useState("");
  const [Edittitle, setEdittitle] = useState("");
  const [editCatagoryImg, setEditCatagoryImage] = useState("");
  const formdata = new FormData();
  // console.log("editCatagoryData._id",editCatagoryData._id)
  const [show, setShow] = useState(false);

  const handleEdit = (subcategory) => {
    setEditCatagoryData(subcategory);
    handleShow(true);
  };
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const postcategory = async (e) => {
    e.preventDefault();
    if (!category || !catagoryImage) {
      alert("Please select all fields");
    } else {
      formdata.append("category", category);
      formdata.append("title", title);
      formdata.append("img", catagoryImage);
      try {
        const config = {
          url: "/userapp/addfeq",
          method: "post",
          baseURL: "https://api.vijayhomesuperadmin.in/api",
          data: formdata,
        };
        await axios(config).then(function (response) {
          if (response.status === 200) {
            alert("Successfully Added");
            window.location.reload("");
          }
        });
      } catch (error) {
        console.error(error);
        alert("category  Not Added");
      }
    }
  };

  // const onUpdate = () => {
  //   // Function to update your data when editing is successful
  //   // You can call this function after updating the category data
  //   getcategory(); // For example, re-fetch the data after an update
  // };

  useEffect(() => {
    getcategory();
  }, []);

  const getcategory = async () => {
    let res = await axios.get("https://api.vijayhomesuperadmin.in/api/userapp/getallfeq");
    if ((res.status = 200)) {
      setcategorydata(res.data?.feq);
 
      setfilterdata(res.data?.feq);
    }
  };

  const [categorydata1, setcategorydata1] = useState([]);

  useEffect(() => {
    getcategory1();
  }, []);

  const getcategory1 = async () => {
    let res = await axios.get("https://api.vijayhomesuperadmin.in/api/getcategory");
    if ((res.status = 200)) {
      setcategorydata1(res.data?.category);
    }
  };

  const editcategory = async (e) => {
    e.preventDefault();
    try {
      formdata.append("category", editCatagoryName);
      formdata.append("title", Edittitle);
      if (editCatagoryImg) {
        formdata.append("img", editCatagoryImg);
      }

      const catagoryId = editCatagoryData._id;
      const config = {
        url: `/userapp/editfeq/${catagoryId}`,
        method: "put",
        baseURL: "https://api.vijayhomesuperadmin.in/api",
        data: formdata,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios(config);

      if (response.status === 200) {
        alert("Successfully Updated");
        window.location.reload();
        // onUpdate();
        // handleClose();
      } else {
        alert("Not updated"); // Handle other status codes appropriately
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  const columns = [
    {
      name: "Sl  No",
      selector: (row, index) => index + 1,
    },
    {
      name: "Category",
      selector: (row) => row.category,
    },
    {
      name: "Titel",
      selector: (row) => row.title,
    },
    {
      name: " image",
      selector: (row) => (
        <div>
          <img
            src={`https://api.vijayhomesuperadmin.in/feq/${row?.img[0]?.data}`}
            alt="Pest Control"
            width="50px"
            height="50px"
          />

        </div>
      ),
    },
    {
      name: "Action",
      selector: (row) => (
        <div>
          <span>
            <i className="hyperlink" onClick={() => handleEdit(row)}>
              Edit |
            </i>{" "}
          </span>
          <a onClick={() => deletecategory(row._id)} className="hyperlink mx-1">
            Delete
          </a>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const result = categorydata.filter((item) => {
      return item.category.toLowerCase().match(search.toLowerCase());
    });
    setfilterdata(result);
  }, [search]);

  const deletecategory = async (id) => {
    axios({
      method: "post",
      url: "https://api.vijayhomesuperadmin.in/api/userapp/deletefeq/" + id,
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

  return (
    <div div className="row">
      <div className="col-md-2">
        <Sidenav />
      </div>
      <div className="col-md-10 ">
        <Header />

        <div className="row m-auto">
          <h3>Why need VhS</h3>
          <div className="col-md-12">
            <div className="card" style={{ marginTop: "30px" }}>
              <div className="card-body p-3">
                <div>
                  <form>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="vhs-input-label">
                          Category <span className="text-danger"> *</span>
                        </div>
                        <div className="group pt-1">
                          <select
                            className="col-md-12 vhs-input-value"
                            onChange={(e) => setcategory(e.target.value)}
                          >
                            <option>---SELECT---</option>
                            {categorydata1.map((i) => (
                              <option value={i.category}>{i.category}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="vhs-input-label">
                          Title <span className="text-danger"> *</span>
                        </div>
                        <div className="group pt-1">
                          <input
                            type="text"
                            className="col-md-12 vhs-input-value"
                            onChange={(e) => settitle(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="vhs-input-label">
                          Image <span className="text-danger"> *</span>
                        </div>
                        <div className="group pt-1">
                          <input
                            type="file"
                            className="col-md-12 vhs-input-value"
                            onChange={(e) =>
                              setCatagoryImage(e.target.files[0])
                            }
                            multiple
                          />
                          <b style={{ fontSize: "12px" }}>
                            Please select the dimensions Width=50px,Height=50px
                          </b>
                        </div>
                      </div>

                      <div className="col-md-4"></div>

                      <div className="col-md-4"></div>
                    </div>

                    <div className="row pt-3">
                      <div className="col-md-2">
                        <button className="vhs-button" onClick={postcategory}>
                          Save
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <input
                type="text"
                placeholder="Search here.."
                className="w-25 form-control"
                value={search}
                onChange={(e) => setsearch(e.target.value)}
              />
            </div>

            <div className="mt-1 border">
              <DataTable
                columns={columns}
                data={filterdata}
                pagination
                fixedHeader
                selectableRowsHighlight
                subHeaderAlign="left"
                highlightOnHover
              />
            </div>
          </div>
        </div>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="card-body p-3">
              <form>
                <div className="col-md-12">
                  <div className="vhs-input-label">
                    Category <span className="text-danger"> *</span>
                  </div>
                  <div className="group pt-1">
                    <input
                      type="text"
                      className="col-md-12 vhs-input-value"
                      onChange={(e) => setEditCatagoryName(e.target.value)}
                      defaultValue={editCatagoryData?.category}
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="vhs-input-label">
                    title <span className="text-danger"> *</span>
                  </div>
                  <div className="group pt-1">
                    <input
                      type="text"
                      className="col-md-12 vhs-input-value"
                      onChange={(e) => setEdittitle(e.target.value)}
                      defaultValue={editCatagoryData?.title}
                    />
                  </div>
                </div>
                <div className="col-md-12 mt-3">
                  <div className="vhs-input-label">
                    Category Icon<span className="text-danger"> *</span>
                  </div>
                  <div className="group pt-1">
                    {/* <input type="file" onChange={(e) => setNewImg(e.target.files[0])} /> */}
                    <input
                      type="file"
                      className="col-md-12 vhs-input-value"
                      onChange={(e) => setEditCatagoryImage(e.target.files[0])}
                    // defaultValue={data.categoryImg}
                    />
                  </div>
                </div>
                <div className="row pt-3">
                  <div className="col-md-2">
                    <button className="vhs-button" onClick={editcategory}>
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default Category;
