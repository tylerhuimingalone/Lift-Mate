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

  def graph_data
    params.permit!
    exercise = Exercise.find_by(name: params[:name])
    user = current_user
    workouts = Workout.where(user: user)
    bulk_activities = Activity.where(exercise: exercise)
    user_activities = bulk_activities.select{ |activity| workouts.include?(activity.workout)}
    data_set = form_data_set(user_activities, params[:comparison])
    render json: data_set
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

  def form_data_set(activities, comparison)
    data_array = [["Date", "#{comparison}"]]
    activities.each do |activity|
      date = activity.created_at.strftime("%m/%d/%Y")
      if comparison == "Total Reps"
        data_array << [date, activity.sets * activity.reps]
      elsif comparison == "Sets"
        data_array << [date, activity.sets]
      elsif comparison == "Reps per Set"
        data_array << [date, activity.reps]
      else
        data_array << [date, activity.weight]
      end
    end
    data_array
  end
end
