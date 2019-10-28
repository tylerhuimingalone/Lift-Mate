class Api::V1::ActivitiesController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  before_action :authenticate_user!

  def index
    workout = Workout.find(params[:workout_id])
    render json: Activity.where(workout: workout)
  end

  def update
    params.permit!
    params[:activityInfo].each do |key, value|
      update_activity(key, value)
    end
    render json: { data: "saved" }
  end

  private
  def update_activity (id, update_hash)
    activity = Activity.find(id)
    activity.update(update_hash)
  end
end
