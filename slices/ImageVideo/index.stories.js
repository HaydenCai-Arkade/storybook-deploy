import React from "react";
import MySlice from ".";
import mock from "./mock.json";
import mock2 from "./mock2.json";
import mock3 from "./mock3.json";

export default {
  title: "ImageVideo",
  component: MySlice,
};

export const __DefaultSlice = () => <MySlice slice={mock} />;
export const __TextPicture = () => <MySlice slice={mock2} />;
export const __TextVideo = () => <MySlice slice={mock3} />;
