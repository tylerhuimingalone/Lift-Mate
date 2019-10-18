class CreateActivities < ActiveRecord::Migration[5.2]
  def change
    create_table :activities do |t|
      t.belongs_to :workout, null: false
      t.belongs_to :exercise, null: false
      t.integer :reps
      t.integer :sets
      t.integer :weight
      t.string :unit

      t.timestamps null: false
    end
  end
end
