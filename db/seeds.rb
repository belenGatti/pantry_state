# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
ActiveRecord::Base.connection.execute('PRAGMA foreign_keys = OFF;')
ActiveRecord::Base.transaction do

    Item.destroy_all
    # @TODO measurement_unit there should be a standard one for each category. 
    # i am unsure wheter to add kilos since most people dont weight products and count them by unit?
    Item.create!([
        {internal_id: "101", label: "Apple", category: "Fruits", measurement_unit: "unit", image: ""},
        {internal_id: "102", label: "Banana", category: "Fruits", measurement_unit: "unit", image: ""},
        {internal_id: "103", label: "Orange", category: "Fruits", measurement_unit: "unit", image: ""},
        {internal_id: "104", label: "Pear", category: "Fruits", measurement_unit: "unit", image: ""},
        {internal_id: "105", label: "Peach", category: "Fruits", measurement_unit: "unit", image: ""},
        {internal_id: "106", label: "Strawberries", category: "Fruits", measurement_unit: "", image: ""},
        {internal_id: "107", label: "Raspberries", category: "Fruits", measurement_unit: "", image: ""},
        {internal_id: "108", label: "Blackberries", category: "Fruits", measurement_unit: "", image: ""},
        {internal_id: "109", label: "Mandarine", category: "Fruits", measurement_unit: "kilo", image: ""},
        {internal_id: "110", label: "Grapes", category: "Fruits", measurement_unit: "", image: ""},
        {internal_id: "111", label: "Kiwi", category: "Fruits", measurement_unit: "unit", image: ""},
        {internal_id: "112", label: "Pineapple", category: "Fruits", measurement_unit: "unit", image: ""},
        {internal_id: "113", label: "Mango", category: "Fruits", measurement_unit: "unit", image: ""},
        {internal_id: "114", label: "Watermelon", category: "Fruits", measurement_unit: "unit", image: ""},
        {internal_id: "201", label: "Broccoli", category: "Vegetables", measurement_unit: "unit", image: ""},
        {internal_id: "202", label: "Cabbage", category: "Vegetables", measurement_unit: "unit", image: ""},
        {internal_id: "203", label: "Carrot", category: "Vegetables", measurement_unit: "kilo", image: ""},
        {internal_id: "204", label: "Cauliflower", category: "Vegetables", measurement_unit: "unit", image: ""},
        {internal_id: "205", label: "Celery", category: "Vegetables", measurement_unit: "unit", image: ""},
        {internal_id: "206", label: "Cucumber", category: "Vegetables", measurement_unit: "unit", image: ""},
        {internal_id: "207", label: "Eggplant", category: "Vegetables", measurement_unit: "unit", image: ""},
        {internal_id: "208", label: "Leek", category: "Vegetables", measurement_unit: "unit", image: ""},
        {internal_id: "209", label: "Lettuce", category: "Vegetables", measurement_unit: "unit", image: ""},
        {internal_id: "210", label: "Mushroom", category: "Vegetables", measurement_unit: "kilo", image: ""},
        {internal_id: "211", label: "Onion", category: "Vegetables", measurement_unit: "kilo", image: ""},
        {internal_id: "212", label: "Red onion", category: "Vegetables", measurement_unit: "kilo", image: ""},
        {internal_id: "213", label: "Red pepper", category: "Vegetables", measurement_unit: "unit", image: ""},
        {internal_id: "214", label: "Green pepper", category: "Vegetables", measurement_unit: "unit", image: ""},
        {internal_id: "215", label: "Yellow pepper", category: "Vegetables", measurement_unit: "unit", image: ""},
        {internal_id: "216", label: "Potatoes", category: "Vegetables", measurement_unit: "kilo", image: ""},
        {internal_id: "217", label: "Pumpkin", category: "Vegetables", measurement_unit: "unit", image: ""},
        {internal_id: "218", label: "Spinach", category: "Vegetables", measurement_unit: "unit", image: ""},
        {internal_id: "219", label: "Tomato", category: "Vegetables", measurement_unit: "kilo", image: ""},
        {internal_id: "220", label: "Courgette", category: "Vegetables", measurement_unit: "unit", image: ""},
        {internal_id: "301", label: "Milk", category: "Dairy", measurement_unit: "litre", image: ""},
        {internal_id: "302", label: "Butter", category: "Dairy", measurement_unit: "pan", image: ""},
        {internal_id: "303", label: "Cheese", category: "Dairy", measurement_unit: "unit", image: ""},
        {internal_id: "304", label: "Parmiggiano Reggiano", category: "Dairy", measurement_unit: "package", image: ""},
        {internal_id: "305", label: "Cream", category: "Dairy", measurement_unit: "unit", image: ""},
        {internal_id: "306", label: "Cream cheese", category: "Dairy", measurement_unit: "unit", image: ""},
        {internal_id: "307", label: "Sour cream", category: "Dairy", measurement_unit: "unit", image: ""},
        {internal_id: "308", label: "Yogurt", category: "Dairy", measurement_unit: "unit", image: ""},
        {internal_id: "401", label: "Black beans", category: "Canned goods", measurement_unit: "can", image: ""},
        {internal_id: "402", label: "Chickpeas", category: "Canned goods", measurement_unit: "can", image: ""},
        {internal_id: "403", label: "Kidney beans", category: "Canned goods", measurement_unit: "can", image: ""},
        {internal_id: "404", label: "Red lentils", category: "Canned goods", measurement_unit: "can", image: ""},
        {internal_id: "405", label: "Green lentils", category: "Canned goods", measurement_unit: "can", image: ""},
        {internal_id: "406", label: "Beluga lentils", category: "Canned goods", measurement_unit: "can", image: ""},
        {internal_id: "407", label: "Coconut milk", category: "Canned goods", measurement_unit: "can", image: ""},
        {internal_id: "408", label: "Passata", category: "Canned goods", measurement_unit: "can", image: ""},
        {internal_id: "409", label: "Tomato paste", category: "Canned goods", measurement_unit: "can", image: ""},
        {internal_id: "410", label: "Cherry tomatoes", category: "Canned goods", measurement_unit: "can", image: ""},
        {internal_id: "411", label: "Peeled tomatoes", category: "Canned goods", measurement_unit: "can", image: ""},
        {internal_id: "501", label: "Fusilli", category: "Grains and Cereals", measurement_unit: "package", image: ""},
        {internal_id: "502", label: "Linguine", category: "Grains and Cereals", measurement_unit: "package", image: ""},
        {internal_id: "503", label: "Lasagna sheets", category: "Grains and Cereals", measurement_unit: "package", image: ""},
        {internal_id: "504", label: "Trofie", category: "Grains and Cereals", measurement_unit: "package", image: ""},
    ])
end
ActiveRecord::Base.connection.execute('PRAGMA foreign_keys = ON;')