Rails.application.routes.draw do
  resources :food_items
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  # API routes should be /api/v1
  namespace :api do
    namespace :v1 do
      resources :food_items
    end
  end

  get '/auth/auth0/callback' => 'auth0#callback'
  get '/auth/failure' => 'auth0#failure'
  get '/auth/logout' => 'auth0#logout'
  # Defines the root path route ("/")
  # root "articles#index"
end
