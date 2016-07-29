Rails.application.routes.draw do
  root 'messages#index'
  get 'data' => 'messages#show'
end
