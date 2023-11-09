class DeleteCategoryFromPantryItems < ActiveRecord::Migration[7.0]
  def change
    remove_column :pantry_items, :category
  end
end
