class AddInternalIdToFoodItems < ActiveRecord::Migration[7.0]
  def change
    add_reference :food_items, :intern_id, foreign_key: { to_table: :items }
  end
end