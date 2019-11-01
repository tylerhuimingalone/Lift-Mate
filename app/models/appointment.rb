class Appointment < ApplicationRecord
  validates :time, presence: true

  belongs_to :user

  after_create :reminder

  def reminder
    @twilio_number = ENV['TWILIO_PHONE_NUMBER']
    account_sid = ENV['TWILIO_ACCOUNT_SID']
    @client = Twilio::REST::Client.new account_sid, ENV['TWILIO_AUTH_TOKEN']
    body = "Hi #{self.user.first_name}. Get ready to hit the gym."
    user_number = self.user.number
    message = @client.messages.create(
      :from => @twilio_number,
      :to => user_number,
      :body => body,
    )
  end
end
