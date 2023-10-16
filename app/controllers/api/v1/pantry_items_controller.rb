class Api::V1::PantryItemsController < ApplicationController
  before_action :authorize
  # before_action :set_pantry_item, only: %i[ show update destroy ]

  # GET /pantry_items
  def index
    @pantry_items = PantryItem.all
    # if no items return empty array
    if @pantry_items.length == 0
      render json: []
    else
      render json: @pantry_items
    end
    
  end

  # GET /pantry_items/1
  def show
    @user = session[:userinfo]
    render json: @pantry_item
  end

  # POST /pantry_items
  def create
    @existing_pantry_item = PantryItem.find_by(id: params[:id])

    if @existing_pantry_item

      # @existing_pantry_item.update(quantity: @existing_pantry_item.quantity + params[:quantity])
      puts "Updating quantity for existing pantry item: #{@existing_pantry_item}"
      @existing_pantry_item.update(quantity: @existing_pantry_item.quantity + params[:quantity])
      puts "Updated quantity to: #{@existing_pantry_item.quantity}"
      render json: @existing_pantry_item, status: :created, location: @existing_pantry_item
    else 
      @pantry_item = PantryItem.new(pantry_item_params)

      if @pantry_item.save
      render json: @pantry_item, status: :created, location: @pantry_item
      else
      render json: @pantry_item.errors, status: :unprocessable_entity
      end
    end
  end

  # PATCH/PUT /pantry_items/1
  def update
    if @pantry_item.update(pantry_item_params)
      render json: @pantry_item
    else
      render json: @pantry_item.errors, status: :unprocessable_entity
    end
  end

  # DELETE /pantry_items/1
  def destroy
    @pantry_item.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_pantry_item
      @pantry_item = PantryItem.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def pantry_item_params
      params.require(:pantry_item).permit(:name, :quantity, :expiration_date)
    end
end
