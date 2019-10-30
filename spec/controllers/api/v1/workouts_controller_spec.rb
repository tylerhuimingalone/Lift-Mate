require "rails_helper"

RSpec.describe Api::V1::WorkoutsController, type: :controller do
  describe "POST#create" do
    it "should return the new workout if filled out correctly" do
      user = FactoryBot.create(:user)
      sign_in user
      current_count = Workout.count
      test_workout = {
        workout: { name: "Morning Lift" },
        exercises: ["Squats", "Pull Ups"]
      }

      post :create, params: test_workout, format: :json

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json.length).to eq 1
      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json["workout"]["name"]).to eq test_workout[:workout][:name]
      expect(Workout.count).to eq(current_count + 1)
    end

    it "should return errors if filled out incorrectly" do
      user = FactoryBot.create(:user)
      sign_in user
      current_count = Workout.count
      test_workout = {
        workout: { name: "" },
        exercises: ["Squats", "Pull Ups"]
      }

      post :create, params: test_workout, format: :json

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
      squats = FactoryBot.create(:exercise, name: 'Squats')
      pull_ups = FactoryBot.create(:exercise, name: 'Pull Ups')
      sign_in user
      current_count = Activity.count
      test_workout = {
        workout: { name: "Morning Lift" },
        exercises: ["Squats", "Pull Ups"]
      }

      post :create, params: test_workout, format: :json

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
      user = FactoryBot.create(:user)
      sign_in user
      workout = FactoryBot.create(:workout)
      FactoryBot.create_list(:activity, 5, workout: workout)

      get :show, params: {id: workout["id"]}

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json.length).to eq 1
      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json["workout"]["name"]).to eq(workout.name)
      expect(returned_json["workout"]["information"].length).to eq 5
    end
  end

  describe "GET#index" do
    it "gets all workouts associated with a user" do
      user = FactoryBot.create(:user)
      sign_in user
      FactoryBot.create_list(:workout, 5, user: user)

      get :index

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json.length).to eq 1
      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json["workouts"].length).to eq(5)
    end
  end

  describe "PATCH#update" do
    it "updates a workout's name if given good data" do
      user = FactoryBot.create(:user)
      sign_in user
      workout = FactoryBot.create(:workout, user: user)
      current_count = Workout.count

      patch :update, params: {id: workout.id, workout: {name: "New Workout Name"}}, format: :json
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json.length).to eq 1
      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json["workout"]["name"]).to eq("New Workout Name")
      expect(Workout.count).to eq(current_count)
    end

    it "doesn't update a workout's name if given bad data" do
      user = FactoryBot.create(:user)
      sign_in user
      workout = FactoryBot.create(:workout, user: user)
      current_count = Workout.count

      patch :update, params: {id: workout.id, workout: {name: ""}}, format: :json
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json.length).to eq 1
      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json["name"]).to eq(["can't be blank"])
      expect(Workout.count).to eq(current_count)
    end
  end

  describe "DELETE#destroy" do
    it "destroys a workout and all associated activities" do
      user = FactoryBot.create(:user)
      sign_in user
      workout = FactoryBot.create(:workout, user: user)
      FactoryBot.create_list(:activity, 5, workout: workout)
      current_workout_count = Workout.count
      current_activity_count = Activity.count

      delete :destroy, params: {id: workout.id}
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json.length).to eq 0
      expect(returned_json).to be_kind_of(Hash)
      expect(Workout.count).to eq(current_workout_count - 1)
      expect(Activity.count).to eq(current_activity_count - 5)
    end
  end
end
