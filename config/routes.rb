Rails.application.routes.draw do
  root 'home#new'
  get 'messages' => 'messages#index'
  post 'users/upload' => 'users#upload'
  post 'friend/:friend_id' => 'friends#friend', as: 'friend'
  delete 'unfriend/:friend_id' => 'friends#unfriend', as: 'unfriend'
  devise_for :users, :controllers => {
    :registrations => "users/registrations",
  }
  resources :users, only: [:index, :show]
  namespace :api do
    resources :messages, only: [:index, :create]
    resources :current_user, only: [:index]
    resources :users, only: [:index]
    resources :friends, only: [:index]
  end
end
