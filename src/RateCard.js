import { React, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Sidenav from "./components/Sidenav";
import Header from "./components/Header";
import axios from "axios";
import InputGroup from "react-bootstrap/InputGroup";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



function RateCard() {
  const [desc, setdesc] = useState([]); // State to store includes items
  const [newdesc, setNewdesc] = useState("");
  const [charge, setcharge] = useState("");
  const [city, setcity] = useState("");
  const [citydata, setcitydata] = useState([]);
  const [header, setheader] = useState("");
  const [rateCarddata, setrateCarddata] = useState([]);

  const handleAdddesc = () => {

    if (newdesc.trim() !== "" && charge) {
      const newDESCItem = { text: newdesc, cg: charge, };

      setdesc([...desc, newDESCItem]);
      setNewdesc(""); // Clear the input fields
      setcharge("");
    }
  };

  console.log("desc", desc)

  useEffect(() => {
    getcity();
    getrateCard();
  }, []);

  const getcity = async () => {
    let res = await axios.get("https://api.vijayhomesuperadmin.in/api/master/getcity");
    if ((res.status = 200)) {
      setcitydata(res.data?.mastercity);

    }
  };

  const getrateCard = async () => {
    let res = await axios.get("https://api.vijayhomesuperadmin.in/api/userapp/getRateCard");
    if ((res.status = 200)) {
      setrateCarddata(res.data?.RateCard);

    }
  };


  const ADDRateCArd = async (e) => {
    e.preventDefault();

    try {
      const config = {
        url: "/userapp/addRateCard",
        method: "post",
        baseURL: "https://api.vijayhomesuperadmin.in/api",
        data: {
          desc: desc,
          header: header,
          city: city
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          alert("Successfully Added");
          window.location.assign("/RateCard");
        }
      });
    } catch (error) {
      console.error(error);
      alert("  Not Added");
    }

  };


  const deletearteCard = async (id) => {
    axios({
      method: "post",
      url: "https://api.vijayhomesuperadmin.in/api/userapp/deleteRateCard/" + id,
    })
      .then(function (response) {
        //handle success
        console.log(response);
        alert("Deleted successfully");
        window.location.reload();
      })
      .catch(function (error) {
        //handle error
        // console.log(error.response.data);
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
              <h4 style={{ color: "#FF0060" }}>RateCard</h4>
            </div>

            <div style={{ display: "flex" }}>



              <div style={{ width: "400px" }}>
                <Form.Label className="mt-1" style={{ fontWeight: 'bold' }} >City</Form.Label>
                <InputGroup className="mb-2">
                  <Form.Select
                    aria-label="City"
                    aria-describedby="basic-addon1"
                    onChange={(e) => setcity(e.target.value)}
                  >
                    <option>-Select city-</option>
                    {citydata.map((item) => (
                      <option value={item.city}>
                        {item.city}
                      </option>
                    ))}
                  </Form.Select>
                </InputGroup>
              </div>

              <div style={{ width: "400px", marginLeft: "20px" }}>

                <Form.Label style={{ fontWeight: 'bold' }} >Header</Form.Label>
                <Form.Control
                  type="text"

                  className="mt-1"

                  value={header}
                  onChange={(e) => setheader(e.target.value)}
                />
              </div>
            </div>
            <Form.Group as={Col} controlId="formGridEmail" style={{ display: "flex" }} >
              <div style={{ width: "400px" }}>


                <Form.Label style={{ fontWeight: 'bold' }}> Description</Form.Label>

                <Form.Control
                  as="textarea"

                  className="mt-1"

                  value={newdesc}
                  onChange={(e) => setNewdesc(e.target.value)}
                />
              </div>
              <div style={{ width: "400px", marginLeft: "20px" }}>


                <Form.Label style={{ fontWeight: 'bold' }}>Service Charges</Form.Label>
                <Form.Control
                  type="text"

                  className="mt-1"

                  value={charge}
                  onChange={(e) => setcharge(e.target.value)}
                />
              </div>
              <i class="fa-solid fa-plus add" onClick={handleAdddesc}></i>
            </Form.Group>
            {desc.length !== 0 ?
              <div>


                <div style={{ background: "black", width: "550px", display: "flex", justifyContent: "space-between", marginTop: "10px" }}>

                  <p style={{ color: "white", marginBottom: "0", padding: "10px" }}>{header}</p>
                  <p style={{ color: "white" }}>{city}</p>
                </div>

                <TableContainer component={Paper} style={{ width: "550px", }}>
                  <Table sx={{ minWidth: 200 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Description</StyledTableCell>
                        <StyledTableCell align="right">Service Charge</StyledTableCell>

                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {desc.map((row) => (
                        <StyledTableRow key={row.text}>
                          <StyledTableCell component="th" scope="row">
                            {row.text}
                          </StyledTableCell>
                          <StyledTableCell align="right">{row.cg}</StyledTableCell>

                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Button
                  type="button"
                  variant="danger"
                  className="btn btn-secondary mt-3"
                  onClick={ADDRateCArd}
                >
                  Save
                </Button>
              </div>
              : <></>
            }
            {rateCarddata?.map((i) => (
              <div>

                <div style={{ background: "black", width: "550px", display: "flex", justifyContent: "space-between", marginTop: "10px" }}>

                  <p style={{ color: "white", marginBottom: "0", padding: "10px" }}>{i.header}</p>
                  <p style={{ color: "white" }}>{i.city}</p>
                </div>

                <TableContainer component={Paper} style={{ width: "550px", }}>
                  <Table sx={{ minWidth: 200 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Description</StyledTableCell>
                        <StyledTableCell align="right">Service Charge</StyledTableCell>

                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {i?.desc?.map((row) => (
                        <StyledTableRow key={row.text}>
                          <StyledTableCell component="th" scope="row">
                            {row.text}
                          </StyledTableCell>
                          <StyledTableCell align="right">{row.cg}</StyledTableCell>

                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Button
                  type="button"
                  variant="danger"
                  className="btn btn-secondary mt-3"
                  onClick={() => deletearteCard(i._id)}
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default RateCard;
