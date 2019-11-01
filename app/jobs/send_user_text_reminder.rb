class SendUserTextReminder < ApplicationJob
  queue_as :default

  def perform(appointment)
    appointment.reminder
  end
end
