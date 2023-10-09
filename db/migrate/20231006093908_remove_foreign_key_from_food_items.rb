class RemoveForeignKeyFromFoodItems < ActiveRecord::Migration[7.0]
  def change
    remove_reference :food_items, :user
  end
end
