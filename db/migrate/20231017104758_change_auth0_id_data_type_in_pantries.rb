class ChangeAuth0IdDataTypeInPantries < ActiveRecord::Migration[7.0]
  def change
    change_column :pantries, :auth0_id, :string
  end
end
