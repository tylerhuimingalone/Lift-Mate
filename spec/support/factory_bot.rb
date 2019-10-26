require 'factory_bot'

FactoryBot.define do
  factory :user do
    first_name { 'John' }
    last_name { 'Example' }
    sequence(:email) {|n| "user#{n}@example.com" }
    password { 'password' }
    password_confirmation { 'password' }
  end

  factory :exercise do
    name { 'pull-ups' }
    bodypart { 'upper body' }
  end
end
