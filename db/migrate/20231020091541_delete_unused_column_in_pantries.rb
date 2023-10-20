class DeleteUnusedColumnInPantries < ActiveRecord::Migration[7.0]
  def change
    remove_column :pantries, :auth0_id
  end
end
