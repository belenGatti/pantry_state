Rails.application.routes.draw do
  resources :food_items
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  # API routes should be /api/v1
  namespace :api do
    namespace :v1 do
      resources :food_items
    end
  end
  # Defines the root path route ("/")
  # root "articles#index"
end
