import React from "react";
import { shallow } from "enzyme";
import ErrorPage from "./ErrorPage";

describe("Error component", () => {
  it("should be error component", () => {
    const wrapper = shallow(<ErrorPage />);
    const text = wrapper.find("div").text();
    expect(text);
  });
});
