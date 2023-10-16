class Api::V1::UsersController < ApplicationController

    def create
      email = params[:email]
      auth0_id = params[:auth0_id]
      name = params[:name]

      user = User.create(email: email, auth0_id: auth0_id, name: name)
      
      if user.save
        render json: { message: 'Create Success', user: user }
      else
        render json: { message: user.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    def update
      # find user by id
      user = User.find(params[:id])
  
      # return when record not saved
      unless user.update(user_params)
        return render json: { message: user.errors.full_messages },
                      status: :unprocessable_entity
      end
  
      # response if successfuly save
      render json: { message: 'Update Success',
                     user: }
    end
  
    def index
      # return all user
      render json: User.all
    end
  
    def show
      # find user by id
      user = User.find(params[:id])
  
      # return user
      render json: user
    end
  
    def destroy
      # find user by id
      user = User.find(params[:id])
  
      # return when record not destroyed
      unless user.destroy
        return render json: { message: user.errors.full_messages },
                      status: :unprocessable_entity
      end
  
      # response if successfuly save
      render json: { message: 'Destroy Success',
                     user: }
    end
  
    private
  
    # set up strong parameters
    # def 
    #   params.permit()
    #   # params.permit(:auth0_id, :name, :email)
    # end
  end