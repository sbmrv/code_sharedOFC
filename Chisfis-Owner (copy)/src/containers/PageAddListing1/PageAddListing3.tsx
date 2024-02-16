import NcInputNumber from "components/NcInputNumber/NcInputNumber";
import React, { FC } from "react";
import Select from "shared/Select/Select";
import CommonLayout from "./CommonLayout";
import FormItem from "./FormItem";

export interface PageAddListing3Props {
  formik: any;
}

const PageAddListing3: FC<PageAddListing3Props> = ({ formik }) => {
  const handleChangeData = (value: number, type: string) => {
    formik.setFieldValue(type, value);
  };
  return (
    <CommonLayout
      index="03"
      backtHref="/add-listing-2"
      nextHref="/add-listing-4"
    >
      <>
        <h2 className="text-2xl font-semibold">Size of your location</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* FORM */}
        <div className="space-y-8">
          {/* ITEM */}
          {/* acreage: "", guests: "", bedrooms: "", beds: "", bathrooms: "",
          kitchen: "", */}
          <FormItem label="Acreage (m2)">
            <Select {...formik.getFieldProps("acreage")}>
              <option value="100">100</option>
              <option value="200">200</option>
              <option value="300">300</option>
              <option value="400">400</option>
              <option value="500">500</option>
            </Select>
            {formik.errors && formik.errors.acreage && (
              <span className="text-red-500 text-sm">
                {formik.errors.acreage}
              </span>
            )}
          </FormItem>
          <NcInputNumber
            defaultValue={formik.values.guests}
            onChange={(value) => handleChangeData(value, "guests")}
            label="Guests"
            // defaultValue={4}
          />
          {formik.errors && formik.errors.guests && (
            <span className="text-red-500 text-sm">{formik.errors.guests}</span>
          )}
          <NcInputNumber
            label="Bedroom"
            defaultValue={formik.values.bedrooms}
            onChange={(value) => handleChangeData(value, "bedrooms")}
          />
          {formik.errors && formik.errors.bedrooms && (
            <span className="text-red-500 text-sm">
              {formik.errors.bedrooms}
            </span>
          )}
          <NcInputNumber
            label="Beds"
            defaultValue={formik.values.beds}
            onChange={(value) => handleChangeData(value, "beds")}
          />
          {formik.errors && formik.errors.beds && (
            <span className="text-red-500 text-sm">{formik.errors.beds}</span>
          )}
          <NcInputNumber
            label="Bathroom"
            defaultValue={formik.values.bathrooms}
            onChange={(value) => handleChangeData(value, "bathrooms")}
          />
          {formik.errors && formik.errors.bathrooms && (
            <span className="text-red-500 text-sm">
              {formik.errors.bathrooms}
            </span>
          )}
          <NcInputNumber
            label="Kitchen"
            defaultValue={formik.values.kitchen}
            onChange={(value) => handleChangeData(value, "kitchen")}
          />
          {formik.errors && formik.errors.kitchen && (
            <span className="text-red-500 text-sm">
              {formik.errors.kitchen}
            </span>
          )}
        </div>
      </>
    </CommonLayout>
  );
};

export default PageAddListing3;
