import React from "react"
import Enzyme, { mount } from "enzyme"

import ActivityInputTile from "./ActivityInputTile"

describe("ActivityInputTile", () => {
  let wrapper, onChangeMock

  beforeEach(() => {
    onChangeMock = jest.fn()
    wrapper = mount(
      <ActivityInputTile
        key="1"
        id="1"
        exercise="push-ups"
        activityInfo={{1: {reps: "", sets: "", weight: "", unit: ""}}}
        updateActivityInfo={onChangeMock}
      />
    )
  })

  it("displays the exercise name", () =>  {
    expect(wrapper.find("h3").text()).toBe("push-ups")
  })

  it ("calls the function from props when reps input is changed", () => {
    let reps = wrapper.find(".reps")
    reps.simulate("change")
    expect(onChangeMock).toHaveBeenCalled()
  })

  it ("calls the function from props when sets input is changed", () => {
    let sets = wrapper.find(".sets")
    sets.simulate("change")
    expect(onChangeMock).toHaveBeenCalled()
  })

  it ("calls the function from props when weight input is changed", () => {
    let weight = wrapper.find(".weight")
    weight.simulate("change")
    expect(onChangeMock).toHaveBeenCalled()
  })

  it ("calls the function from props when unit input is changed", () => {
    let unit = wrapper.find(".unit")
    unit.simulate("change")
    expect(onChangeMock).toHaveBeenCalled()
  })
})
