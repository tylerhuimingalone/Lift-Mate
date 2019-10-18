class Activity < ApplicationRecord
  validates :reps, :sets, :weight, numericality: { only_integer: true }, allow_nil: true
  validates :unit, inclusion: { in: %w(kg lbs) }, allow_nil: true

  belongs_to :workout
  belongs_to :exercise
end
