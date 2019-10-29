import React from "react"
import Enzyme, { mount } from "enzyme"

import CurrentExerciseList from "./CurrentExerciseList"

describe("CurrentExerciseList", () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <CurrentExerciseList
        exercises={[
          {"id": 1, "name": "Pull Ups"},
          {"id": 2, "name": "Push Ups"},
          {"id": 3, "name": "Sit Ups"},
          {"id": 4, "name": "Squats"}
        ]}
      />
    )
  })

  it("displays a list of exercises", () =>  {
    expect(wrapper.find("li").length).toBe(4)
  })
})
