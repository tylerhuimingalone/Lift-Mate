Rails.application.routes.draw do
  root 'homes#index'
  get '/landing', to: 'homes#show'
  get '/workouts', to: 'homes#index'
  get '/workouts/new', to: 'homes#index'
  get '/workouts/:id', to: 'homes#index'
  get '/exercises/new', to: 'homes#index'
  get '/appointments/new', to: 'homes#index'
  get '/workouts/:id/review', to: 'homes#index'
  get '/workouts/:id/edit', to: 'homes#index'
  get '/workouts/:id/activities/edit', to: 'homes#index'
  patch '/api/v1/activities', to: 'api/v1/activities#bulk_update'

  devise_for :users

  namespace :api do
    namespace :v1 do
      resources :users, only: [:index, :update]
      resources :workouts, only: [:index, :create, :show, :update, :destroy] do
        resources :activities, only: [:index, :create]
      end
      resources :exercises, only: [:index, :create]
      resources :activities, only: [:update, :destroy]
      resource :appointments, only: [:create]
    end
  end
end
