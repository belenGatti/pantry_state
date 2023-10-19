class Api::V1::PantriesController < ApplicationController
    before_action :authorize

    def index
        @pantries = Pantry.all
        if @pantries.length == 0
            render json: []
        else
            render json: @pantries
        end
    end

    def show
        @pantry = Pantry.find_by(user_id: params[:id])
        render json: @pantry.id
    end

    def create
        @user = current_user

        if @user.pantry.nil?
            @user.create_pantry
            redirect_to '/food-items-list'
        else
            redirect_to '/food-items-list'
            
        end
    end

    def update
    end

    def Destroy
    end
end
