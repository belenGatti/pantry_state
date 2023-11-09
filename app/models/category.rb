class Category < ApplicationRecord
    has_many :items
    before_create :set_internal_id

    private
    def set_internal_id
        @last_category_number = Category.last.id
        @next_category_number = @last_category_number + 100
        self.id = @next_category_number
    end
end
