import React from "react";
import { shallow } from "enzyme";
import Card from "./Card";

// we define initial props (empty strings)
const initialProps = {
  title: "",
  url: ""
};

// we shallow wrap the Card while passing in the "initialProps" 
const wrapper = shallow(<Card {...initialProps} />);

// we define some props that will be passed in during our second test
const nextProps = {
  title: "owl",
  url: "https://media.giphy.com/media/qISaMW1xwmvNS/giphy.gif"
};

describe("Card Component", () => {
  afterAll(() => wrapper.unmount());

  it("shouldn't render a card without the required props", () => {
    expect(wrapper.type()).toBeNull();
  });

  it("should render a card if the required props are present", () => {
    wrapper.setProps({ ...nextProps }); // we update the component with "nextProps"

    expect(wrapper.find("div.card")).toHaveLength(1); // expect "div.card" to be present
    expect(wrapper.find("h1").text()).toContain(nextProps.title); // expect the "h1" element to contain "owl"
    expect(wrapper.find("img").prop("src")).toBe(nextProps.url); // expect the "img"'s src to be "https://media.giphy.com/media/qISaMW1xwmvNS/giphy.gif"
  });
})