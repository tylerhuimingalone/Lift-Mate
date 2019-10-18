require 'rails_helper'

RSpec.describe Workout, type: :model do
  it { should belong_to :user }

  it { should have_many :activities }
  it { should have_many :exercises }

  it { should have_valid(:name).when("Morning Lift") }
  it { should_not have_valid(:name).when(nil, "") }
end
