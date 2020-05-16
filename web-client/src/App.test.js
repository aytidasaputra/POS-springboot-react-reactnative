import React from "react";
import { shallow } from "enzyme";
import App from "./App";
import routes from "./configs/routes";
import toJson from "enzyme-to-json";

describe("App", () => {
  const wrapper = shallow(<App />);
  test("should ", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  test("should ", () => {
    expect(wrapper.find("Route")).toHaveLength(routes.length);
  });
});
