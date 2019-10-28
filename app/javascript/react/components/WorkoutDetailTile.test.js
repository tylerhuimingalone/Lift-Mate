import React from "react"
import Enzyme, { mount } from "enzyme"

import WorkoutDetailTile from "./WorkoutDetailTile"

describe("WorkoutDetailTile", () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <WorkoutDetailTile
        key="Pull-ups"
        name="Pull-ups"
        reps="10"
        sets="5"
        weight="20"
        unit="kg"
      />
    )
  })

  it("renders a h3 tag with the exercise name", () => {
    expect(wrapper.find("h3").text()).toBe('Pull-ups')
  })
  it("renders an li tag with the number of Reps", () => {
    expect(wrapper.find(".reps").text()).toBe('10 Reps')
  })
  it("renders an li tag with the number of Sets", () => {
    expect(wrapper.find(".sets").text()).toBe('5 Sets')
  })
  it("renders an li tag with the weight and unit", () => {
    expect(wrapper.find(".weight").text()).toBe('20 kg')
  })
})
