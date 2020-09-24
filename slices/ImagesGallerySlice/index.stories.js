import React from "react";
import MySlice from ".";
import mock from "./mock.json";

export default {
  title: "ImagesGallerySlice",
  component: MySlice,
};

export const __DefaultSlice = () => <MySlice slice={mock} />;
