import * as React from "react";
import { shallow } from "enzyme";
import { MyComponent } from "./MyComponent";

it("Renders without crashing", () => {
  const wrapper = shallow(<MyComponent />);

  expect(wrapper).toMatchSnapshot();
});
