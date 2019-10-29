require "rails_helper"

RSpec.describe Api::V1::ExercisesController, type: :controller do
  describe "GET#index" do
    it "should return a list of all of the exercises" do
      user = FactoryBot.create(:user)
      sign_in user
      FactoryBot.create(:exercise, name: "Push Ups")
      FactoryBot.create_list(:exercise, 5)
      get :index

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json.length).to eq 1
      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json["exercises"].length).to eq 6
      expect(returned_json["exercises"][0]["name"]).to eq("Push Ups")
    end
  end

  describe "POST#create" do
    it "should make a new exercise when correct info is given" do
      user = FactoryBot.create(:user)
      sign_in user
      current_count = Exercise.count
      test_exercise = {
        exercise: { name: "Squats", bodypart: "upper body" }
      }

      post :create, params: test_exercise, format: :json

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json.length).to eq 1
      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json["exercise"]["name"]).to eq test_exercise[:exercise][:name]
      expect(Exercise.count).to eq(current_count + 1)
    end

    it "should not make a new exercise when given bad data" do
      user = FactoryBot.create(:user)
      sign_in user
      current_count = Exercise.count
      test_exercise = {
        exercise: { name: "", bodypart: "upper body" }
      }

      post :create, params: test_exercise, format: :json

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json.length).to eq 1
      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json["name"]).to eq(["can't be blank"])
      expect(Exercise.count).to eq(current_count)
    end
  end
end
