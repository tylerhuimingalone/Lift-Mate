class Api::V1::UsersController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  before_action :authenticate_user!

  def index
    render json: current_user
  end

  def update
    user = User.find(params[:id])
    if user.update(user_params)
      render json: user
    else
      render json: user.errors
    end
  end

  def gender_preference
    user = current_user
    render json: { view: user.gender_preference }
  end

  def update_gender_preference
    user = current_user
    user.update(gender_params)
    render json: { view: user.gender_preference }
  end

  private
  def user_params
    phone_number = params.require(:user).permit(:phone_number)
    phone_number["phone_number"].gsub!(/[-.() ]/, "")
    phone_number
  end

  def gender_params
    params.require(:user).permit(:gender_preference)
  end
end
