# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
ActiveRecord::Base.connection.execute('PRAGMA foreign_keys = OFF;')
ActiveRecord::Base.transaction do

    fruits = Category.create!(name: "Fruits", id: '100')
    vegetables = Category.create!(name: "Vegetables", id: '200')
    dairy = Category.create!(name: "Dairy", id: '300')
    canned_goods = Category.create!(name: "Canned goods", id: '400')
    grains_and_cereals = Category.create!(name: "Grains and Cereals", id: '500')

    Item.destroy_all
    # @TODO measurement_unit there should be a standard one for each category. 
    # i am unsure wheter to add kilos since most people dont weight products and count them by unit?
    Item.create!([
        {internal_id: "101", label: "Apple", category: fruits, measurement_unit: "unit", image: ""},
        {internal_id: "102", label: "Banana", category: fruits, measurement_unit: "unit", image: ""},
        {internal_id: "103", label: "Orange", category: fruits, measurement_unit: "unit", image: ""},
        {internal_id: "104", label: "Pear", category: fruits, measurement_unit: "unit", image: ""},
        {internal_id: "105", label: "Peach", category: fruits, measurement_unit: "unit", image: ""},
        {internal_id: "106", label: "Strawberries", category: fruits, measurement_unit: "", image: ""},
        {internal_id: "107", label: "Raspberries", category: fruits, measurement_unit: "", image: ""},
        {internal_id: "108", label: "Blackberries", category: fruits, measurement_unit: "", image: ""},
        {internal_id: "109", label: "Mandarine", category: fruits, measurement_unit: "kilo", image: ""},
        {internal_id: "110", label: "Grapes", category: fruits, measurement_unit: "", image: ""},
        {internal_id: "111", label: "Kiwi", category: fruits, measurement_unit: "unit", image: ""},
        {internal_id: "112", label: "Pineapple", category: fruits, measurement_unit: "unit", image: ""},
        {internal_id: "113", label: "Mango", category: fruits, measurement_unit: "unit", image: ""},
        {internal_id: "114", label: "Watermelon", category: fruits, measurement_unit: "unit", image: ""},
        {internal_id: "201", label: "Broccoli", category: vegetables, measurement_unit: "unit", image: ""},
        {internal_id: "202", label: "Cabbage", category: vegetables, measurement_unit: "unit", image: ""},
        {internal_id: "203", label: "Carrot", category: vegetables, measurement_unit: "kilo", image: ""},
        {internal_id: "204", label: "Cauliflower", category: vegetables, measurement_unit: "unit", image: ""},
        {internal_id: "205", label: "Celery", category: vegetables, measurement_unit: "unit", image: ""},
        {internal_id: "206", label: "Cucumber", category: vegetables, measurement_unit: "unit", image: ""},
        {internal_id: "207", label: "Eggplant", category: vegetables, measurement_unit: "unit", image: ""},
        {internal_id: "208", label: "Leek", category: vegetables, measurement_unit: "unit", image: ""},
        {internal_id: "209", label: "Lettuce", category: vegetables, measurement_unit: "unit", image: ""},
        {internal_id: "210", label: "Mushroom", category: vegetables, measurement_unit: "kilo", image: ""},
        {internal_id: "211", label: "Onion", category: vegetables, measurement_unit: "kilo", image: ""},
        {internal_id: "212", label: "Red onion", category: vegetables, measurement_unit: "kilo", image: ""},
        {internal_id: "213", label: "Red pepper", category: vegetables, measurement_unit: "unit", image: ""},
        {internal_id: "214", label: "Green pepper", category: vegetables, measurement_unit: "unit", image: ""},
        {internal_id: "215", label: "Yellow pepper", category: vegetables, measurement_unit: "unit", image: ""},
        {internal_id: "216", label: "Potatoes", category: vegetables, measurement_unit: "kilo", image: ""},
        {internal_id: "217", label: "Pumpkin", category: vegetables, measurement_unit: "unit", image: ""},
        {internal_id: "218", label: "Spinach", category: vegetables, measurement_unit: "unit", image: ""},
        {internal_id: "219", label: "Tomato", category: vegetables, measurement_unit: "kilo", image: ""},
        {internal_id: "220", label: "Courgette", category: vegetables, measurement_unit: "unit", image: ""},
        {internal_id: "301", label: "Milk", category: dairy, measurement_unit: "litre", image: ""},
        {internal_id: "302", label: "Butter", category: dairy, measurement_unit: "pan", image: ""},
        {internal_id: "303", label: "Cheese", category: dairy, measurement_unit: "unit", image: ""},
        {internal_id: "304", label: "Parmiggiano Reggiano", category: dairy, measurement_unit: "package", image: ""},
        {internal_id: "305", label: "Cream", category: dairy, measurement_unit: "unit", image: ""},
        {internal_id: "306", label: "Cream cheese", category: dairy, measurement_unit: "unit", image: ""},
        {internal_id: "307", label: "Sour cream", category: dairy, measurement_unit: "unit", image: ""},
        {internal_id: "308", label: "Yogurt", category: dairy, measurement_unit: "unit", image: ""},
        {internal_id: "401", label: "Black beans", category: canned_goods, measurement_unit: "can", image: ""},
        {internal_id: "402", label: "Chickpeas", category: canned_goods, measurement_unit: "can", image: ""},
        {internal_id: "403", label: "Kidney beans", category: canned_goods, measurement_unit: "can", image: ""},
        {internal_id: "404", label: "Red lentils", category: canned_goods, measurement_unit: "can", image: ""},
        {internal_id: "405", label: "Green lentils", category: canned_goods, measurement_unit: "can", image: ""},
        {internal_id: "406", label: "Beluga lentils", category: canned_goods, measurement_unit: "can", image: ""},
        {internal_id: "407", label: "Coconut milk", category: canned_goods, measurement_unit: "can", image: ""},
        {internal_id: "408", label: "Passata", category: canned_goods, measurement_unit: "can", image: ""},
        {internal_id: "409", label: "Tomato paste", category: canned_goods, measurement_unit: "can", image: ""},
        {internal_id: "410", label: "Cherry tomatoes", category: canned_goods, measurement_unit: "can", image: ""},
        {internal_id: "411", label: "Peeled tomatoes", category: canned_goods, measurement_unit: "can", image: ""},
        {internal_id: "501", label: "Fusilli", category: grains_and_cereals, measurement_unit: "package", image: ""},
        {internal_id: "502", label: "Linguine", category: grains_and_cereals, measurement_unit: "package", image: ""},
        {internal_id: "503", label: "Lasagna sheets", category: grains_and_cereals, measurement_unit: "package", image: ""},
        {internal_id: "504", label: "Trofie", category: grains_and_cereals, measurement_unit: "package", image: ""},
    ])

    # Item.where(category: "Fruits").update_all(category_id: fruits.id)
    # Item.where(category: "Vegetables").update_all(category_id: vegetables.id)
    # Item.where(category: "Dairy").update_all(category_id: dairy.id)
    # Item.where(category: "Canned goods").update_all(category_id: canned_goods.id)
    # Item.where(category: "Grains and Cereals").update_all(category_id: grains_and_cereals.id)

    # fruits_items.update_all(category_id: fruits.id)
    # vegetables_items.update_all(category_id: vegetables.id)
    # dairy_items.update_all(category_id: dairy.id)

end
ActiveRecord::Base.connection.execute('PRAGMA foreign_keys = ON;')