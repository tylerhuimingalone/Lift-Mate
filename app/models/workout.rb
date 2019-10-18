class Workout < ApplicationRecord
  validates :name, presence: true

  belongs_to :user
  has_many :activities
  has_many :exercises, through: :activities
end
