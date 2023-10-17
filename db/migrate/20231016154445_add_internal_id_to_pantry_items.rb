class AddInternalIdToPantryItems < ActiveRecord::Migration[7.0]
  def change
    add_column :pantry_items, :internal_id, :string
  end
end
