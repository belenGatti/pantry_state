class AddForeignKeyToPantryItems < ActiveRecord::Migration[7.0]
  def change
    add_foreign_key :pantry_items, :items, column: :internal_id
  end
end