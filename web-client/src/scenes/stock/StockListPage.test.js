import React from "react";
import { shallow } from "enzyme";
import StockListPage from "./StockListPage";

describe("Hello component", () => {
  it("should be stockListPage component", () => {
    const wrapper = shallow(<StockListPage />);
    const text = wrapper.find("div").text();
    expect(text);
  });
});
