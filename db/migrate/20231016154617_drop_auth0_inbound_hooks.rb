class DropAuth0InboundHooks < ActiveRecord::Migration[7.0]
  def up
    drop_table :auth0_inbound_hooks
  end

  def down
    create_table :auth0_inbound_hooks do |t|
      t.string "log_id"
      t.json "data"
      t.datetime "created_at", null: false
      t.datetime "updated_at", null: false
    end
  end
end