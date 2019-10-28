require "rails_helper"

RSpec.describe Api::V1::WorkoutsController, type: :controller do
  describe "POST#create" do
    it "should return the new workout if filled out correctly" do
      user = FactoryBot.create(:user)
      sign_in user
      current_count = Workout.count
      test_Workout = {
        workout: { name: "Morning Lift" },
        exercises: ["squats", "pull-ups"]
      }

      post :create, params: test_Workout, format: :json

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json.length).to eq 1
      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json["workout"]["name"]).to eq test_Workout[:workout][:name]
      expect(Workout.count).to eq(current_count + 1)
    end

    it "should return errors if filled out incorrectly" do
      user = FactoryBot.create(:user)
      sign_in user
      current_count = Workout.count
      test_Workout = {
        workout: { name: "" },
        exercises: ["squats", "pull-ups"]
      }

      post :create, params: test_Workout, format: :json

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json.length).to eq 1
      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json["name"]).to eq(["can't be blank"])
      expect(Workout.count).to eq(current_count)
    end

    it "should create activities if filled out correctly" do
      user = FactoryBot.create(:user)
      squats = FactoryBot.create(:exercise, name: 'squats')
      pull_ups = FactoryBot.create(:exercise)
      sign_in user
      current_count = Activity.count
      test_Workout = {
        workout: { name: "Morning Lift" },
        exercises: ["squats", "pull-ups"]
      }

      post :create, params: test_Workout, format: :json

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(Activity.first.exercise).to eq(squats)
      expect(Activity.second.exercise).to eq(pull_ups)
      expect(Activity.first.workout).to eq(Workout.first)
      expect(Activity.second.workout).to eq(Workout.first)
      expect(Activity.count).to eq(current_count + 2)
    end
  end

  describe "GET#show" do
    it "should return an object with the workout information" do
    end
  end
end
