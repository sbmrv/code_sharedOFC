import { MapPinIcon } from "@heroicons/react/24/solid";
import LocationMarker from "components/AnyReactComponent/LocationMarker";
import Label from "components/Label/Label";
import GoogleMapReact from "google-map-react";
import React, { FC } from "react";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
import CommonLayout from "./CommonLayout";
import FormItem from "./FormItem";

export interface PageAddListing2Props {
  formik: any;
}

const PageAddListing2: FC<PageAddListing2Props> = ({ formik }) => {
    const {
      country,
      street,
      room_number,
      city,
      state,
      postal_code,
      lattitude,
      longitude,
    } = formik.values as any;
  return (
    <CommonLayout
      index="02"
      nextHref="/add-listing-3"
      backtHref="/add-listing-1"
    >
      <>
        <h2 className="text-2xl font-semibold">Your place location</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* FORM */}
        <div className="space-y-8">
          {/* <ButtonSecondary>
            <MapPinIcon className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
            <span className="ml-3">Use current location</span>
          </ButtonSecondary> */}
          {/* ITEM */}
          <FormItem label="Country/Region">
            <Select {...formik.getFieldProps("country")}>
              <option selected value="India">
                India
              </option>
              <option value="Viet Nam">Viet Nam</option>
              <option value="Thailand">Thailand</option>
              <option value="France">France</option>
              <option value="Singapore">Singapore</option>
              <option value="Jappan">Jappan</option>
              <option value="Korea">Korea</option>
            </Select>
            {formik.errors && formik.errors.country && (
              <span className="text-red-500 text-sm">
                {formik.errors.country}
              </span>
            )}
          </FormItem>
          <FormItem label="Street">
            <Input placeholder="..." {...formik.getFieldProps("street")} />
            {formik.errors && formik.errors.street && (
              <span className="text-red-500 text-sm">
                {formik.errors.street}
              </span>
            )}
          </FormItem>
          <FormItem label="Room number (optional)">
            <Input {...formik.getFieldProps("room_number")} />
            {formik.errors && formik.errors.room_number && (
              <span className="text-red-500 text-sm">
                {formik.errors.room_number}
              </span>
            )}
          </FormItem>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-5">
            <FormItem label="City">
              <Input {...formik.getFieldProps("city")} />
              {formik.errors && formik.errors.city && (
                <span className="text-red-500 text-sm">
                  {formik.errors.city}
                </span>
              )}
            </FormItem>
            <FormItem label="State">
              <Input {...formik.getFieldProps("state")} />
              {formik.errors && formik.errors.state && (
                <span className="text-red-500 text-sm">
                  {formik.errors.state}
                </span>
              )}
            </FormItem>
            <FormItem label="Postal code">
              <Input {...formik.getFieldProps("postal_code")} />
              {formik.errors && formik.errors.postal_code && (
                <span className="text-red-500 text-sm">
                  {formik.errors.postal_code}
                </span>
              )}
            </FormItem>
          </div>
          <div>
            <Label>Detailed address</Label>
            <span className="block mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              {room_number} {street}, {city} {state}, {country} {" "}
               {postal_code}
            </span>
            <div className="mt-4">
              <div className="aspect-w-5 aspect-h-5 sm:aspect-h-3">
                <div className="rounded-xl overflow-hidden">
                  <GoogleMapReact
                    bootstrapURLKeys={{
                      key: "AIzaSyAGVJfZMAKYfZ71nzL_v5i3LjTTWnCYwTY",
                    }}
                    yesIWantToUseGoogleMapApiInternals
                    defaultZoom={15}
                    defaultCenter={{
                      lat: 55.9607277,
                      lng: 36.2172614,
                    }}
                  >
                    <LocationMarker lat={55.9607277} lng={36.2172614} />
                  </GoogleMapReact>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </CommonLayout>
  );
};

export default PageAddListing2;
