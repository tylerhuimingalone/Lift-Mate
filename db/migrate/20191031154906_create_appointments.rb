class CreateAppointments < ActiveRecord::Migration[5.2]
  def change
    create_table :appointments do |t|
      t.datetime :time, null: false

      t.belongs_to :user, null: false
    end
  end
end
