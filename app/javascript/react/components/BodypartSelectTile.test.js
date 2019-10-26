import React from "react"
import Enzyme, { mount } from "enzyme"

import BodypartSelectTile from "./BodypartSelectTile"

describe("BodypartSelectTile", () => {
  let wrapper, onClickMock

  beforeEach(() => {
    onClickMock = jest.fn()
    wrapper = mount(
      <BodypartSelectTile
        selectedBodyparts={["upper body"]}
        updateSelectedBodyparts={onClickMock}
      />
    )
  })

  it("calls the function from props when lower body is clicked", () => {
    let lowerBody = wrapper.find('.bottom')
    lowerBody.simulate('click')
    expect(onClickMock).toHaveBeenCalled()
  })

  it("calls the function from props when core is clicked", () => {
    let core = wrapper.find('.middle')
    core.simulate('click')
    expect(onClickMock).toHaveBeenCalled()
  })

  it("calls the function from props when upper body is clicked", () => {
    let upperBody = wrapper.find('.top')
    upperBody.simulate('click')
    expect(onClickMock).toHaveBeenCalled()
  })
})
