import React, { FC } from "react";
import Textarea from "shared/Textarea/Textarea";
import CommonLayout from "./CommonLayout";

export interface PageAddListing6Props {
  formik: any;
}

const PageAddListing6: FC<PageAddListing6Props> = ({ formik }) => {
  const handleInputChange = (val: any) => {
    formik.setFieldValue("place_descriptions", val.target.value);
  };
  return (
    <CommonLayout
      index="06"
      backtHref="/add-listing-5"
      nextHref="/add-listing-7"
    >
      <>
        <div>
          <h2 className="text-2xl font-semibold">
            Your place description for client
          </h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Mention the best features of your accommodation, any special
            amenities like fast Wi-Fi or parking, as well as things you like
            about the neighborhood.
          </span>
        </div>
        {formik.errors && formik.errors.place_descriptions && (
          <span className="text-red-500 text-sm">
            {formik.errors.place_descriptions}
          </span>
        )}
        <Textarea
          value={formik.values.place_descriptions}
          handleChange={handleInputChange}
          placeholder="..."
          rows={14}
        />
      </>
    </CommonLayout>
  );
};

export default PageAddListing6;
