class ChangePantryItemsPantryIdNotToBeUniqueAndAddPantryItemsIdPrimaryKey < ActiveRecord::Migration[7.0]
  def change
    execute("PRAGMA foreign_keys=off;")
    
    execute("ALTER TABLE pantry_items RENAME TO old_pantry_items;")

    execute <<-SQL
      CREATE TABLE pantry_items
      (
        pantry_id VARCHAR,
        item_id INTEGER NOT NULL,
        quantity INTEGER,
        expiration_date DATE,
        created_at DATETIME NOT NULL,
        updated_at DATETIME NOT NULL,
        internal_id VARCHAR,
        FOREIGN KEY (item_id) REFERENCES items (internal_id),
        FOREIGN KEY (pantry_id) REFERENCES pantries (pantry_id)
      );
    SQL
    
    execute("PRAGMA foreign_keys=on;")

  end
end
