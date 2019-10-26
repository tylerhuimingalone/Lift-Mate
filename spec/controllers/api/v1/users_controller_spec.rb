require "rails_helper"

RSpec.describe Api::V1::UsersController, type: :controller do
  describe "GET#index" do
    it "should return information about the current user" do
      user = FactoryBot.create(:user)
      sign_in user

      get :index

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json.length).to eq 8
      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json["first_name"]).to eq user.first_name
      expect(returned_json["last_name"]).to eq user.last_name
      expect(returned_json["email"]).to eq user.email
    end
  end
end
