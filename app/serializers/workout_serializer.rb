class WorkoutSerializer < ActiveModel::Serializer
  attributes :id, :name, :information

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
end
