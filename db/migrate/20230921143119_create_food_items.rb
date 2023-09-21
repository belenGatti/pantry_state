class CreateFoodItems < ActiveRecord::Migration[7.0]
  def change
    create_table :food_items do |t|
      t.string :name
      t.string :quantity
      t.date :expiration_date

      t.timestamps
    end
  end
end
