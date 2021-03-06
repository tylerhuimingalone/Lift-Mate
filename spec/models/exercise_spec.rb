require 'rails_helper'

RSpec.describe Exercise, type: :model do
  before do
    @exercise = FactoryBot.create(:exercise)
  end

  subject { @exercise }

  it { should have_many :activities }
  it { should have_many :workouts }

  it { should validate_uniqueness_of(:name) }
  it { should have_valid(:name).when("Squat") }
  it { should_not have_valid(:name).when(nil, "") }

  it { should have_valid(:bodypart).when("upper body", "core", "lower body") }
  it { should_not have_valid(:bodypart).when(nil, "", "head") }
end
