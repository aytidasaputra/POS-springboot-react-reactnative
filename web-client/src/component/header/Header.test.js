import React from "react";
import { mount, shallow } from "enzyme";
import Header from "./Header";
import routes from "../../configs/routes";

describe("Header", () => {
  const wrapper = shallow(<Header />);
  test("menu should have been clicked twice", () => {
    wrapper
      .find("#menu")
      .simulate("click")
      .simulate("click");
    expect("#menu");
  });
});
