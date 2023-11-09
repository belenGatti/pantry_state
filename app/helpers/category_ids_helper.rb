class CategoryIdsHelper
    def self.fetch_category_ids
      # Fetch category IDs from the database and return them
      # Implement your database query here
      # For example:
      last_fruit_id = Item.where(category: 'Fruits').order(internal_id: :desc).pluck(:internal_id).first
      last_vegetables_id = Item.where(category: 'Vegetables').order(internal_id: :desc).pluck(:internal_id).first
      last_dairy_id = Item.where(category: 'Dairy').order(internal_id: :desc).pluck(:internal_id).first
      last_canned_goods_id = Item.where(category: 'Canned goods').order(internal_id: :desc).pluck(:internal_id).first
      puts "FruitID: #{last_fruit_id}, VegID: #{last_vegetables_id}, DairyID: #{last_dairy_id}, CannedID: #{last_canned_goods_id}"
  
      {
        last_fruit_id: last_fruit_id,
        last_vegetables_id: last_vegetables_id,
        last_dairy_id: last_dairy_id,
        last_canned_goods_id: last_canned_goods_id
      }
    end
  end  