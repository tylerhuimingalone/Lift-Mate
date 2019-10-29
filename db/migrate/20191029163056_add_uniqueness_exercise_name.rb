class AddUniquenessExerciseName < ActiveRecord::Migration[5.2]
  def change
    add_index :exercises, :name, unique: true
  end
end
