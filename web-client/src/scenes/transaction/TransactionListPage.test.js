import React from "react";
import { shallow } from "enzyme";
import TransactionListPage from "./TransactionListPage";

describe("Hello component", () => {
  it("should be TransactionLIstPAge component", () => {
    const wrapper = shallow(<TransactionListPage />);
    const text = wrapper.find("div").text();
    expect(text);
  });
});
