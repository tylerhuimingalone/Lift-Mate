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
    sequence(:name) {|n| "Pull Ups#{n}" }
    bodypart { 'upper body' }
  end

  factory :workout do
    name { 'Lift' }

    user
  end

  factory :activity do
    reps { '10' }
    sets { '3' }
    weight { '20' }
    unit { 'kg' }

    workout
    exercise
  end
end
