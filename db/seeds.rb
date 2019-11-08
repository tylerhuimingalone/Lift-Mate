# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

push_ups = Exercise.create(name: "Push Ups", bodypart: "upper body")
pull_ups = Exercise.create(name: "Pull Ups", bodypart: "upper body")
bicep_curls = Exercise.create(name: "Bicep Curls", bodypart: "upper body")
shoulder_press = Exercise.create(name: "Shoulder Presses", bodypart: "upper body")
chest_presses = Exercise.create(name: "Chest Presses", bodypart: "upper body")
bench_presses = Exercise.create(name: "Bench Presses", bodypart: "upper body")
triceps_dips = Exercise.create(name: "Triceps Dips", bodypart: "upper body")

sit_ups = Exercise.create(name: "Sit Ups", bodypart: "core")
crunches = Exercise.create(name: "Crunches", bodypart: "core")
planks = Exercise.create(name: "Planks", bodypart: "core")
russian_twists = Exercise.create(name: "Russian Twists", bodypart: "core")
side_planks = Exercise.create(name: "Side Planks", bodypart: "core")
bridges = Exercise.create(name: "Bridges", bodypart: "core")
leg_lifts = Exercise.create(name: "Leg Lifts", bodypart: "core")

squats = Exercise.create(name: "Squats", bodypart: "lower body")
deadlifts = Exercise.create(name: "Deadlifts", bodypart: "lower body")
leg_presses = Exercise.create(name: "Leg Presses", bodypart: "lower body")
leg_extentions = Exercise.create(name: "Leg Extentions", bodypart: "lower body")
leg_curls = Exercise.create(name: "Leg Curls", bodypart: "lower body")
wall_sits = Exercise.create(name: "Wall Sits", bodypart: "lower body")
snatches = Exercise.create(name: "Snatches", bodypart: "lower body")

workout_one = Workout.create(name: "Morning Lift", user_id: 1, created_at: DateTime.new(2019, 10, 28, 0, 0, 0))
Activity.create(workout: workout_one, exercise: squats, reps: 10, sets: 3, weight: 44, unit: "kg")
Activity.create(workout: workout_one, exercise: chest_presses, reps: 6, sets: 2, weight: 20, unit: "lbs")
Activity.create(workout: workout_one, exercise: bicep_curls, reps: 7, sets: 3, weight: 15, unit: "lbs")
Activity.create(workout: workout_one, exercise: pull_ups, reps: 6, sets: 3)

workout_two = Workout.create(name: "Lunch Lift", user_id: 1, created_at: DateTime.new(2019, 10, 30, 0, 0, 0))
Activity.create(workout: workout_two, exercise: squats, reps: 10, sets: 3, weight: 46, unit: "kg")
Activity.create(workout: workout_two, exercise: deadlifts, reps: 7, sets: 2, weight: 105, unit: "lbs")
Activity.create(workout: workout_two, exercise: chest_presses, reps: 6, sets: 3, weight: 25, unit: "lbs")
Activity.create(workout: workout_two, exercise: bicep_curls, reps: 8, sets: 3, weight: 20, unit: "lbs")
Activity.create(workout: workout_two, exercise: pull_ups, reps: 7, sets: 2)

workout_three = Workout.create(name: "Afternoon Lift", user_id: 1, created_at: DateTime.new(2019, 10, 31, 0, 0, 0))
Activity.create(workout: workout_three, exercise: sit_ups, reps: 15, sets: 3)
Activity.create(workout: workout_three, exercise: leg_presses, reps: 8, sets: 3, weight: 200, unit: "lbs")
Activity.create(workout: workout_three, exercise: chest_presses, reps: 6, sets: 3, weight: 22, unit: "lbs")
Activity.create(workout: workout_three, exercise: planks, reps: 1, sets: 4)

workout_four = Workout.create(name: "Evening Lift", user_id: 1, created_at: DateTime.new(2019, 11, 1, 0, 0, 0))
Activity.create(workout: workout_four, exercise: squats, reps: 8, sets: 3, weight: 50, unit: "kg")
Activity.create(workout: workout_four, exercise: deadlifts, reps: 6, sets: 2, weight: 110, unit: "lbs")
Activity.create(workout: workout_four, exercise: bicep_curls, reps: 8, sets: 3, weight: 30, unit: "lbs")
Activity.create(workout: workout_four, exercise: pull_ups, reps: 8, sets: 3)

