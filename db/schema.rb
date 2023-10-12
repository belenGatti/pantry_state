# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_10_10_103150) do
  create_table "items", force: :cascade do |t|
    t.string "internal_id"
    t.string "label"
    t.string "category"
    t.string "measurement_unit"
    t.string "image"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "pantries", force: :cascade do |t|
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_pantries_on_user_id"
  end

  create_table "pantry_items", force: :cascade do |t|
    t.integer "pantry_id", null: false
    t.integer "item_id", null: false
    t.integer "quantity"
    t.date "expiration_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["item_id"], name: "index_pantry_items_on_item_id"
    t.index ["pantry_id"], name: "index_pantry_items_on_pantry_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "auth0_id"
    t.string "name"
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "pantries", "users"
  add_foreign_key "pantry_items", "items"
  add_foreign_key "pantry_items", "pantries"
end
