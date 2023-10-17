class AddPrimaryKeys2 < ActiveRecord::Migration[7.0]
  def change
    # Disable foreign key constraints temporarily
    execute("PRAGMA foreign_keys=off;")

    # Rename the existing tables to keep a backup
    execute("ALTER TABLE items RENAME TO old_items;")
    execute("ALTER TABLE pantries RENAME TO old_pantries;")
    execute("ALTER TABLE pantry_items RENAME TO old_pantry_items;")
    execute("ALTER TABLE users RENAME TO old_users;")

    # Create new tables with primary keys and foreign keys
    execute <<-SQL
      CREATE TABLE items
      (
        internal_id INTEGER PRIMARY KEY,
        label VARCHAR,
        category VARCHAR,
        measurement_unit VARCHAR,
        image VARCHAR,
        created_at DATETIME NOT NULL,
        updated_at DATETIME NOT NULL
      );
    SQL

    execute <<-SQL
      CREATE TABLE pantries
      (
        pantry_id INTEGER PRIMARY KEY,
        user_id INTEGER NOT NULL,
        created_at DATETIME NOT NULL,
        updated_at DATETIME NOT NULL,
        auth0_id VARCHAR,
        FOREIGN KEY (user_id) REFERENCES users (auth0_id)
      );
    SQL

    execute <<-SQL
      CREATE TABLE pantry_items
      (
        pantry_id INTEGER PRIMARY KEY,
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

    execute <<-SQL
      CREATE TABLE users
      (
        auth0_id VARCHAR PRIMARY KEY,
        name VARCHAR,
        email VARCHAR,
        created_at DATETIME NOT NULL,
        updated_at DATETIME NOT NULL
      );
    SQL

    # drop id colum from all tables

    execute("DROP COLUMN IF EXISTS id FROM old_items;")
    execute("DROP COLUMN IF EXISTS id FROM old_pantries;")
    execute("DROP COLUMN IF EXISTS id FROM old_pantry_items;")
    execute("DROP COLUMN IF EXISTS id FROM old_users;")

    # Copy data from old tables to new tables
    execute("INSERT INTO items SELECT * FROM old_items;")
    execute("INSERT INTO pantries SELECT * FROM old_pantries;")
    execute("INSERT INTO pantry_items SELECT * FROM old_pantry_items;")
    execute("INSERT INTO users SELECT * FROM old_users;")

    # Commit the transaction
    execute("COMMIT;")

    # Enable foreign key constraints
    execute("PRAGMA foreign_keys=on;")
  end
end

  
