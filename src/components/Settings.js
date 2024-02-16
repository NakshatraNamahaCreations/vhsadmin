import React, { useState, useEffect } from "react";
import Sidenav from "./Sidenav";
import Header from "./Header";
import axios from "axios";

function Settings() {
  const [oldPassword, setoldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [newcPassword, setnewcPassword] = useState("");
  const admin = JSON.parse(sessionStorage.getItem("admin"));
  const [vendorDiscount, setvendorDiscount] = useState("");
  const [vendorDiscountdata, setvendorDiscountdata] = useState([]);

  

  const changePassword = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: `/super/changepassword/${admin?._id}`,
        method: "post",
        baseURL: "https://api.vijayhomesuperadmin.in/api",
        headers: { "content-type": "application/json" },
        data: {
          oldPassword: oldPassword,
          newPassword: newPassword,
          newcPassword: newcPassword,
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          alert("New password updated");

          window.location.assign("/settings");
        } else {
          // alert(data.response);
          alert(response.data.error);
        }
      });
    } catch (error) {
      alert("something went wrong");
    }
  };


  const updateVendorDiscount = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: `/vendor/adddiscount`,
        method: "post",
        baseURL: "https://api.vijayhomesuperadmin.in/api",
        headers: { "content-type": "application/json" },
        data: {
          discountAmount: vendorDiscount,
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          alert("Updated");

          window.location.assign("/settings");
        } else {
          // alert(data.response);
          alert(response.data.error);
        }
      });
    } catch (error) {
      alert("something went wrong");
    }
  };



  useEffect(() => {
    getvendorDisc();
  }, []);

  const getvendorDisc = async () => {
    let res = await axios.get("https://api.vijayhomesuperadmin.in/api/vendor/getalldiscount");
    if ((res.status = 200)) {
      console.log("res.data?.discount", res.data?.success)
      setvendorDiscountdata(res.data?.success);
    }
  };

  const deletevendorDisc = async (id) => {
    axios({
      method: "post",
      url: "https://api.vijayhomesuperadmin.in/api/userapp/deletebanner/" + id,
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
        <h4 style={{ color: "#a33535" }}>Setting</h4>
        <div className="d-flex">


          <div
            className="shadow-lg p-3 mb-5 bg-white rounded"
            style={{ marginTop: "20px", width: "500px" }}
          >
            <div
              className="card-body p-4"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <form>
                <div className="vhs-sub-heading">Change Password</div>
                <div className="col-md-12 pt-2">
                  <div className="vhs-input-label">Old Password</div>
                  <div className="group pt-1">
                    <input
                      type="text"
                      className="col-md-12 vhs-input-value"
                      onChange={(e) => setoldPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className=" pt-2 mt-3">
                  <div className="vhs-input-label">New Password</div>
                  <div className="group pt-1">
                    <input
                      type="text"
                      onChange={(e) => setnewPassword(e.target.value)}
                      className="col-md-12 vhs-input-value"
                    />
                  </div>
                </div>
                <div className="pt-2 mt-3">
                  <div className="vhs-input-label">New Password Confirmed</div>
                  <div className="group pt-1">
                    <input
                      type="text"
                      onChange={(e) => setnewcPassword(e.target.value)}
                      className="col-md-12 vhs-input-value"
                    />
                  </div>
                </div>

                <div className="row pt-3 justify-content-center">
                  <div className="">
                    <button
                      className="vhs-button"
                      style={{ width: "140px" }}
                      onClick={changePassword}
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>


          <div style={{ marginLeft: "50px" }}>
            <p>Update Vendor Discount</p>


            <input className="col-md-12 vhs-input-value"
              style={{ width: "200px" }}
              type="number"
              onChange={(e) => setvendorDiscount(e.target.value)}

            />
            <div className="">
              <button
                className="vhs-button"
                style={{ width: "140px", marginTop: 20 }}
                onClick={updateVendorDiscount}
              >
                Update
              </button>
            </div>
            {vendorDiscountdata?.map((i) => (
              <div key={i.id} className="row">
                <p style={{ color: "green" }}>VendorDiscount:{i.discountAmount}</p>
                <i class="fa-solid fa-trash" style={{ color: "darkred" }} onClick={() => deletevendorDisc(i?.id)}></i>
              </div>
            ))}

          </div>
        </div>
      </div>


    </div>
  );
}

export default Settings;
