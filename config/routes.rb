Rails.application.routes.draw do
  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create]

  namespace :api, defaults: { format: :json } do
    resources :cars
    resources :features
  end

  # resources :makes, only: [:index, :show] do
  #   resources :models, only: [:index]
  # end
  # resources :models, only: [:show]

  root to: 'static_pages#root'
end
