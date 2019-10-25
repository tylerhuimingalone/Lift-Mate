Rails.application.routes.draw do
  root 'homes#index'
  get '/workouts/new', to: 'homes#index'

  devise_for :users

  namespace :api do
    namespace :v1 do
      resources :users, only: [:index]
      resources :workouts, only: [:create]
      resources :exercises, only: [:index]
    end
  end
end
