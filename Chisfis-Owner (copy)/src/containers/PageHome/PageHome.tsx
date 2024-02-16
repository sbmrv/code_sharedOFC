import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import React, { useState, FC, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import axios from "axios";
import { API_URL } from "../../api/config";
import Action from "./Action";
import MUIDataTable from "mui-datatables";

const getRowId = (row: Property) => row._id;
interface Property {
  _id: string;
  title: string;
  address: string;
  price: number;
}
export interface ListingStayPageProps {
  className?: string;
}

const ListingStayPage: FC<ListingStayPageProps> = ({ className = "" }) => {
  const [currentProp, setCurrentProp] = useState({});

  const [propertyData, setPropertyData] = useState<any>([]);

  const getPropertyData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${API_URL}/property/get-owner-property`,
        {
          headers: {
            token: token,
          },
        }
      );
      if (response.data.error === false) {
        const property = response.data.propertydata;
        setPropertyData(property);
      }
      // Set loading to false when data is successfully loaded
    } catch (err) {
      console.error("error while fetching properties data", err);
    }
  };

  const locationPathName = useLocation().pathname;
  useEffect(() => {
    getPropertyData();
  }, [locationPathName]);
  const [openDialog, setOpenDailog] = useState(false);

  const handleCloseDialog = () => {
    setOpenDailog(false);
  };

  const deleteProperty = async (currentProp: any) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${API_URL}/property/delete-property?propId=${currentProp._id}`,
        {
          headers: {
            token: token,
          },
        }
      );
      const text = response.data.message;
      getPropertyData();
      if (response.data.error === false) {
        toast.success(text);
      }
      if (response.data.error === true) {
        toast.error(text);
      }
      handleCloseDialog();
      // Set loading to false when data is successfully loaded
    } catch (err) {
      console.error("error while fetching properties data", err);
      handleCloseDialog();
    }
  };

  const options: any = {
    filterType: "dropdown",
    selectableRows: "none",
    responsive: "horizontal",
    rowsPerPage: 10,
    page: 0,
    download: false,
    search: false,
    print: false,
    filter: false,
    viewColumns: false,
    customToolbar: () => {
      return <ButtonPrimary href="/add-property">Add Property</ButtonPrimary>;
    },
  };
const FullAddress = propertyData.map((property: Property) => {
  const { room_number, street, city, state, country, postal_code } = property as any;
  const address = room_number
    ? `${room_number}, ${street} ${city} ${state}, ${country} ${postal_code}`
    : `${street} ${city} ${state}, ${country} ${postal_code}`;
  return address;
});
  const columns = [
    {
      name: "title",
      options: {
        filter: true,
        width: 300,
      },
    },
    {
      name: "address",
      options: {
        filter: true,
        width: 300,
        customBodyRenderLite: (dataIndex: any, rowIndex: any) => (
          <div style={{ textAlign: "start" }}>
            {FullAddress[rowIndex]}
          </div>
        ),
      },
    },
    {
      name: "price",
      options: {
        filter: true,
        width: 300,

        customBodyRenderLite: (dataIndex: any, rowIndex: any) => (
          <div style={{ textAlign: "start" }}>
            ₹ {propertyData[dataIndex].monday}{" "}
          </div>
        ),
      },
    },
    {
      name: "Actions",
      options: {
        filter: false,
        width: 300,
        customHeadRender: (columnMeta: any) => (
          <th
            key={columnMeta.index}
            style={{
              textAlign: "center",
              paddingRight: "20px",
              display: columnMeta.display ? "table-cell" : "none",
            }}
          >
            {columnMeta.label}
          </th>
        ),
        customBodyRenderLite: (dataIndex: any, rowIndex: any) => (
          <div style={{ textAlign: "center" }}>
            <Action
              property={propertyData[dataIndex]}
              rowIndex={rowIndex}
              setOpenDialog={setOpenDailog}
              currentProp={setCurrentProp}
            />
          </div>
        ),
      },
    },
  ];

  return (
    <div
      className={`nc-ListingStayPage relative overflow-hidden ${
        className || ""
      }`}
      data-nc-id="ListingStayPage"
    >
      <Helmet>
        <title>easystays-owner || Booking React Template</title>
      </Helmet>
      <div
        className="listingSection__wrap"
        style={{ transform: "scale(0.99)", border: "none" }}
      >
        {/* HEADING */}
        <div className="w-full">
          <MUIDataTable
            title={
              <div className="flex justify-between  w-full">
                <h2 className="text-2xl font-semibold">Properties</h2>
              </div>
            }
            key={propertyData.length}
            data={propertyData}
            columns={columns}
            options={options}
          />
        </div>
      </div>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{"Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure, you want to delete this Property?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <ButtonPrimary onClick={() => deleteProperty(currentProp)}>
            Delete
          </ButtonPrimary>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ListingStayPage;
