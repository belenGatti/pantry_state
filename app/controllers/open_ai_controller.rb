require 'httparty'

class OpenAiController < ApplicationController
    include HTTParty
    def generate_response(prompt)
        response = send_openai_request(prompt)
        parsed_response = JSON.parse(response.body) # or response.body?
        answer = parsed_response.dig("choices", 0, "message", "content")
        answer = [answer]
        return answer || "An error ocurred when returning answer"
    end
    #@TODO refactor prompt to chatgtp, tell him about my categories and ask him if the new item fits in any of them, if not create a new one and return just that
    private
    def send_openai_request(params)
        url = "https://api.openai.com/v1/chat/completions"
        headers = {
            "Content-Type" => "application/json",
            "Authorization" => "Bearer #{ENV.fetch("OPENAI_API_KEY")}"
        }

        data = {
            "model": "gpt-3.5-turbo",
            "messages": [
                {
                    "role": "user",
                    "content": params[:params]
                }
            ]
        }

        response = HTTParty.post(url, headers: headers, body: data.to_json)
        return response
    end

    def self.generate_prompt(categories, label)
       prompt = "My pantry app categories: #{categories} . User adds '#{label}'. In which category does it belong? If none, create a new category label ('Other' not valid answer). Answer only an object with category_label and item's prefered measurement_unit (in metric system eg. kilo, package, unit). Do not include explanations."
        return prompt
    end

    def prompt_params
        params.permit(:last_fruit_id, :last_vegetables_id, :last_dairy_id, :last_canned_goods_id, :new_item)
    end
end
