class Api::V1::CategoriesController < ApplicationController
    def index
        categories = Category.all
        categories_hash = categories.map do |category|
            {
                id: category.id,
                name: category.name,
        }
        end
        render json: categories_hash
    end

    def create
        category = Category.new(category_params)
        if category.save
            render json: category, status: :created
        else
            render json: category.errors, status: :unprocessable_entity
        end
    end

    private
    def category_params
        params.require(:category).permit(:name)
    end
end
