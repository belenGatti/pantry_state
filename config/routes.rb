Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  # API routes should be /api/v1
  namespace :api do
    namespace :v1 do
      resources :pantry_items
      resources :items
      resources :users
      resources :pantries
      resources :categories
    end
  end
end
