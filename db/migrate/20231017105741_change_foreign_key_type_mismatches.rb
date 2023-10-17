class ChangeForeignKeyTypeMismatches < ActiveRecord::Migration[7.0]
  def change
    change_column :pantries, :user_id, :string
    change_column :pantry_items, :item_id, :string
  end
end
