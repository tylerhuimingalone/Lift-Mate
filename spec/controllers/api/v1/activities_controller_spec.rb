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

  describe 'PATCH#bulk_update' do
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

  describe 'PATCH#update' do
    it "should update an activity with new information" do
      user = FactoryBot.create(:user)
      sign_in user
      activity = FactoryBot.create(:activity)
      current_count = Activity.count
      new_info = {
        reps: "20",
        sets: "5",
        weight: "44",
        unit: "lbs"
      }

      patch :update, params: {id: activity.id, activity: new_info }

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json.length).to eq 1
      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json["activity"]["reps"]).to eq(20)
      expect(returned_json["activity"]["sets"]).to eq(5)
      expect(returned_json["activity"]["weight"]).to eq(44)
      expect(returned_json["activity"]["unit"]).to eq("lbs")
      expect(Activity.count).to eq(current_count)
    end
  end

  describe 'Post#create' do
    it "should make a new activity when given an exercise name" do
      user = FactoryBot.create(:user)
      sign_in user
      workout = FactoryBot.create(:workout, user: user)
      exercise = FactoryBot.create(:exercise)
      current_count = Activity.count
      activity_params = {
        workout_id: workout.id,
        exercise: exercise.name
      }

      post :create, params: activity_params, format: :json

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json.length).to eq 1
      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json["activity"]["reps"]).to eq(nil)
      expect(returned_json["activity"]["sets"]).to eq(nil)
      expect(returned_json["activity"]["weight"]).to eq(nil)
      expect(returned_json["activity"]["unit"]).to eq(nil)
      expect(returned_json["activity"]["exercise"]["name"]).to eq(exercise.name)
      expect(Activity.count).to eq(current_count + 1)
    end
  end

  describe 'DELETE#destroy' do
    it "should delete an activity" do
      user = FactoryBot.create(:user)
      sign_in user
      activity = FactoryBot.create(:activity)
      FactoryBot.create_list(:activity, 5)
      current_count = Activity.count

      delete :destroy, params: {id: activity.id}

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json.length).to eq 0
      expect(returned_json).to be_kind_of(Hash)
      expect(Activity.count).to eq(current_count - 1)
    end
  end
end
