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

ActiveRecord::Schema[7.0].define(version: 2023_10_06_094635) do
  create_table "food_items", force: :cascade do |t|
    t.string "name"
    t.string "quantity"
    t.date "expiration_date"
    t.string "internal_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "intern_id_id"
    t.integer "users_id"
    t.index ["intern_id_id"], name: "index_food_items_on_intern_id_id"
    t.index ["users_id"], name: "index_food_items_on_users_id"
  end

  create_table "items", force: :cascade do |t|
    t.string "intern_id"
    t.string "label"
    t.string "category"
    t.string "measurement_unit"
    t.string "image"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "auth0_id"
    t.string "name"
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "food_items", "items", column: "intern_id_id"
  add_foreign_key "food_items", "users", column: "users_id"
end
