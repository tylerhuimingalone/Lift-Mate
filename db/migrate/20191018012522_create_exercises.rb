class CreateExercises < ActiveRecord::Migration[5.2]
  def change
    create_table :exercises do |t|
      t.string :name, null: false
      t.string :bodypart, null: false

      t.timestamps null: false
    end
  end
end
