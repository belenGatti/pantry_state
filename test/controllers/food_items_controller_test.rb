require "test_helper"

class FoodItemsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @food_item = food_items(:one)
  end

  test "should get index" do
    get food_items_url, as: :json
    assert_response :success
  end

  test "should create food_item" do
    assert_difference("FoodItem.count") do
      post food_items_url, params: { food_item: { expiration_date: @food_item.expiration_date, name: @food_item.name, quantity: @food_item.quantity } }, as: :json
    end

    assert_response :created
  end

  test "should show food_item" do
    get food_item_url(@food_item), as: :json
    assert_response :success
  end

  test "should update food_item" do
    patch food_item_url(@food_item), params: { food_item: { expiration_date: @food_item.expiration_date, name: @food_item.name, quantity: @food_item.quantity } }, as: :json
    assert_response :success
  end

  test "should destroy food_item" do
    assert_difference("FoodItem.count", -1) do
      delete food_item_url(@food_item), as: :json
    end

    assert_response :no_content
  end
end
