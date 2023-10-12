class Api::V1::PantriesController < ApplicationController
    before_action :authorize
    def create_pantry
        @user = current_user

        if @user.pantry.nil?
            @user.create_pantry
            redirect_to '/food-items-list'
        else
            redirect_to '/food-items-list'
            
        end

    end 
end
