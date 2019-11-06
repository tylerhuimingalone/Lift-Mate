class Api::V1::TweetsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  before_action :authenticate_user!

  def add_image
    user.tweet_image.attach(params["image-media"])
    binding.pry
    #send image to twitter and return the media id
  end

  def create
  end
end
