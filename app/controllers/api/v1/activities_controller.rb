class Api::V1::ActivitiesController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  before_action :authenticate_user!

  def index
    workout = Workout.find(params[:workout_id])
    render json: Activity.where(workout: workout)
  end

  def create
    workout = Workout.find(params[:workout_id])
    activity = Activity.new(workout: workout, exercise: find_exercise)

    if activity.save
      render json: activity
    else
      render json: activity.errors
    end
  end

  def update
    activity = Activity.find(params[:id])
    activity.update(activity_params)
    render json: activity
  end

  def destroy
    activity = Activity.find(params[:id])
    activity.destroy
    render json: {}
  end

  def bulk_update
    activity_info.each do |key, value|
      update_activity(key, value)
    end
    render json: { data: "saved" }
  end

  private
  def activity_params
    params.require(:activity).permit(:reps, :sets, :weight, :unit)
  end

  def find_exercise
    exercise_name = params.require(:exercise)
    Exercise.find_by(name: exercise_name)
  end

  def update_activity (id, update_hash)
    activity = Activity.find(id)
    activity.update(update_hash)
  end

  def activity_info
    params.require(:activityInfo).permit!
  end
end
