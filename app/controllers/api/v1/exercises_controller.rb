class Api::V1::ExercisesController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  before_action :authenticate_user!

  def index
    render json: Exercise.all
  end

  def create
    exercise = Exercise.new(exercise_params)

    if exercise.save
      render json: exercise
    else
      render json: exercise.errors
    end
  end

  private
  def exercise_params
    params.require(:exercise).permit(:name, :bodypart)
    name = params["exercise"]["name"].titleize
    bodypart = params["exercise"]["bodypart"]
    name.gsub!(/-/, " ")
    
    {name: name, bodypart: bodypart}
  end
end
