import React, { FC, useState } from "react";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
import CommonLayout from "./CommonLayout";
import FormItem from "./FormItem";

export interface PageAddListing8Props {formik: any;}

const PageAddListing8: FC<PageAddListing8Props> = ({formik}) => {
  const [allPricesSame, setAllPricesSame] = useState(false);
  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ] as const;

   const handleAllPricesSameChange = (
     e: React.ChangeEvent<HTMLInputElement>
   ) => {
     setAllPricesSame(e.target.checked);
     if (e.target.checked) {
       // If checked, populate all fields with Monday's value
       const mondayValue = formik.values.monday;
       weekDays.forEach((day) => {
         formik.setFieldValue(day.toLowerCase(), mondayValue);
       });
     } 
   };
  // Now `weekDays` is an array of strings with the days of the week

  return (
    <CommonLayout
      index="08"
      backtHref="/add-listing-7"
      nextHref="/add-listing-9"
    >
      <>
        <div>
          <h2 className="text-2xl font-semibold">Price your space</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            The host's revenue is directly dependent on the setting of rates and
            regulations on the number of guests, the number of nights, and the
            cancellation policy.
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {formik.errors && formik.errors.monday && (
          <span className="text-red-500 text-sm">{formik.errors.monday}</span>
        )}
        {/* FORM */}
        <div className="space-y-8">
          {/* ITEM */}
          {/* <FormItem label="Currency">
            <Select>
              <option value="USD">USD</option>
              <option value="VND">VND</option>
              <option value="EURRO">EURRO</option>
            </Select>
          </FormItem> */}
          {weekDays.map((day, i) => (
            <FormItem key={i} label={day}>
              <div className="relative flex row">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">₹</span>
                </div>
                {/* <Input className="!pl-8 !pr-10" placeholder="0.00" /> */}
                <input
                  type="number"
                  // placeholder="0.00"
                  className={`block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3 !pl-8 !pr-10`}
                  // {...formik.getFieldProps(`${day.toLowerCase()}`)}
                  // value={formik.values.day}
                  {...formik.getFieldProps(day.toLowerCase())} // Changed this line
                  value={formik.values[day.toLowerCase()]} // Changed this line
                />
                {/* <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">USD</span>
                </div> */}
              </div>
            </FormItem>
          ))}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="allPricesSame"
              id="allPricesSame"
              checked={allPricesSame}
              onChange={handleAllPricesSameChange}
            />
            <span className="ml-2">all prices same</span>
          </div>
        </div>
      </>
    </CommonLayout>
  );
};

export default PageAddListing8;
