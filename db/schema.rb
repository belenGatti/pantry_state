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

ActiveRecord::Schema[7.0].define(version: 2023_10_17_105741) do
  create_table "items", primary_key: "internal_id", force: :cascade do |t|
    t.string "label"
    t.string "category"
    t.string "measurement_unit"
    t.string "image"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
  end

  create_table "pantries", primary_key: "pantry_id", force: :cascade do |t|
    t.string "user_id"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.string "auth0_id"
  end

  create_table "pantry_items", primary_key: "pantry_id", force: :cascade do |t|
    t.string "item_id"
    t.integer "quantity"
    t.date "expiration_date"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.string "internal_id"
  end

  create_table "users", primary_key: "auth0_id", id: :string, force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
  end

  add_foreign_key "pantries", "users", primary_key: "auth0_id"
  add_foreign_key "pantry_items", "items", primary_key: "internal_id"
  add_foreign_key "pantry_items", "pantries", primary_key: "pantry_id"
end
