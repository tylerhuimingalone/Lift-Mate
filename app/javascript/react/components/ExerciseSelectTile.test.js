import React from "react"
import Enzyme, { mount } from "enzyme"

import ExerciseSelectTile from "./ExerciseSelectTile"

describe("ExerciseSelectTile", () => {
  let wrapper, onChangeMock

  beforeEach(() => {
    onChangeMock = jest.fn()
    wrapper = mount(
      <ExerciseSelectTile
        key="1"
        id="1"
        exerciseList={[{id: 1, name: "sit-ups"}, {id: 2, name: "pull-ups"}]}
        updateNewWorkout={onChangeMock}
        newWorkout={{name: "lift", exercises: {}}}
      />
    )
  })

  it("renders a select field", () => {
    expect(wrapper.find("select").props()["name"]).toBe("1")
  })

  it("renders options", () => {
    expect(wrapper.find("select").text()).toBe("sit-upspull-ups")
  })

  it("runs the passed down function when changed", () => {
    let select = wrapper.find("select")
    select.simulate('change')
    expect(onChangeMock).toHaveBeenCalled()
  })
})
