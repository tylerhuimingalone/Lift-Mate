require "rails_helper"

RSpec.describe Api::V1::ExercisesController, type: :controller do
  describe "GET#index" do
    it "should return a list of all of the exercises" do
      FactoryBot.create(:exercise, name: "push-ups")
      FactoryBot.create_list(:exercise, 5)
      get :index

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json.length).to eq 1
      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json["exercises"].length).to eq 6
      expect(returned_json["exercises"][0]["name"]).to eq("push-ups")
    end
  end
end
