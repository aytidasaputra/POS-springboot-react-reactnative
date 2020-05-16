import React from "react";
import { shallow } from "enzyme";
import ItemListPage from "./ItemListPage";

// test("should item page list", () => {
//   const wrapper = shallow(<ItemListPage />);
//   const rut = wrapper.find("columns");
//   expect(rut).not.toHaveLength(columns.length);
// });

describe("Item List Page", () => {
  it("alternates text display when the button is clicked", () => {
    const wrapper = shallow(<ItemListPage />);

    expect(wrapper).to.have.text("Turn me off");

    wrapper.find("button").simulate("click");

    expect(wrapper).to.have.text("Turn me on");
  });
});
