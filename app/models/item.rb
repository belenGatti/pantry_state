class Item < ApplicationRecord
    has_many :pantry_items
    has_many :pantries, through: :pantry_items
    belongs_to :category

    validates :internal_id, presence: true, on: :update
    validates :label, presence: true
    validates :measurement_unit, presence: false
    validates :image, presence: false

    def set_internal_id
        @item_count = Item.where(category_id: category_id).count
        @internal_id = self.category_id.to_i + @item_count + 1
        self.internal_id = @internal_id
    end
end
