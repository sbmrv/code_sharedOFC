import React, { FC } from "react";
import Checkbox from "shared/Checkbox/Checkbox";
import CommonLayout from "./CommonLayout";

export interface PageAddListing4Props {
  formik: any;
}

const PageAddListing4: FC<PageAddListing4Props> = ({ formik }) => {
  const handleCheckboxChange = (name: string, checked: boolean) => {
    const currentArray = formik.values.amenities || [];
    if (checked) {
      formik.setFieldValue("amenities", [...currentArray, name]);
    }
    else {
      formik.setFieldValue(
        "amenities",
        currentArray.filter((item: string) => item !== name)
      );
    }
  };

  return (
    <CommonLayout
      index="04"
      backtHref="/add-listing-3"
      nextHref="/add-listing-5"
    >
      <>
        <div>
          <h2 className="text-2xl font-semibold">Amenities </h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Many customers have searched for accommodation based on amenities
            criteria
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* FORM */}
        <div className="space-y-8">
          {/* ITEM */}
          <div>
            <label className="text-lg font-semibold" htmlFor="">
              General amenities
            </label>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <Checkbox
                label="Wifi"
                name="Wifi"
                checked={formik.values.amenities.includes("Wifi")}
                onChange={(checked) => handleCheckboxChange("Wifi", checked)}
              />
              <Checkbox
                label="Internet"
                name="Internet"
                checked={formik.values.amenities.includes("Internet")}
                onChange={(checked) =>
                  handleCheckboxChange("Internet", checked)
                }
              />
              <Checkbox
                label="TV"
                name="TV"
                checked={formik.values.amenities.includes("TV")}
                onChange={(checked) => handleCheckboxChange("TV", checked)}
              />
              <Checkbox
                label="Air conditioning"
                name="Air conditioning"
                checked={formik.values.amenities.includes("Air conditioning")}
                onChange={(checked) =>
                  handleCheckboxChange("Air conditioning", checked)
                }
              />
              <Checkbox
                label="Fan"
                name="Fan"
                checked={formik.values.amenities.includes("Fan")}
                onChange={(checked) => handleCheckboxChange("Fan", checked)}
              />
              <Checkbox
                label="Private entrance"
                name="Private entrance"
                checked={formik.values.amenities.includes("Private entrance")}
                onChange={(checked) =>
                  handleCheckboxChange("Private entrance", checked)
                }
              />
              <Checkbox
                label="Heater"
                name="Heater"
                checked={formik.values.amenities.includes("Heater")}
                onChange={(checked) => handleCheckboxChange("Heater", checked)}
              />
              <Checkbox
                label="Washing machine"
                name="Washing machine"
                checked={formik.values.amenities.includes("Washing machine")}
                onChange={(checked) =>
                  handleCheckboxChange("Washing machine", checked)
                }
              />
              <Checkbox
                label="Detergent"
                name="Detergent"
                checked={formik.values.amenities.includes("Detergent")}
                onChange={(checked) =>
                  handleCheckboxChange("Detergent", checked)
                }
              />
              <Checkbox
                label="Clothes dryer"
                name="Clothes dryer"
                checked={formik.values.amenities.includes("Clothes dryer")}
                onChange={(checked) =>
                  handleCheckboxChange("Clothes dryer", checked)
                }
              />
              <Checkbox
                label="Baby cot"
                name="Baby cot"
                checked={formik.values.amenities.includes("Baby cot")}
                onChange={(checked) =>
                  handleCheckboxChange("Baby cot", checked)
                }
              />
              <Checkbox
                label="Desk"
                name="Desk "
                checked={formik.values.amenities.includes("Desk")}
                onChange={(checked) => handleCheckboxChange("Desk", checked)}
              />
              <Checkbox
                label="Fridge"
                name="Fridge"
                checked={formik.values.amenities.includes("Fridge")}
                onChange={(checked) => handleCheckboxChange("Fridge", checked)}
              />
              <Checkbox
                label="Dryer"
                name="Dryer"
                checked={formik.values.amenities.includes("Dryer")}
                onChange={(checked) => handleCheckboxChange("Dryer", checked)}
              />
            </div>
          </div>

          {/* ITEM */}
          <div>
            <label className="text-lg font-semibold" htmlFor="">
              Other amenities
            </label>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <Checkbox
                label="Wardrobe"
                name="Wardrobe"
                checked={formik.values.amenities.includes("Wardrobe")}
                onChange={(checked) =>
                  handleCheckboxChange("Wardrobe", checked)
                }
              />
              <Checkbox
                label="Cloth hook"
                name="Cloth hook"
                checked={formik.values.amenities.includes("Cloth hook")}
                onChange={(checked) =>
                  handleCheckboxChange("Cloth hook", checked)
                }
              />
              <Checkbox
                label="Extra cushion"
                name="Extra cushion"
                checked={formik.values.amenities.includes("Extra cushion")}
                onChange={(checked) =>
                  handleCheckboxChange("Extra cushion", checked)
                }
              />
              <Checkbox
                label="Gas stove"
                name="Gas stove"
                checked={formik.values.amenities.includes("Gas stove")}
                onChange={(checked) =>
                  handleCheckboxChange("Gas stove", checked)
                }
              />
              <Checkbox
                label="Toilet paper"
                name="Toilet paper"
                checked={formik.values.amenities.includes("Toilet paper")}
                onChange={(checked) =>
                  handleCheckboxChange("Toilet paper", checked)
                }
              />
              <Checkbox
                label="Free toiletries"
                name="Free toiletries"
                checked={formik.values.amenities.includes("Free toiletries")}
                onChange={(checked) =>
                  handleCheckboxChange("Free toiletries", checked)
                }
              />
              <Checkbox
                label="Makeup table"
                name="Makeup table"
                checked={formik.values.amenities.includes("Makeup table")}
                onChange={(checked) =>
                  handleCheckboxChange("Makeup table", checked)
                }
              />
              <Checkbox
                label="Hot pot"
                name="Hot pot"
                checked={formik.values.amenities.includes("Hot pot")}
                onChange={(checked) => handleCheckboxChange("Hot pot", checked)}
              />
              <Checkbox
                label="Bathroom heaters"
                name="Bathroom heaters"
                checked={formik.values.amenities.includes("Bathroom heaters")}
                onChange={(checked) =>
                  handleCheckboxChange("Bathroom heaters", checked)
                }
              />
              <Checkbox
                label="Kettle"
                name="Kettle"
                checked={formik.values.amenities.includes("Kettle")}
                onChange={(checked) => handleCheckboxChange("Kettle", checked)}
              />
              <Checkbox
                label="Dishwasher"
                name="Dishwasher"
                checked={formik.values.amenities.includes("Dishwasher")}
                onChange={(checked) =>
                  handleCheckboxChange("Dishwasher", checked)
                }
              />
              <Checkbox
                label="BBQ grill"
                name="BBQ grill"
                checked={formik.values.amenities.includes("BBQ grill")}
                onChange={(checked) =>
                  handleCheckboxChange("BBQ grill", checked)
                }
              />
              <Checkbox
                label="Toaster"
                name="Toaster"
                checked={formik.values.amenities.includes("Toaster")}
                onChange={(checked) => handleCheckboxChange("Toaster", checked)}
              />
              <Checkbox
                label="Towel"
                name="Towel"
                checked={formik.values.amenities.includes("Towel")}
                onChange={(checked) => handleCheckboxChange("Towel", checked)}
              />
              <Checkbox
                label="Dining table"
                name="Dining table"
                checked={formik.values.amenities.includes("Dining table")}
                onChange={(checked) =>
                  handleCheckboxChange("Dining table", checked)
                }
              />
            </div>
          </div>

          {/* ITEM */}
          <div>
            <label className="text-lg font-semibold" htmlFor="">
              Safe amenities
            </label>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <Checkbox
                label="Fire siren"
                name="Fire siren"
                checked={formik.values.amenities.includes("Fire siren")}
                onChange={(checked) =>
                  handleCheckboxChange("Fire siren", checked)
                }
              />
              <Checkbox
                label="Fire extinguisher"
                name="Fire extinguisher"
                checked={formik.values.amenities.includes("Fire extinguisher")}
                onChange={(checked) =>
                  handleCheckboxChange("Fire extinguisher", checked)
                }
              />
              <Checkbox
                label="Anti-theft key"
                name="Anti-theft key"
                checked={formik.values.amenities.includes("Anti-theft key")}
                onChange={(checked) =>
                  handleCheckboxChange("Anti-theft key", checked)
                }
              />
              <Checkbox
                label="Safe vault"
                name="Safe vault"
                checked={formik.values.amenities.includes("Safe vault")}
                onChange={(checked) =>
                  handleCheckboxChange("Safe vault", checked)
                }
              />
            </div>
          </div>
        </div>
      </>
    </CommonLayout>
  );
};

export default PageAddListing4;
