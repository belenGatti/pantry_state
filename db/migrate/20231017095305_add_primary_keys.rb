class AddPrimaryKeys < ActiveRecord::Migration[7.0]
  def change
    add_column :pantries, :pantry_id, :integer
  end
end
