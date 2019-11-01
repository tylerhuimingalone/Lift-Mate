class SendUserTextReminder < ApplicationJob
  queue_as :default

  def perform(appointment_id)
    appointment = Appointment.find(appointment_id)
    appointment.reminder
  end
end
