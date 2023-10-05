class Item < ApplicationRecord
    validates :label, presence: true
    validates :category, presence: true
    validates :measurement_unit, presence: false
    validates :image, presence: false
end
