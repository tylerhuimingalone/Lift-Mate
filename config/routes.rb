Rails.application.routes.draw do
  require 'sidekiq/web'
  mount Sidekiq::Web => '/sidekiq'

  root 'homes#index'
  get '/landing', to: 'homes#show'
  get '/workouts', to: 'homes#index'
  get '/workouts/new', to: 'homes#index'
  get '/workouts/:id', to: 'homes#index'
  get '/exercises', to: 'homes#index'
  get '/exercises/new', to: 'homes#index'
  get '/appointments/new', to: 'homes#index'
  get '/workouts/:id/edit', to: 'homes#index'
  get '/workouts/:id/review', to: 'homes#index'
  get '/workouts/:id/tweet', to: 'homes#index'
  get '/workouts/:id/activities/edit', to: 'homes#index'
  get '/api/v1/users/gender', to: 'api/v1/users#gender_preference'
  patch '/api/v1/users/gender', to: 'api/v1/users#update_gender_preference'
  patch '/api/v1/activities', to: 'api/v1/activities#bulk_update'
  get 'api/v1/exercises/:name/activities/:comparison', to: 'api/v1/activities#graph_data'

  devise_for :users, controllers: { omniauth_callbacks: "callbacks" }

  namespace :api do
    namespace :v1 do
      resources :users, only: [:index, :update]
      resources :workouts, only: [:index, :create, :show, :update, :destroy] do
        resources :activities, only: [:index, :create]
      end
      resources :exercises, only: [:index, :create]
      resources :activities, only: [:update, :destroy]
      resources :appointments, only: [:create]
      resources :tweets, only: [:create] do
        collection do
          post :add_image
        end
      end
    end
  end
end
