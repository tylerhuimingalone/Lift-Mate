class ActivitySerializer < ActiveModel::Serializer
  attributes :id
  belongs_to :exercise
end
