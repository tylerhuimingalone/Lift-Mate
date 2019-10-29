class Api::V1::WorkoutsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  before_action :authenticate_user!

  def index
    user = current_user
    render json: Workout.where(user: user).order(created_at: :desc)
  end

  def show
    render json: Workout.find(params[:id])
  end

  def create
    user = current_user
    workout = Workout.new(workout_params)
    workout.user = user

    if workout.save
      exercise_options.each do |exercise_choice|
        exercise = Exercise.find_by(name: exercise_choice)
        Activity.create(exercise: exercise, workout: workout)
      end

      render json: workout
    else
      render json: workout.errors
    end
  end

  private
  def workout_params
    params.require(:workout).permit(:name)
  end

  def exercise_options
    params.require(:exercises)
  end
end
