import React from "react";
import { mount } from "enzyme";
import UnitPage from "./UnitPage";
import * as unitActions from "../../../action/units";
import { MemoryRouter as Router } from "react-router-dom";
const data = {
  id: 1,
  name: "Gram"
};

unitActions.findAll = jest.fn().mockReturnValue(data);

describe("UnitPage", () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount(
      <Router>
        <UnitPage match={{ params: { id: 1 } }} />
      </Router>
    );
  });

  test("should have data", () => {
    //   console.log(wrapper.debugs);
    const component = wrapper.find("UnitPage");
    expect(component.state("id")).toEqual(data.id);
    expect(component.state("name")).toEqual(data.name);
  });
});
