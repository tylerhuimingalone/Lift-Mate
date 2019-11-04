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
    expect(wrapper.find("h4").text()).toBe("push-ups")
  })
})
