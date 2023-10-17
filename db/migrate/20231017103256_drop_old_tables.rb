class DropOldTables < ActiveRecord::Migration[7.0]
  def change
    # Drop the old tables
    drop_table :old_items
    drop_table :old_pantries
    drop_table :old_pantry_items
    drop_table :old_users
  end
end
