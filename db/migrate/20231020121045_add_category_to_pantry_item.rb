class AddCategoryToPantryItem < ActiveRecord::Migration[7.0]
  def change
    add_column :pantry_items, :category, :string
  end
end
