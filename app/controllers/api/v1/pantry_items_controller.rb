class Api::V1::PantryItemsController < ApplicationController
  before_action :authorize
  # before_action :set_pantry_item
  # before_action :set_pantry_id

  # GET /pantry_items
  def index
  end

  # GET /pantry_items/1 get all pantry items for a specific pantry/user
  def show
    @pantry_items = PantryItem.select { |item| item.pantry_id == params[:id] }
    # if no items return empty array
    if @pantry_items.empty?
      render json: []
    else
      @pantry_items_with_details = @pantry_items.map do |pantry_item|
        @item = pantry_item.item
        {
          id: pantry_item.id,
          pantry_id: pantry_item.pantry_id,
          item_id: @item.id,
          name: pantry_item.name,
          quantity: pantry_item.quantity,
          expiration_date: pantry_item.expiration_date,
          category: @item.category,
          measurement_unit: @item.measurement_unit
        }
      end
      render json: @pantry_items_with_details
    end
  end

  # POST /pantry_items
  def create
      @item = Item.find_by(label: params[:name])
      @pantry_id = Pantry.find_by(pantry_id: params[:pantry_id])
      @item_exists = PantryItem.find_by(item_id: @item.internal_id, pantry_id: @pantry_id)
      if @item_exists
        @existing_item = PantryItem.find_by(id: @item_exists.id)
        @existing_item.update(quantity: @item_exists.quantity + params[:quantity])
        render json: @item_exists, status: :created
      else
        @pantry_item = PantryItem.new(
          pantry_id: @pantry_id,
          item_id: @internal_id,
          quantity: params[:quantity],
          expiration_date: params[:expiration_date],
          name: params[:name])
        @pantry_item.pantry = @pantry_id
        @pantry_item.item = @item
        if @pantry_item.save
        else
          render json: @pantry_item.errors, status: :unprocessable_entity
        end
      end
  end

  # PATCH/PUT /pantry_items/1
  def update
    @pantry_item = PantryItem.find_by(id: params[:id])
    if @pantry_item.quantity != params[:quantity]
      @pantry_item.update(quantity: params[:quantity])
    else
      @pantry_item.expiration_date != params[:expiration_date]
      @pantry_item.update(expiration_date: params[:expiration_date])
    end
    if @pantry_item.update(pantry_item_params)
      render json: @pantry_item
    else
      render json: @pantry_item.errors, status: :unprocessable_entity
    end
  end

  # DELETE /pantry_items/1
  def destroy
    @pantry_item = PantryItem.find_by(id: params[:id])
    @pantry_item.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_pantry_item
      @item = Item.find_by(label: params[:label])
      puts "Item: #{@item}"
      if @item
        @internal_id = @item.internal_id
      else
        @internal_id = nil
      end
    end

    def set_pantry_id
      @pantry_id = Pantry.find_by(auth0_id: params[:auth0_id])
      puts "Pantry ID: #{@pantry_id}"
    end

    # Only allow a list of trusted parameters through.
    def pantry_item_params
      params.require(:pantry_item).permit(:label, :quantity, :expiration_date, :pantry_id, :internal_id)
    end
end
