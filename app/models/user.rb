class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :omniauthable, omniauth_providers: [:twitter]

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :gender_preference, inclusion: { in: ["female", "male"] }

  has_many :workouts
  has_many :appointments

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.provider = auth.provider
      user.uid = auth.uid
      user.first_name = auth.info.name.split[0]
      user.last_name = auth.info.name.split[1]
      user.email = "#{auth.info.nickname}@twitter"
      user.password = Devise.friendly_token[0,20]
    end
  end

  def number
    return "+1#{self.phone_number}"
  end
end
