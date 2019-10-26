import React from "react"
import Enzyme, { mount } from "enzyme"

import NewWorkoutForm from "./NewWorkoutForm"
import ExerciseSelectTile from './ExerciseSelectTile'
import BodypartSelectTile from './BodypartSelectTile'

describe("NewWorkoutForm", () => {
  let wrapper, onChangeMock, onSubmitMock, propsFunctionOne, propsFunctionTwo

  beforeEach(() => {
    onChangeMock = jest.fn()
    onSubmitMock = jest.fn()
    propsFunctionOne = jest.fn()
    propsFunctionTwo = jest.fn()
    wrapper = mount(
      <NewWorkoutForm
        updateExerciseNumber={onChangeMock}
        exerciseNumber="1"
        exerciseList={[{id: 1, name: "sit-ups"}, {id: 2, name: "pull-ups", bodypart: "upper body"}]}
        updateNewWorkout={propsFunctionOne}
        newWorkout={{name: "Test Lift", exercises: {}}}
        updateSelectedBodyparts={propsFunctionTwo}
        selectedBodyparts={["upper body"]}
        handleFormSubmission={onSubmitMock}
      />
    )
  })

  it("renders an input for the name of the exercise", () => {
    expect(wrapper.find(".workout-name-input").props().value).toMatch("Test Lift")
  })

  it("calls a function on change", () => {
    let workoutField = wrapper.find(".workout-name-input")
    workoutField.simulate('change')
    expect(propsFunctionOne).toHaveBeenCalled()
  })

  it("renders an input for the number of exercises", () => {
    expect(wrapper.find(".exercise-number-input").props().value).toMatch("1")
  })

  it("calls a function on change", () => {
    let exerciseNumberField = wrapper.find(".exercise-number-input")
    exerciseNumberField.simulate('change')
    expect(onChangeMock).toHaveBeenCalled()
  })

  it("renders a component to select the areas of focus", () => {
    expect(wrapper.find(BodypartSelectTile).props().selectedBodyparts).toEqual(["upper body"])
    expect(wrapper.find(BodypartSelectTile).props().updateSelectedBodyparts).toEqual(propsFunctionTwo)
  })

  it("renders a component to select the exercises", () => {
    expect(wrapper.find(ExerciseSelectTile).props().exerciseList).toEqual([{id: 2, name: "pull-ups", bodypart: "upper body"}])
    expect(wrapper.find(ExerciseSelectTile).props().newWorkout).toEqual({name: "Test Lift", exercises: {}})
    expect(wrapper.find(ExerciseSelectTile).props().updateNewWorkout).toEqual(propsFunctionOne)
  })

  it("calls the submit function when submitted", () => {
    let submit = wrapper.find("form")
    submit.simulate('submit')
    expect(onSubmitMock).toHaveBeenCalled()
  })
})
