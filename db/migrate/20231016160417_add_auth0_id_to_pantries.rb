class AddAuth0IdToPantries < ActiveRecord::Migration[7.0]
  def change
    add_column :pantries, :auth0_id, :string
    add_foreign_key :pantries, :users, column: :auth0_id
  end
end
