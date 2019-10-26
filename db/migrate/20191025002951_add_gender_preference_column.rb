class AddGenderPreferenceColumn < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :gender_preference, :string, default: "female"
  end
end
