Rails.application.routes.draw do
  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create]
  resources :models, only: [:index]

  root to: 'static_pages#root'
end
