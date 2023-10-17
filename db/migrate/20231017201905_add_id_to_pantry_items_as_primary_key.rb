class AddIdToPantryItemsAsPrimaryKey < ActiveRecord::Migration[7.0]
  def change
    # add id as primary key
    add_column :pantry_items, :id, :primary_key
  end
end
