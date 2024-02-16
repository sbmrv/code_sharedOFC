import StayCard from "components/StayCard/StayCard";
import { DEMO_STAY_LISTINGS } from "data/listings";
import React, { FC } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import CommonLayout from "./CommonLayout";

interface PageAddListing10Props {
  formik: any;
}

const PageAddListing10: React.FC<PageAddListing10Props> = ({ formik }) => {
  return (
    <CommonLayout
      nextBtnText="Publish listing"
      index="10"
      backtHref="/add-listing-9"
      nextHref="/"
    >
      <>
        <div>
          <h2 className="text-2xl font-semibold">Congratulations 🎉</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Excellent, congratulations on completing the listing, it is waiting
            to be reviewed for publication
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* FORM */}
        <div>
          <h3 className="text-lg font-semibold">This is your listing</h3>
          <div className="max-w-xs">
            <StayCard
              className="mt-8"
              data={{
                ...DEMO_STAY_LISTINGS[0],
                reviewStart: 0,
                
              }}
              formikValues= {formik.values}
            />
          </div>
        </div>
        {/*  */}
      </>
    </CommonLayout>
  );
};

export default PageAddListing10;
