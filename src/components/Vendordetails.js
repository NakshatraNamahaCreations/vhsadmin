import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Sidenav from "./Sidenav";
import Header from "./Header";
import { Button, ButtonToolbar } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

function Vendordetails() {
  const [show, setShow] = useState(false);
  const [amt, setamt] = useState("")
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { id } = useParams();
  const [data, setdata] = useState({});


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const rowDataString = urlParams.get("rowData");
    const rowData = JSON.parse(rowDataString);
    setdata(rowData);
    // Use rowData in your component

  }, [id]);

  console.log("id", id)

  const updateRecharge = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `https://api.vijayhomesuperadmin.in/api/updatevendorAmt/${id}`,
        { vendorAmt: amt },
        { headers: { "content-type": "application/json" } }
      );

      if (response.status === 200) {
        handleClose();
        alert("Successfully Added");
        window.location.reload("/vendor");
      }
    } catch (error) {
      console.log("Error response:", error.response);
      handleClose();

      if (error.response) {
        alert(error.response.data.error || "Something went wrong");
      } else {
        alert("Network error or something went wrong");
      }
    }
  };

  return (
    <div div className="row">
      <div className="col-md-2">
        <Sidenav />
      </div>
      <div className="col-md-10">
        <Header />

        <div>
          <h3 style={{ color: "#a33535" }}>Vendor Details</h3>
        </div>
        <div className="row">
          <div className="col-6">
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              className="img"
            />
            <p className="vp">
              Name:
              <b>{data?.vhsname}</b>
            </p>
            <p className="vp">
              Number:
              <b>{data?.number}</b>
            </p>
            <p className="vp">
              Experiance:
              <b>{data?.experiance}</b>
            </p>
            <p className="vp">
              Language:
              <b>{data?.languagesknow}</b>
            </p>
            <p className="vp">
              Password:
              <b>{data?.password}</b>
            </p>
          </div>
          <div className="mt-5 col-6">
            <div className="wallet">
              <div>
                <i
                  class="fa-solid fa-wallet fa-beat"
                  style={{ color: "rgb(139, 20, 20)", fontSize: "60px" }}
                ></i>
              </div>
              <div>
                <h3>
                  <b>Wallet Balance</b>
                </h3>
                <div>
                  <b style={{ fontSize: "25px" }}>
                    <i class="fa-solid fa-indian-rupee-sign"></i>{data?.vendorAmt}
                  </b>
                </div>

                <Button
                  style={{
                    background: "rgb(176, 39, 39)",
                    marginTop: "10px",
                    border: "none",
                  }}
                  onClick={handleShow}
                >
                  Recharge{" "}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div style={{ position: 'relative', paddingTop: '56.25%' }}>
          <iframe
            src="https://iframe.mediadelivery.net/embed/212658/16cdf0a5-8acd-4bdc-b9cb-9f4f1dc0ffa5?autoplay=true&loop=false&muted=false&preload=true&responsive=true"
            title="Your Video"
            loading="lazy"
            style={{ border: 0, position: 'absolute', top: 0, height: '100%', width: '100%' }}
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
            allowFullScreen
          ></iframe>
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Recharge to vendor wallet</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="number"
              class="form-control mt-4"
              placeholder="100"
              aria-label="Username"
              onChange={(e) => setamt(e.target.value)}
              aria-describedby="basic-addon1"
              style={{
                width: "100%",

                borderRadius: "3px",
                borderLeft: "2px solid #a9042e",
              }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              CANCLE
            </Button>
            <Button variant="primary" onClick={updateRecharge}>
              ADD
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Vendordetails;
