class ChangePantrysIdName < ActiveRecord::Migration[7.0]
  def change
    add_foreign_key :pantry_items, :pantries, column: :id
  end
end
