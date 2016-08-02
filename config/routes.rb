Rails.application.routes.draw do
  root 'messages#index'
  devise_for :users
  resources :users, only: [:index, :show, :edit, :update]
  namespace :api do
    resources :messages, only: [:index, :create ]
  end
end
