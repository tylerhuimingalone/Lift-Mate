class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :gender_preference, inclusion: { in: ["female", "male"] }

  has_many :workouts
  has_many :appointments

  def number
    return "+1#{self.phone_number}"
  end
end