workout_five = Workout.create(name: "Morning Workout", user_id: 1, created_at: DateTime.new(2019, 11, 3, 0, 0, 0))
Activity.create(workout: workout_five, exercise: leg_lifts, reps: 12, sets: 4)
Activity.create(workout: workout_five, exercise: triceps_dips, reps: 10, sets: 3)
Activity.create(workout: workout_five, exercise: chest_presses, reps: 7, sets: 3, weight: 32, unit: "lbs")
Activity.create(workout: workout_five, exercise: bicep_curls, reps: 9, sets: 3, weight: 30, unit: "lbs")
Activity.create(workout: workout_five, exercise: side_planks, reps: 10, sets: 3)

workout_six = Workout.create(name: "Lunch Workout", user_id: 1, created_at: DateTime.new(2019, 11, 4, 0, 0, 0))
Activity.create(workout: workout_six, exercise: deadlifts, reps: 5, sets: 3, weight: 120, unit: "lbs")
Activity.create(workout: workout_six, exercise: chest_presses, reps: 8, sets: 2, weight: 37, unit: "lbs")
Activity.create(workout: workout_six, exercise: bicep_curls, reps: 10, sets: 3, weight: 30, unit: "lbs")
Activity.create(workout: workout_six, exercise: pull_ups, reps: 8, sets: 3)

workout_seven = Workout.create(name: "Morning Lift", user_id: 1, created_at: DateTime.new(2019, 11, 5, 0, 0, 0))
Activity.create(workout: workout_seven, exercise: squats, reps: 10, sets: 3, weight: 53, unit: "kg")
Activity.create(workout: workout_seven, exercise: chest_presses, reps: 8, sets: 2, weight: 40, unit: "lbs")
Activity.create(workout: workout_seven, exercise: triceps_dips, reps: 12, sets: 3)

workout_eight = Workout.create(name: "Evening Workout", user_id: 1, created_at: DateTime.new(2019, 11, 6, 0, 0, 0))
Activity.create(workout: workout_eight, exercise: squats, reps: 8, sets: 2, weight: 58, unit: "kg")
Activity.create(workout: workout_eight, exercise: deadlifts, reps: 6, sets: 3, weight: 130, unit: "lbs")
Activity.create(workout: workout_eight, exercise: chest_presses, reps: 10, sets: 3, weight: 37, unit: "lbs")
Activity.create(workout: workout_eight, exercise: bicep_curls, reps: 10, sets: 3, weight: 35, unit: "lbs")
Activity.create(workout: workout_eight, exercise: pull_ups, reps: 7, sets: 3)

workout_nine = Workout.create(name: "Routine Lift", user_id: 1, created_at: DateTime.new(2019, 11, 7, 0, 0, 0))
Activity.create(workout: workout_nine, exercise: squats, reps: 7, sets: 2, weight: 60, unit: "kg")
Activity.create(workout: workout_nine, exercise: deadlifts, reps: 6, sets: 3, weight: 135, unit: "lbs")
Activity.create(workout: workout_nine, exercise: chest_presses, reps: 10, sets: 3, weight: 40, unit: "lbs")
Activity.create(workout: workout_nine, exercise: bicep_curls, reps: 12, sets: 2, weight: 37, unit: "lbs")

workout_ten = Workout.create(name: "Quick Workout", user_id: 1, created_at: DateTime.new(2019, 11, 8, 0, 0, 0))
Activity.create(workout: workout_ten, exercise: squats, reps: 10, sets: 2, weight: 65, unit: "kg")
Activity.create(workout: workout_ten, exercise: deadlifts, reps: 6, sets: 3, weight: 140, unit: "lbs")
Activity.create(workout: workout_ten, exercise: chest_presses, reps: 10, sets: 2, weight: 45, unit: "lbs")
Activity.create(workout: workout_ten, exercise: bicep_curls, reps: 12, sets: 3, weight: 40, unit: "lbs")
Activity.create(workout: workout_ten, exercise: pull_ups, reps: 10, sets: 3)
