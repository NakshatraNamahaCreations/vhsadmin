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

function ReviewVideos() {


  const [Links, setLinks] = useState("");
  const [Subcategory, setSubcategory] = useState("");
  const [categorydata, setcategorydata] = useState([]);
  const [bannerdata, setBannerdata] = useState([]);
  const formdata = new FormData();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  const postbanner = async (e) => {
    e.preventDefault();
   
    try {
      const config = {
        url: "/userapp/addReviewVideos",
        method: "post",
        baseURL: "https://api.vijayhomesuperadmin.in/api",
        headers:{"content-type":"application/json"},
        data: {
          Links:Links,
          Subcategory:Subcategory
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          alert("Successfully Added");
          window.location.assign("/ReviewVideos");
        }
      });
    } catch (error) {
      console.error(error);
      alert("category  Not Added");
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
      "https://api.vijayhomesuperadmin.in/api/userapp/getallReviewVideos"
    );
    if ((res.status = 200)) {
      setBannerdata(res.data?.ReviewVideos);
     
    }
  };

  const deletebannerimg = async (id) => {
    axios({
      method: "post",
      url: "https://api.vijayhomesuperadmin.in/api/userapp/deleteReviewVideos/" + id,
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
    <div className="row">
      <div className="col-md-2">
        <Sidenav />
      </div>
      <div className="col-md-10 ">
        <Header />
        <div className="row  set_margin ">
          <div>
            <div className="d-flex  mt-3">
              <h4 style={{ color: "#FF0060" }}>ReviewVideos</h4>
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
                  Add ReviewVideos
                </Button>
              </div>
            </div>
            <div>
              {/* first added image will reflected  first in home page remaining all
              below */}
            </div>
            <div className="row  justify-content-center mt-3">
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
                      <th>Subcategory</th>

                      <th>Links</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bannerdata.map((element, i) => {
                      return (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{element.Subcategory}</td>

                          <td>
                          {element.Links}
                          </td>

                          <td>
                            <Button
                              style={{
                                margin: "5px",
                                fontSize: "12px",
                                padding: "6px",
                              }}
                              onClick={() => deletebannerimg(element._id)}
                              variant="danger"
                              key={i}
                            >
                              Delete
                            </Button>{" "}
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
            <Modal.Title>ADD</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="vhs-input-label mt-3">
              Sub-Catagory <span className="text-danger"> *</span>
            </div>
            <div className="group pt-1">
              <select
                className="col-md-12 vhs-input-value"
                onChange={(e) => setSubcategory(e.target.value)}
              >
                <option>-- Select subcategory--</option>
                {categorydata.map((i) => (
                  <option value={i.subcategory}>{i.subcategory}</option>
                ))}
              </select>
            </div>

            <div className="vhs-input-label mt-3">
              <b>Link </b> <span className="text-danger"> *</span>
            </div>
            <input type="text" onChange={(e) => setLinks(e.target.value)}   className="col-md-12 vhs-input-value" />
            <div className="mt-3" style={{ fontSize: "13px" }}>
             
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={postbanner}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
}

export default ReviewVideos;
