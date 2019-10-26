import React from "react"
import Enzyme, { mount } from "enzyme"

import WelcomeMessageTile from "./WelcomeMessageTile"

describe("WelcomeMessageTile", () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <WelcomeMessageTile
        firstName="John"
      />
    )
  })

  it("renders a h2 tag with a greeting based on the time and the users name", () => {
    let message = ""
    const day = new Date()
    const hour = day.getHours()
    if (hour < 12) {
      message = "Good Morning"
    } else if (hour < 17) {
      message = "Good Afternoon"
    } else {
      message = "Good Evening"
    }

    expect(wrapper.find("h2").text()).toBe(`${message} John`)
  })
})
