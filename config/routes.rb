Rails.application.routes.draw do
  # root 'messages#index'
  # devise_scope :user do
  #   root :to => "devise/registrations#new" #ログイン画面
  # end
  root 'home#new'
  get 'messages' => 'messages#index'
  # get 'api/current_user/friends' => 'current_user#indexAll'
  devise_for :users, :controllers => {
    :registrations => "users/registrations",
  }
  resources :users, only: [:index, :show, :edit, :update]
  namespace :api do
    resources :messages, only: [:index, :create ]
    resources :current_user, only: [:index]
    resources :users, only: [:index]
  end
end
