import React, { FC, useState } from "react";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
import CommonLayout from "./CommonLayout";
import FormItem from "./FormItem";

export interface PageAddListing1Props {
  formik: any;
}

const PageAddListing1: FC<PageAddListing1Props> = ({ formik }) => {
  const [selectedType, setSelectedType] = useState("Hotel");

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value);
    formik.handleChange(event);
  };

  const getDescription = (selectedType: string) => {
    switch (selectedType) {
      case "Hotel":
        return "Hotel: Professional hospitality businesses that usually have a unique style or theme defining their brand and decor";
      case "Cottage":
        return "Cottage: A cozy dwelling, typically in a rural or semi-rural location, often used for vacations or retreats.";
      case "Villa":
        return "Villa: A luxurious residence, often with expansive grounds, offering comfort, privacy, and upscale amenities.";
      default:
        return "A catchy name usually includes: House name + Room name + Featured property + Tourist destination";
    }
  };
  return (
    <CommonLayout
      index="01"
      backtHref="/add-listing-1"
      nextHref="/add-listing-2"
    >
      <>
        <h2 className="text-2xl font-semibold">Choosing listing categories</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* FORM */}
        <div className="space-y-8">
          {/* ITEM */}
          <FormItem
            label="Choose a property type"
            desc={getDescription(selectedType)}
          >
            <Select
              {...formik.getFieldProps("type")}
              onChange={handleTypeChange}
            >
              <option value="Hotel">Hotel</option>
              <option value="Cottage">Cottage</option>
              <option value="Villa">Villa</option>
              <option value="Cabin">Cabin</option>
              <option value="Farm stay">Farm stay</option>
              <option value="Houseboat">Houseboat</option>
              <option value="Lighthouse">Lighthouse</option>
            </Select>
            {formik.errors && formik.errors.type && (
              <span className="text-red-500 text-sm">{formik.errors.type}</span>
            )}
          </FormItem>
          <FormItem
            label="Place name"
            desc="A catchy name usually includes: House name + Room name + Featured property + Tourist destination"
          >
            <Input
              placeholder="Places name"
              {...formik.getFieldProps("title")}
            />
            {formik.errors && formik.errors.title && (
              <span className="text-red-500 text-sm">
                {formik.errors.title}
              </span>
            )}
          </FormItem>
        </div>
      </>
    </CommonLayout>
  );
};

export default PageAddListing1;
