import React from "react";
import { shallow } from "enzyme";
import Home from "./Home";

describe("Hello component", () => {
  it("should be home component", () => {
    const wrapper = shallow(<Home />);
    const text = wrapper.find("CardText");
    expect(text);
  });
});
