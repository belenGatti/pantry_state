class Pantry < ApplicationRecord
    belongs_to :user
    has_many :pantry_items
    has_many :items, through: :pantry_items
end