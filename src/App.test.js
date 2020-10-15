import React from "react";
import { render } from "@testing-library/react";
import Root from "./Root";
import { shallow } from "enzyme";
import App from "./views/App";

test("renders without crashing", () => {
  shallow(<App />)
})

