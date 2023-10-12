class CreateItems < ActiveRecord::Migration[7.0]
  def change
    create_table :items do |t|
      t.string :internal_id
      t.string :label
      t.string :category
      t.string :measurement_unit
      t.string :image

      t.timestamps
    end
  end
end
