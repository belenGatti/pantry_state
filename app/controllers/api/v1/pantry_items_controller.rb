class Api::V1::PantryItemsController < ApplicationController
  before_action :authorize
  # before_action :set_pantry_item
  # before_action :set_pantry_id

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
    # check if pantry item already exists in the pantry 
    # if @existing_pantry_item

    #   # @existing_pantry_item.update(quantity: @existing_pantry_item.quantity + params[:quantity])
    #   puts "Updating quantity for existing pantry item: #{@existing_pantry_item}"
    #   @existing_pantry_item.update(quantity: @existing_pantry_item.quantity + params[:quantity])
    #   puts "Updated quantity to: #{@existing_pantry_item.quantity}"
    #   render json: @existing_pantry_item, status: :created, location: @existing_pantry_item
    # else 
    puts 'Creating?'
    puts "Params: #{params[:name]}"
      @item = Item.find_by(label: params[:name])
      puts "Item: #{@item}"
      @pantry_id = Pantry.find_by(auth0_id: params[:auth0_id])
      @pantry_item = PantryItem.new(
        pantry_id: @pantry_id.auth0_id,
        item_id: @internal_id,
        quantity: params[:quantity],
        expiration_date: params[:expiration_date],
      )
      @pantry_item.pantry = @pantry_id
      @pantry_item.item = @item

      if @pantry_item.save
      redirect_to '/food-items-list'
      else
      render json: @pantry_item.errors, status: :unprocessable_entity
      end
    # end
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
