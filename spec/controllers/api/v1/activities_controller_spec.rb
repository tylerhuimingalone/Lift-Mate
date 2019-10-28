require "rails_helper"

RSpec.describe Api::V1::ActivitiesController, type: :controller do
  describe "GET#index" do
    it "should return a list of all activities associated with a workout" do
      user = FactoryBot.create(:user)
      sign_in user
      workout = FactoryBot.create(:workout, user: user)
      FactoryBot.create_list(:activity, 5, workout: workout)

      get :index, params: {workout_id: workout.id}

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json.length).to eq 1
      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json["activities"].length).to eq 5
    end
  end

  describe 'PATCH#update' do
    it "should update a group of activities" do
      user = FactoryBot.create(:user)
      sign_in user
      workout = FactoryBot.create(:workout, user: user)
      activity_one = FactoryBot.create(:activity, workout: workout)
      activity_two = FactoryBot.create(:activity, workout: workout)
      activity_three = FactoryBot.create(:activity, workout: workout)
      current_count = Activity.count
      activity_update =  {
        activityInfo: {
          activity_one.id => {reps: "15", sets: "2", weight: "50"},
          activity_two.id => {reps: "20", sets: "5", weight: "10"},
          activity_three.id => {reps: "25", sets: "1", weight: "5"}
        }
      }

      patch :bulk_update, params: activity_update, format: :json
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json.length).to eq 1
      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json["data"]).to eq("saved")
      expect(Activity.count).to eq(current_count)
      expect(Activity.find(activity_one["id"])["reps"]).to eq(15)
      expect(Activity.find(activity_two["id"])["sets"]).to eq(5)
      expect(Activity.find(activity_three["id"])["weight"]).to eq(5)
    end
  end
end
