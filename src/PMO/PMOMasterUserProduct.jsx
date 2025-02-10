import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import PopUpEditProduct from "./PopUpEditProduct";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "30ch",
      },
    },
  },
}));

function PMOMasterUserProduct() {
  const [isPopUpOpen, setIsPopUp] = useState(false);
  const [userData, setUserData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for the search input
  const getPMOId = localStorage.getItem("pmoId");

  const openPopUp = () => {
    setIsPopUp(true);
  };

  const closePopUp = () => {
    setIsPopUp(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/pandora/getuserproduct?pmoId=${getPMOId}`
        );
        setUserData(response.data.userProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [getPMOId]);

  // Filter userData based on search query
  const filteredData = userData.filter(
    (userproduct) =>
      userproduct.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      userproduct.udomain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      userproduct.idBluePrint
        .toString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      userproduct.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {isPopUpOpen && <PopUpEditProduct closePopUp={closePopUp} />}

      <Navbar />
      <div className="content-all">
        <div className="content-box content-box-scroll-x">
          <div className="space-between-start">
            <div className="card-title">Master User Product</div>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update search input
              />
          </Search>
          </div>
          <table>
            <thead>
              <tr>
                <th className="first-child">No</th>
                <th>Name</th>
                <th>Udomain</th>
                <th>ID Blueprint</th>
                <th className="last-child">Name Product</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((userproduct, index) => (
                <tr key={userproduct.id}>
                  <td>{index + 1}</td>
                  <td>{userproduct.name}</td>
                  <td>{userproduct.udomain}</td>
                  <td>{userproduct.idBluePrint}</td>
                  <td>{userproduct.productName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default PMOMasterUserProduct;
