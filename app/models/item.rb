class Item < ApplicationRecord
    has_many :pantry_items
    has_many :pantries, through: :pantry_items

    validates :internal_id, presence: true
    validates :label, presence: true
    validates :category, presence: true
    validates :measurement_unit, presence: false
    validates :image, presence: false
end
