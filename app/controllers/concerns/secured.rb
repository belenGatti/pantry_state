# app/controllers/concerns/secured.rb

# frozen_string_literal: true

module Secured
    extend ActiveSupport::Concern
  
    REQUIRES_AUTHENTICATION = { message: 'Requires authentication' }.freeze
    BAD_CREDENTIALS = {
      message: 'Bad credentials'
    }.freeze
    MALFORMED_AUTHORIZATION_HEADER = {
      error: 'invalid_request',
      error_description: 'Authorization header value must follow this format: Bearer access-token',
      message: 'Bad credentials'
    }.freeze
  
    def authorize
      token = token_from_request
  
      return if performed?
      
      validation_response = Auth0Client.validate_token(token)

      if validation_response.is_a?(Array) && !validation_response.empty?
       @decoded_token = validation_response[0]
      else 
        error = validation_response.error
        render json: { message: validation_response.error.message }, status: validation_response.error.status
        return
      end
      
    end
  
    private
  
    def token_from_request
      authorization_header_elements = request.headers['Authorization']&.split
  
      render json: REQUIRES_AUTHENTICATION, status: :unauthorized and return unless authorization_header_elements
  
      unless authorization_header_elements.length == 2
        render json: MALFORMED_AUTHORIZATION_HEADER, status: :unauthorized and return
      end
  
      scheme, token = authorization_header_elements
  
      render json: BAD_CREDENTIALS, status: :unauthorized and return unless scheme.downcase == 'bearer'
  
      token
    end
  end