class ActivitySerializer < ActiveModel::Serializer
  attributes :id, :reps, :sets, :weight, :unit

  belongs_to :exercise
end
