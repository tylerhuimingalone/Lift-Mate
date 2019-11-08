# LiftMate

[![Codeship Status for tylerhuimingalone/Lift-Mate](https://app.codeship.com/projects/aac44a20-d37a-0137-df31-62d87e3fb128/status?branch=master)](https://app.codeship.com/projects/370108)

## Description
LiftMate is a workout tracking app that allows users to keep track of their physical goals. Users can log in via the app or Twitter, can add workouts and exercises to the database, and can fully edit a workout after creation. A user can also set reminder texts for themselves with the Twillio API (texts to non-verified numbers will not be sent) and the Sidekiq gem. Additionally, if they logged in via Twitter, a user can post image Tweets.

## Authentication
LiftMate is best when logged in as a Twitter user. If you would like to see an example account you can log in to Twitter with the following credentials.
```
email: liftmate.app@gmail.com
password: LiftmateApp1!
 ```

## Technologies
Ruby - 2.6.5
Rails - 5.2.3
React - 16.8.0
Foundation Rails - 6.5.3.0
Twilio-Ruby
Sidekiq - 5.2.7
Redis
Omniauth
Omniauth-Twitter
Twitter
React-google-charts - 3.0.6
React-dropzone - 10.1.10
React-datepicker - 2.9.6

## To Run Locally
Download the Repo
'yarn install' and 'bundle install' from your terminal
create the database: 'bundle exec rake db:create', 'bundle exec rake db:migrate'
You will need the following:
 - Twilio Account Secret Id, Authentication Token, and phone number
 - Redistogo url
 - Twitter api key and secret key

  Please review the .env.example file for all IDs that are needed

The seed data is up to date and ready to use, but assumes that one user has been set up.
'yarn run start', 'rails s', 'redis-server', 'bundle exec sidekiq'
Navigate your browser to localhost:3000
Run test suite with yarn test and rspec
