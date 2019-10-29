import React from "react"
import Enzyme, { mount } from "enzyme"
import { BrowserRouter, Link } from "react-router-dom"

import WorkoutIndexTile from "./WorkoutIndexTile"

describe("WorkoutIndexTile", () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <WorkoutIndexTile
          key="1"
          id="1"
          name="Morning Lift"
          numberOfActivities="3"
          date="Wednesday, October 23, 2019"
        />
      </BrowserRouter>
    )
  })

  it("renders a h3 tag with the workout name", () => {
    expect(wrapper.find("h3").text()).toBe('Morning Lift')
  })

  it("renders the workout date", () => {
    expect(wrapper.find("h5").text()).toBe('Wednesday, October 23, 2019')
  })

  it("renders a h3 tag with the workout name", () => {
    expect(wrapper.find("h4").text()).toBe('Exercises: 3')
  })

  it("renders a link to the home page", () => {
    expect(wrapper.find("Link").props()["to"]).toBe('/')
  })
})
