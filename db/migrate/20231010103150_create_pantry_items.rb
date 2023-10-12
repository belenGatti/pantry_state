class CreatePantryItems < ActiveRecord::Migration[7.0]
  def change
    create_table :pantry_items do |t|
      t.references :pantry, null: false, foreign_key: true
      t.references :item, null: false, foreign_key: true
      t.integer :quantity
      t.date :expiration_date

      t.timestamps
    end
  end
end
