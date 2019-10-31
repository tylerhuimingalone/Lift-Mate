class Appointment < ApplicationRecord
  validates :time, presence: true

  belongs_to :user

  after_create :reminder

  def reminder
    @twilio_number = ENV['TWILIO_PHONE_NUMBER']
    account_sid = ENV['TWILIO_ACCOUNT_SID']
    @client = Twilio::REST::Client.new account_sid, ENV['TWILIO_AUTH_TOKEN']
    time_str = ((self.time).localtime).strftime("%I:%M%p on %b. %d, %Y")
    body = "Hi #{self.user.first_name}. Get ready to hit the gym at #{time_str}."
    user_number = self.user.number
    message = @client.messages.create(
      :from => @twilio_number,
      :to => user_number,
      :body => body,
    )
  end

  def when_to_run
    minutes_before_appointment = 30.minutes
    time - minutes_before_appointment
  end

  handle_asynchronously :reminder, :run_at => Proc.new { |i| i.when_to_run }
end
