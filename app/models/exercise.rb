class Exercise < ApplicationRecord
  validates :name, presence: true
  validates :bodypart, inclusion: { in: ["upper body", "core", "lower body"] }

  has_many :activities
  has_many :workouts, through: :activities
end
