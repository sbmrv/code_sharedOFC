import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { useFormik } from "formik";
import * as Yup from "yup";
import { API_URL } from "../../api/config";
import axios from "axios";
import { toast } from "react-toastify";

import PageAddListing1 from "./PageAddListing1";
import PageAddListing2 from "./PageAddListing2";
import PageAddListing3 from "./PageAddListing3";
import PageAddListing4 from "./PageAddListing4";
import PageAddListing5 from "./PageAddListing5";
import PageAddListing6 from "./PageAddListing6";
import PageAddListing7 from "./PageAddListing7";
import PageAddListing8 from "./PageAddListing8";
import PageAddListing9 from "./PageAddListing9";
import PageAddListing10 from "./PageAddListing10";
import { navigate } from "@reach/router";
import { useState } from "react";

const HorizontalLinearStepper: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setisLoading]= useState(false);
  // const isStepOptional = (step: number) => {
  //   // Define which steps are optional
  //   return step === 1;
  // };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const pageValidation1 = Yup.object({
    type: Yup.string().required("Property type is required"),
    title: Yup.string().required("Place name is required"),
  });
  const pageValidation2 = Yup.object({
    country: Yup.string().required("Country is required"),
    street: Yup.string().required("Street is required"),
    // room_number: Yup.number()
    //   .typeError("Room number must be a number")
    //   .required("Room number is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    postal_code: Yup.number()
      .typeError("Postal code must be a number")
      .required("Postal code is required")
      .test(
        "is-number",
        "Postal code must be a valid number",
        (value) => !isNaN(value)
      ),
    // latitude: Yup.number().required("Latitude is required"),
    // longitude: Yup.number().required("Longitude is required"),
  });
  const pageValidation3 = Yup.object({
    acreage: Yup.number().required("Acreage is required"),
    guests: Yup.number().required("Number of guests is required"),
    bedrooms: Yup.number().required("Number of bedrooms is required"),
    beds: Yup.number().required("Number of beds is required"),
    bathrooms: Yup.number().required("Number of bathrooms is required"),
    kitchen: Yup.number().required("Kitchen information is required"),
  });
  // Page 4
  const pageValidation4 = Yup.object({
    // amenities: Yup.string().required("Amenities information is required"),
  });
  // Page 5
  const pageValidation5 = Yup.object({
    // pet: Yup.boolean().required("Pet information is required"),
    // party_organizing: Yup.boolean().required(
    //   "Party organizing information is required"
    // ),
    // cooking: Yup.boolean().required("Cooking information is required"),
    // smoking: Yup.boolean().required("Smoking information is required"),
    // drinking: Yup.boolean().required("Drinking information is required"),
  });
  // Page 6
  const pageValidation6 = Yup.object({
    place_descriptions: Yup.string().required(
      "Place descriptions are required"
    ),
  });
  // Page 7
  const pageValidation7 = Yup.object({
    cover_image: Yup.string().required("Cover image is required"),
    galleryImgs: Yup.array()
      .of(Yup.string())
      .required("Gallery images are required"),
  });
  // Page 8
  const pageValidation8 = Yup.object({
    monday: Yup.number().required("Monday availability is required"),
    tuesday: Yup.number().required("Tuesday availability is required"),
    wednesday: Yup.number().required("Wednesday availability is required"),
    thursday: Yup.number().required("Thursday availability is required"),
    friday: Yup.number().required("Friday availability is required"),
    saturday: Yup.number().required("Saturday availability is required"),
    sunday: Yup.number().required("Sunday availability is required"),
  });

  // Page 9
  const pageValidation9 = Yup.object({
    night_min: Yup.number()
      .required("Minimum night is required")
      .min(0, "Minimum night cannot be less than 0")
      .test(
        "less-than-night-max",
        "Minimum night cannot be greater than or equal to maximum night",
        function (value) {
          return value < this.parent.night_max;
        }
      ),
    night_max: Yup.number()
      .required("Maximum night is required")
      .test(
        "greater-than-night-min",
        "Maximum night cannot be less than or equal to minimum night",
        function (value) {
          return value > this.parent.night_min;
        }
      ),
  });
  const pageValidation10 = Yup.object({
    type: Yup.string().required("Property type is required"),
    title: Yup.string().required("Place name is required"),
  });
  const token = localStorage.getItem("token");
  const pathname = window.location.pathname;
  const id = pathname.split("/").pop();

  const getOnePropertyDetails = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${API_URL}/property/get-property-details?id=${id}`,
        {
          headers: {
            token: token,
          },
        }
      );
      if (response.data.error === false) {

        const propertyData = response.data.propertyDetails;
        formik.setValues(propertyData);
      }
    } catch (err) {
      console.error("error while fetching properties data", err);
    }
  };

  React.useEffect(() => {
    getOnePropertyDetails();
  }, []);
  const formik = useFormik({
    initialValues: {
      type: "",
      title: "",
      country: "India",
      street: "",
      room_number: "",
      city: "",
      state: "",
      postal_code: "",
      lattitude: "",
      longitude: "",
      acreage: 100,
      guests: 0,
      bedrooms: 0,
      beds: 0,
      bathrooms: 0,
      kitchen: 0,
      amenities: [],
      pet: false,
      party_organizing: false,
      cooking: false,
      smoking: false,
      drinking: false,
      additional_rules: [],
      place_descriptions: "",
      monday: 0,
      tuesday: 0,
      wednesday: 0,
      thursday: 0,
      friday: 0,
      saturday: 0,
      sunday: 0,
      night_min: 0,
      night_max: 0,
      cover_image: "",
      galleryImgs: [],
    },
    validationSchema: () => {
      switch (activeStep) {
        case 0:
          return pageValidation1;
        case 1:
          return pageValidation2;
        case 2:
          return pageValidation3;
        case 3:
          return pageValidation4;
        case 4:
          return pageValidation5;
        case 5:
          return pageValidation6;
        case 6:
          return pageValidation7;
        case 7:
          return pageValidation8;
        case 8:
          return pageValidation9;
        case 9:
          return pageValidation10;
        default:
          return Yup.object({});
      }
    },
    onSubmit: (values) => {
      handleNext();
    },
  }) as any;

  const handleFormSubmission = async () => {
    setisLoading(true);
    try {
      await formik.validateForm();
      const response = await axios.post(
        `${API_URL}/property/update-property`,

        {
          ...formik.values,
          id: id,
        },
        {
          headers: {
            token: token,
          },
        }
      );
      const text = response.data.message;
      if (response.data.error === false) {
        toast.success(text);
        navigate("/property");
      }
      if (response.data.error === true) {
        toast.error(text);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
    setisLoading(false);
  };

  const components = [
    <PageAddListing1 formik={formik} />,
    <PageAddListing2 formik={formik} />,
    <PageAddListing3 formik={formik} />,
    <PageAddListing4 formik={formik} />,
    <PageAddListing5 formik={formik} />,
    <PageAddListing6 formik={formik} />,
    <PageAddListing7 formik={formik} />,
    <PageAddListing8 formik={formik} />,
    <PageAddListing9 formik={formik} />,
    <PageAddListing10 formik={formik} />,
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <React.Fragment>
        {React.cloneElement(components[activeStep], { formik })}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            pt: 2,
            gap: 2,
            mr: "18%",
            mb: 12,
          }}
        >
          <Box sx={{ flex: "1 1 auto" }} />
          <div className="px-4 max-w-3xl mx-auto pb-12 pt-14 sm:py-12 lg:pb-8">
            <div className="flex justify-end space-x-5">
              <ButtonSecondary
                onClick={() => {
                  handleBack();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                disabled={components[activeStep] === components[0]}
              >
                Go back
              </ButtonSecondary>{" "}
              {components[activeStep] === components[9] ? (
                <ButtonPrimary
                  type="button"
                  onClick={() => {
                    handleFormSubmission();
                  }}
                >
                  Submit
                </ButtonPrimary>
              ) : (
                <ButtonPrimary
                  type="button"
                  onClick={() => {
                    formik.handleSubmit();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  Continue
                </ButtonPrimary>
              )}
            </div>
          </div>
        </Box>
      </React.Fragment>
    </Box>
  );
};

export default HorizontalLinearStepper;
