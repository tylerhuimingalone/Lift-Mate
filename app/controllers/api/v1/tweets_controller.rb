class Api::V1::TweetsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  before_action :authenticate_user!

  def create
    user = current_user

    client = Twitter::REST::Client.new do |config|
      config.consumer_key        = ENV["TWITTER_API_KEY"]
      config.consumer_secret     = ENV["TWITTER_API_SECRET_KEY"]
      config.access_token        = user.token
      config.access_token_secret = user.secret
    end

    if params["image"] != "undefined"
      client.update_with_media(params["message"], File.new(params["image"].tempfile))
    else
      client.update(params["message"])
    end

    render json: { message: "saved" }
  end
end
