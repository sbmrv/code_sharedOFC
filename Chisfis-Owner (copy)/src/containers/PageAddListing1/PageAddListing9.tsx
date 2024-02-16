import DatePickerCustomDay from "components/DatePickerCustomDay";
import DatePickerCustomHeaderTwoMonth from "components/DatePickerCustomHeaderTwoMonth";
import NcInputNumber from "components/NcInputNumber/NcInputNumber";
import React, { FC, useState } from "react";
import CommonLayout from "./CommonLayout";

export interface PageAddListing9Props {
  formik: any;
}

const PageAddListing9: FC<PageAddListing9Props> = ({ formik }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const handleChangeData = (value: number, type: string) => {
    if (
      (type === "night_min" && value <= formik.values.night_max) ||
      (type === "night_max" && value >= formik.values.night_min)
    ) {
      formik.setFieldValue(type, value);
      setErrorMessage("");
    } else {
      const errorMessageText =
        "Minimum value cannot be greater than maximum value.";
      setErrorMessage(errorMessageText);
    }
  };
  return (
    <CommonLayout
      index="09"
      backtHref="/add-listing-8"
      nextHref="/add-listing-10"
    >
      <>
        <div>
          <h2 className="text-2xl font-semibold">How long can guests stay?</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            {` Shorter trips can mean more reservations, but you'll turn over your
          space more often.`}
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* FORM */}
        <div className="space-y-7">
          {/* ITEM */}
          <NcInputNumber
            label="Nights min"
            defaultValue={formik.values.night_min}
            onChange={(value) => handleChangeData(value, "night_min")}
          />
          <NcInputNumber
            label="Nights max"
            defaultValue={formik.values.night_max}
            onChange={(value) => handleChangeData(value, "night_max")}
          />
          {formik.errors &&
            errorMessage &&
            (formik.errors.night_min || formik.errors.night_max) && (
              <span className="text-red-500 text-sm">
                {formik.errors.night_min}
              </span>
            )}
          {formik.errors && formik.errors.night_min && (
            <span className="text-red-500 text-sm">
              {formik.errors.night_min}
            </span>
          )}
        </div>
      </>
    </CommonLayout>
  );
};

export default PageAddListing9;
