class AddNameToPantryItemAndDeleteInternalId < ActiveRecord::Migration[7.0]
  def change
    remove_column :pantry_items, :internal_id
    add_column :pantry_items, :name, :string
  end
end
