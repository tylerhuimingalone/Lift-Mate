class WorkoutSerializer < ActiveModel::Serializer
  attributes :id, :name, :information, :created, :user

  def information
    info = []
    object.activities.each do |activity|
      info.push ({
        name: activity.exercise.name,
        reps: activity.reps,
        sets: activity.sets,
        weight: activity.weight,
        unit: activity.unit
      })
    end
    info
  end

  def created
    object.created_at.strftime("%A, %B %d, %Y")
  end
end
