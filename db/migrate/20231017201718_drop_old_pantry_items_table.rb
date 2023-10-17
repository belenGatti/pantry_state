class DropOldPantryItemsTable < ActiveRecord::Migration[7.0]
  def change
    drop_table :old_pantry_items
  end
end
