class Api::V1::ExercisesController < ApplicationController
  def index
    render json: Exercise.all
  end
end
