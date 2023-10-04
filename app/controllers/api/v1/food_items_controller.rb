class Api::V1::FoodItemsController < ApplicationController
  include Secured
  before_action :authorize
  before_action :set_food_item, only: %i[ show update destroy ]

  # GET /food_items
  def index
    @food_items = FoodItem.all

    render json: @food_items
  end

  # GET /food_items/1
  def show
    render json: @food_item
  end

  # POST /food_items
  def create
    @food_item = FoodItem.new(food_item_params)

    if @food_item.save
      render json: @food_item, status: :created, location: @food_item
    else
      render json: @food_item.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /food_items/1
  def update
    if @food_item.update(food_item_params)
      render json: @food_item
    else
      render json: @food_item.errors, status: :unprocessable_entity
    end
  end

  # DELETE /food_items/1
  def destroy
    @food_item.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_food_item
      @food_item = FoodItem.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def food_item_params
      params.require(:food_item).permit(:name, :quantity, :expiration_date)
    end
end
