class ApplicationController < ActionController::API
    include Secured


    rescue_from ActiveRecord::RecordNotFound do |e|
        data = { message: e.message }
        render json: data, status: :not_found
    end
end
