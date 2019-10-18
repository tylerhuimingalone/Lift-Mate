require 'rails_helper'

RSpec.describe Activity, type: :model do
  it { should belong_to :workout }
  it { should belong_to :exercise }

  it { should have_valid(:reps).when(1, 4, 10, nil) }
  it { should_not have_valid(:reps).when("five", "seven") }

  it { should have_valid(:sets).when(1, 4, 5, nil) }
  it { should_not have_valid(:sets).when("five", "three") }

  it { should have_valid(:weight).when(10, 40, 25, nil) }
  it { should_not have_valid(:weight).when("twenty five", "sixty") }

  it { should have_valid(:unit).when("kg", "lbs") }
  it { should_not have_valid(:unit).when("kilograms", "pounds") }
end
