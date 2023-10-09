class FoodItem < ApplicationRecord
    validates :name, presence: true
    validates :quantity, presence: true
    validates :expiration_date, presence: true
end
