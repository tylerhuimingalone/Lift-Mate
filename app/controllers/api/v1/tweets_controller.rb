class Api::V1::TweetsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  before_action :authenticate_user!

  def add_image
    binding.pry
  end

  def create
  end
end
