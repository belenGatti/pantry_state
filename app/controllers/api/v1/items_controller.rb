class Api::V1::ItemsController < ApplicationController
    before_action :authorize, only: [:create]
    #        Item.create(id: "", label: "", category: "", measurement_unit: "", image: "")
    def initialise_data
        begin
            puts 'Initialising data...'
            Item.create(internal_id: "101", label: "Apple", category: "Fruits", measurement_unit: "", image: "")
            Item.create(internal_id: "102", label: "Banana", category: "Fruits", measurement_unit: "", image: "")
            Item.create(internal_id: "103", label: "Orange", category: "Fruits", measurement_unit: "", image: "")
            Item.create(internal_id: "104", label: "Pear", category: "Fruits", measurement_unit: "", image: "")
            Item.create(internal_id: "105", label: "Peach", category: "Fruits", measurement_unit: "", image: "")
            Item.create(internal_id: "106", label: "Strawberries", category: "Fruits", measurement_unit: "", image: "")
            Item.create(internal_id: "107", label: "Raspberries", category: "Fruits", measurement_unit: "", image: "")
            Item.create(internal_id: "108", label: "Blackberries", category: "Fruits", measurement_unit: "", image: "")
            Item.create(internal_id: "109", label: "Mandarine", category: "Fruits", measurement_unit: "", image: "")
            Item.create(internal_id: "110", label: "Grapes", category: "Fruits", measurement_unit: "", image: "")
            Item.create(internal_id: "111", label: "Kiwi", category: "Fruits", measurement_unit: "", image: "")
            Item.create(internal_id: "112", label: "Pineapple", category: "Fruits", measurement_unit: "", image: "")
            Item.create(internal_id: "113", label: "Mango", category: "Fruits", measurement_unit: "", image: "")
            Item.create(internal_id: "114", label: "Watermelon", category: "Fruits", measurement_unit: "", image: "")
            Item.create(internal_id: "201", label: "Broccoli", category: "Vegetables", measurement_unit: "", image: "")
            Item.create(internal_id: "202", label: "Cabbage", category: "Vegetables", measurement_unit: "", image: "")
            Item.create(internal_id: "203", label: "Carrot", category: "Vegetables", measurement_unit: "", image: "")
            Item.create(internal_id: "204", label: "Cauliflower", category: "Vegetables", measurement_unit: "", image: "")
            Item.create(internal_id: "205", label: "Celery", category: "Vegetables", measurement_unit: "", image: "")
            Item.create(internal_id: "206", label: "Cucumber", category: "Vegetables", measurement_unit: "", image: "")
            Item.create(internal_id: "207", label: "Eggplant", category: "Vegetables", measurement_unit: "", image: "")
            Item.create(internal_id: "208", label: "Leek", category: "Vegetables", measurement_unit: "", image: "")
            Item.create(internal_id: "209", label: "Lettuce", category: "Vegetables", measurement_unit: "", image: "")
            Item.create(internal_id: "210", label: "Mushroom", category: "Vegetables", measurement_unit: "", image: "")
            Item.create(internal_id: "211", label: "Onion", category: "Vegetables", measurement_unit: "", image: "")
            Item.create(internal_id: "212", label: "Red onion", category: "Vegetables", measurement_unit: "", image: "")
            Item.create(internal_id: "213", label: "Red pepper", category: "Vegetables", measurement_unit: "", image: "")
            Item.create(internal_id: "214", label: "Green pepper", category: "Vegetables", measurement_unit: "", image: "")
            Item.create(internal_id: "215", label: "Yellow pepper", category: "Vegetables", measurement_unit: "", image: "")
            Item.create(internal_id: "216", label: "Potatoes", category: "Vegetables", measurement_unit: "", image: "")
            Item.create(internal_id: "217", label: "Pumpkin", category: "Vegetables", measurement_unit: "", image: "")
            Item.create(internal_id: "218", label: "Spinach", category: "Vegetables", measurement_unit: "", image: "")
            Item.create(internal_id: "219", label: "Tomato", category: "Vegetables", measurement_unit: "", image: "")
            Item.create(internal_id: "220", label: "Courgette", category: "Vegetables", measurement_unit: "", image: "")
            Item.create(internal_id: "301", label: "Milk", category: "Dairy", measurement_unit: "", image: "")
            Item.create(internal_id: "302", label: "Butter", category: "Dairy", measurement_unit: "", image: "")
            Item.create(internal_id: "303", label: "Cheese", category: "Dairy", measurement_unit: "", image: "")
            Item.create(internal_id: "304", label: "Parmiggiano Reggiano", category: "Dairy", measurement_unit: "", image: "")
            Item.create(internal_id: "305", label: "Cream", category: "Dairy", measurement_unit: "", image: "")
            Item.create(internal_id: "306", label: "Cream cheese", category: "Dairy", measurement_unit: "", image: "")
            Item.create(internal_id: "307", label: "Sour cream", category: "Dairy", measurement_unit: "", image: "")
            Item.create(internal_id: "308", label: "Yogurt", category: "Dairy", measurement_unit: "", image: "")
            Item.create(internal_id: "401", label: "Black beans", category: "Canned goods", measurement_unit: "", image: "")
            Item.create(internal_id: "402", label: "Chickpeas", category: "Canned goods", measurement_unit: "", image: "")
            Item.create(internal_id: "403", label: "Kinternal_idney beans", category: "Canned goods", measurement_unit: "", image: "")
            Item.create(internal_id: "404", label: "Red lentils", category: "Canned goods", measurement_unit: "", image: "")
            Item.create(internal_id: "405", label: "Green lentils", category: "Canned goods", measurement_unit: "", image: "")
            Item.create(internal_id: "406", label: "Beluga lentils", category: "Canned goods", measurement_unit: "", image: "")
            Item.create(internal_id: "407", label: "Coconut milk", category: "Canned goods", measurement_unit: "", image: "")
            Item.create(internal_id: "408", label: "Passata", category: "Canned goods", measurement_unit: "", image: "")
            Item.create(internal_id: "409", label: "Tomato paste", category: "Canned goods", measurement_unit: "", image: "")
            Item.create(internal_id: "410", label: "Cerry tomatoes", category: "Canned goods", measurement_unit: "", image: "")
            Item.create(internal_id: "411", label: "Peeled tomatoes", category: "Canned goods", measurement_unit: "", image: "")
        rescue ActiveRecord::RecordInvalid => e
            puts e
        end
        puts 'Data initialised!'
    end

    def index
        @items = Item.all
        render json: @items
    end

    def show
        render json: @items
    end

    def create
        @items = Item.new(item_params)
        puts "#{item_params}"
        # need to make a call to the open ai api to get the category and others 
        if @items.save
            render json: @items, status: :created, location: @item
        else
            render json: @items.errors, status: :unprocessable_entity
        end
    end

    def update
        if @items.update(item_params)
            render json: @items
        else
            render json: @items.errors, status: :unprocessable_entity
        end
    end

    def destroy
        @items.destroy
    end

    private
    def item_params
        params.require(:item).permit(:internal_id, :label)
    end
    
end



