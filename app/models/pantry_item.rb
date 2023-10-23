class PantryItem < ApplicationRecord
    belongs_to :pantry
    belongs_to :item

    validates :quantity, presence: true
    validates :quantity, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
    validates :expiration_date, presence: true
    # @TODO remove name and name from db columns since the association with item is already there see pantry_items#show
    validates :name, presence: true
end