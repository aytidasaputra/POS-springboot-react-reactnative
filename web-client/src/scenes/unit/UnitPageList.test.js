import React from "react";
import { mount } from "enzyme";
import UnitPageList from "./UnitPageList";
import * as unitActions from "../../action/units";
import { MemoryRouter as Router } from "react-router-dom";
const data = {
  id: 1,
  name: "Gram"
};

unitActions.findById = jest.fn().mockReturnValue(data);

describe("UnitPageList", () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount(
      <Router>
        <UnitPageList match={{ params: { id: 1 } }} />
      </Router>
    );
  });

  test("should have data", () => {
    //   console.log(wrapper.debugs);
    const component = wrapper.find("UnitPageList");
    expect(component.state("id")).toEqual(data.length);
  });
});
