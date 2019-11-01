class Api::V1::AppointmentsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  before_action :authenticate_user!

  def create
    appointment = Appointment.new(appointment_params)
    appointment.user = current_user

    if appointment.save
      SendUserTextReminder.set(wait_until: appointment.time).perform_later(appointment)
      render json: appointment
    else
      render json: appointment.errors
    end
  end

  private
  def appointment_params
    params.require(:appointment).permit(:time)
  end
end
