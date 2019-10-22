require 'rails_helper'

RSpec.describe User, type: :model do
  it { should have_valid(:first_name).when("John") }
  it { should_not have_valid(:first_name).when(nil, "") }

  it { should have_valid(:last_name).when("Example") }
  it { should_not have_valid(:last_name).when(nil, "") }

  it { should have_valid(:email).when("john@example.com") }
  it { should_not have_valid(:email).when(nil, "", "johnexample.com") }

  it { should have_valid(:password).when("password") }
  it { should_not have_valid(:password).when(nil, "", "word") }
end
