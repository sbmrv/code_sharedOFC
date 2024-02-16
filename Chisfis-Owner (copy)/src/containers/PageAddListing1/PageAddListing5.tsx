import React, { FC, useState } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import CommonLayout from "./CommonLayout";

export interface PageAddListing5Props {
  formik: any;
}

const PageAddListing5: FC<PageAddListing5Props> = ({ formik }) => {
  const [tagInput, setTagInput] = useState("");

  const handleAddTag = () => {
    if (tagInput.trim() !== "") {
      const updatedRules = [...formik.values.additional_rules, tagInput];
      formik.setFieldValue("additional_rules", updatedRules);
    }
    setTagInput("");
  };
  const handleDeleteTag = (index: number) => {
    const updatedRules = [...formik.values.additional_rules];
    updatedRules.splice(index, 1); // Remove the item at the specified index
    formik.setFieldValue("additional_rules", updatedRules);
  };
  const handleRadioChange = (name: string, id: string) => {
    const value = id === "Allow" ? true : false;
    formik.setFieldValue(name, value);
  };
  const renderRadio = (name: string, id: string, label: string) => {
    return (
      <div className="flex items-center">
        <input
          id={id + name}
          name={name}
          checked={id === "Allow" ? formik.values[name]: !formik.values[name]}
          // value={formik.values}
          type="radio"
          className="focus:ring-primary-500 h-6 w-6 text-primary-500 border-neutral-300 "
          onChange={() => handleRadioChange(name, id)}
        />
        <label
          htmlFor={id + name}
          className="ml-3 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
        >
          {label}
        </label>
      </div>
    );
  };

  // const renderNoInclude = (text: string) => {
  //   return (
  //     <div className="flex items-center justify-between py-3">
  //       <span className="text-neutral-6000 dark:text-neutral-400 font-medium">
  //         {text}
  //       </span>
  //       <i className="text-2xl text-neutral-400 las la-times-circle hover:text-neutral-900 dark:hover:text-neutral-100 cursor-pointer"></i>
  //     </div>
  //   );
  // };
  return (
    <CommonLayout
      index="05"
      backtHref="/add-listing-4"
      nextHref="/add-listing-6"
    >
      <>
        <div>
          <h2 className="text-2xl font-semibold">
            Set house rules for your guests{" "}
          </h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Guests must agree to your house rules before they book.
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* FORM */}
        <div className="space-y-8">
          {/* ITEM */}
          {/* <div>
            <label className="text-lg font-semibold" htmlFor="">
              General amenities
            </label>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {renderRadio("Smoking", "Do", "Do not allow")}
              {renderRadio("Smoking", "Allow", "Allow", true)}
            </div>
          </div> */}
          {/* ITEM */}
          <div>
            <label className="text-lg font-semibold" htmlFor="">
              Pet
            </label>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {renderRadio("pet", "Do", "Do not allow")}
              {renderRadio("pet", "Allow", "Allow")}
            </div>
          </div>

          {/* ITEM */}
          <div>
            <label className="text-lg font-semibold" htmlFor="">
              Party organizing
            </label>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {renderRadio("party_organizing", "Do", "Do not allow")}
              {renderRadio("party_organizing", "Allow", "Allow")}
            </div>
          </div>

          {/* ITEM */}
          <div>
            <label className="text-lg font-semibold" htmlFor="">
              Cooking
            </label>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {renderRadio("cooking", "Do", "Do not allow")}
              {renderRadio("cooking", "Allow", "Allow")}
            </div>
          </div>
          <div>
            <label className="text-lg font-semibold" htmlFor="">
              Smoking
            </label>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {renderRadio("smoking", "Do", "Do not allow")}
              {renderRadio("smoking", "Allow", "Allow")}
            </div>
          </div>
          <div>
            <label className="text-lg font-semibold" htmlFor="">
              Drinking
            </label>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {renderRadio("drinking", "Do", "Do not allow")}
              {renderRadio("drinking", "Allow", "Allow")}
            </div>
          </div>
          {/* ----------- */}
          <div className=" border-b border-neutral-200 dark:border-neutral-700"></div>
          <span className="block text-lg font-semibold">Additional rules</span>
          <div className="flow-root">
            <div className="-my-3 divide-y divide-neutral-100 dark:divide-neutral-800">
              {/* {renderNoInclude("No smoking in common areas")}
              {renderNoInclude("Do not wear shoes/shoes in the house")}
              {renderNoInclude("No cooking in the bedroom")} */}
              {formik.values.additional_rules.map(
                (rule: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3"
                  >
                    <span className="text-neutral-6000 dark:text-neutral-400 font-medium">
                      {rule}
                    </span>
                    <i
                      className="text-2xl text-neutral-400 las la-times-circle hover:text-neutral-900 dark:hover:text-neutral-100 cursor-pointer"
                      onClick={() => handleDeleteTag(index)}
                    ></i>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between space-y-3 sm:space-y-0 sm:space-x-5">
            <Input
              className="!h-full"
              placeholder="No smoking..."
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
            />
            {/* {formik.errors && (
              <span className="text-red-500 text-sm">
                {formik.errors}
              </span>
            )} */}
            <ButtonPrimary className="flex-shrink-0" onClick={handleAddTag}>
              <i className="text-xl las la-plus"></i>
              <span className="ml-3">Add tag</span>
            </ButtonPrimary>
          </div>
        </div>
      </>
    </CommonLayout>
  );
};

export default PageAddListing5;
