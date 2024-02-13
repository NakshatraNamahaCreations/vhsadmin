import { React, useEffect, useState } from "react";

import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Sidenav from "./Sidenav";
import Header from "./Header";
import axios from "axios";

const active1 = {
  backgroundColor: "rgb(169, 4, 46)",
  color: "#fff",
  fontWeight: "bold",
  border: "none",
};
const inactive1 = { color: "black", backgroundColor: "white" };

function Banner() {
  const [selected1, setSelected1] = useState(0);

  const [banner, setBanner] = useState("");
  const [header, setheader] = useState("");
  const [desc, setdesc] = useState("");
  const [subcategory, setsubcategory] = useState("");
  const [categorydata, setcategorydata] = useState([]);
  const [bannerdata, setBannerdata] = useState([]);
  const formdata = new FormData();
  const apiURL = process.env.REACT_APP_API_URL;
  const imgURL = process.env.REACT_APP_IMAGE_API_URL;
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [EditCatagoryData, setEditCatagoryData] = useState({})
  const [editheader, seteditheader] = useState("");
  const [editdesc, seteditdesc] = useState("");
  const [editsubcategory, seteditsubcategory] = useState("");
  const [editCatagoryImg, seteditCatagoryImg] = useState("")



  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const postbanner = async (e) => {
    e.preventDefault();
    console.log(banner);
    formdata.append("icon", banner);
    formdata.append("header", header);
    formdata.append("desc", desc);
    formdata.append("subcategory", subcategory);

    try {
      const config = {
        url: "/userapp/addofferbanner",
        method: "post",
        baseURL: "https://api.vijayhomesuperadmin.in/api",

        data: formdata,
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          alert("Successfully Added");
          window.location.assign("/offerbanner");
        }
      });
    } catch (error) {
      console.error(error);
      alert("banner  Not Added");
    }
  };

  useEffect(() => {
    getcategory();
  }, []);

  const getcategory = async () => {
    let res = await axios.get("https://api.vijayhomesuperadmin.in/api/userapp/getappsubcat");
    if ((res.status = 200)) {
      setcategorydata(res.data?.subcategory);
    }
  };

  useEffect(() => {
    getbannerimg();
  }, []);

  const getbannerimg = async () => {
    let res = await axios.get(
      "https://api.vijayhomesuperadmin.in/api/userapp/getallofferbanner"
    );
    if ((res.status = 200)) {
      setBannerdata(res.data?.offerbanner);
    
    }
  };

  const deletebannerimg = async (id) => {
    axios({
      method: "post",
      url: "https://api.vijayhomesuperadmin.in/api/userapp/deleteofferbanner/" + id,
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

  const handleEdit = (subcategory) => {
    setEditCatagoryData(subcategory);
    handleShow1(true);
  };

  console.log("editheader",bannerdata[0]?.icon)
  const editofferbanner = async (e) => {
    e.preventDefault();
    try {
      formdata.append("header", editheader);
      formdata.append("desc", editdesc);
      formdata.append("subcategory", editsubcategory);

      if (editCatagoryImg) {
        formdata.append("icon", editCatagoryImg);
      }

      const catagoryId = EditCatagoryData?._id;
      const config = {
        url: `/editoofferbanner/${catagoryId}`,
        method: "put",
        baseURL: "https://api.vijayhomesuperadmin.in/api/userapp",
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
        alert("offer not updated"); // Handle other status codes appropriately
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };
  return (
    <div className="row">
      <div className="col-md-2">
        <Sidenav />
      </div>
      <div className="col-md-10 ">
        <Header />
        <div className="row  set_margin ">
          <div>
            <div className="d-flex  mt-3">
              <h4 style={{ color: "#FF0060" }}>Offer Banner </h4>
            </div>
          </div>
        </div>
        <div className="row pt-3 m-auto" style={{ marginLeft: "-72px" }}>
          <div className="row  set_margin">
            <div>
              <div className="d-flex  mt-3 mb-3">
                <Button
                  className="btn-primary-button mx-2"
                  variant="danger"
                  onClick={handleShow}
                >
                  Add Offer Banner
                </Button>
              </div>
            </div>

            <div className="row  justify-content-center ">
              <div className="col-md-12">
                <Table
                  className="table_container table_data text-center"
                  bordered
                  size="sm"
                  centered
                  variant
                >
                  <thead>
                    <tr>
                      <th>SI.No</th>
                      <th>subcategory</th>
                      <th>Icon</th>
                      <th>Header</th>
                      <th>Desc</th>

                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bannerdata.map((element, i) => {
                      return (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{element.subcategory}</td>
                          <td>
                            <img
                              className="header_logo"
                              src={`https://api.vijayhomesuperadmin.in/offerbanner/${element?.icon}`}
                              width={"50px"}
                              height={"50px"}
                            />
                          </td>
                          <td>{element.header}</td>
                          <td>{element.desc}</td>

                          <td>

                            <div>
                              <span>
                                <i className="hyperlink" onClick={() => handleEdit(element)}>
                                  Edit |
                                </i>{" "}
                              </span>
                              <a onClick={() => deletebannerimg(element?._id)} className="hyperlink mx-1">
                                Delete
                              </a>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Offer Banner</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="vhs-input-label mt-3">
              Sub-Catagory <span className="text-danger"> *</span>
            </div>
            <div className="group pt-1">
              <select
                className="col-md-6 vhs-input-value"
                onChange={(e) => setsubcategory(e.target.value)}
              >
                <option>-- Select subcategory--</option>
                {categorydata.map((i) => (
                  <option value={i.subcategory}>{i.subcategory}</option>
                ))}
              </select>
            </div>
            <div className="vhs-input-label mt-3">Icon</div>

            <input
              type="file"
              onChange={(e) => setBanner(e.target.files[0])}
              className="col-md-6 vhs-input-value"
            />
            <div className="mt-3" style={{ fontSize: "13px" }}></div>

            <div className="vhs-input-label mt-3">header</div>
            <div className="group pt-1">
              <input
                type="text"
                className="col-md-6 vhs-input-value"
                onChange={(e) => setheader(e.target.value)}
              />
            </div>
            <div className="vhs-input-label mt-3">Description</div>
            <div className="group pt-1">
              <input
                type="text"
                className="col-md-6 vhs-input-value"
                onChange={(e) => setdesc(e.target.value)}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={editofferbanner}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </>

      <>
        <Modal show={show1} onHide={handleClose1}>
          <Modal.Header closeButton>
            <Modal.Title>Offer Banner11</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="vhs-input-label mt-6">
              Sub-Catagory <span className="text-danger"> *</span>
            </div>
            <div className="group pt-1">
              <select
                className="col-md-12 vhs-input-value"
                onChange={(e) => seteditsubcategory(e.target.value)}
                defaultValue={EditCatagoryData?.subcategory}
              >
                <option>{EditCatagoryData?.subcategory}</option>
                {/* {categorydata.map((i) => (
                  <option value={i.subcategory}>{i.subcategory}</option>
                ))} */}
              </select>
            </div>
            <div className="vhs-input-label mt-3">Icon</div>

            <input
              type="file"
              onChange={(e) => seteditCatagoryImg(e.target.files[0])}
              className="col-md-12 vhs-input-value"
            
            />
            <div className="mt-3" style={{ fontSize: "13px" }}></div>

            <div className="vhs-input-label mt-3">header</div>
            <div className="group pt-1">
              <input
                type="text"
                className="col-md-12 vhs-input-value"
                onChange={(e) => seteditheader(e.target.value)}
                defaultValue={EditCatagoryData?.header}
              />
            </div>
            <div className="vhs-input-label mt-3">Description</div>
            <div className="group pt-1">
              <input
                type="text"
                className="col-md-12 vhs-input-value"
                onChange={(e) => seteditdesc(e.target.value)}
                defaultValue={EditCatagoryData?.desc}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={editofferbanner}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
}

export default Banner;
