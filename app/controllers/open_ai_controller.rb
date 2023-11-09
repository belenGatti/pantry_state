require 'httparty'

class OpenAiController < ApplicationController
    include HTTParty
    def generate_response(params)
        puts "PARMASMASMASMS #{params}"
        response = send_openai_request({params: params})
        parsed_response = JSON.parse(response.body) # or response.body?
        answer = parsed_response.dig("choices", 0, "message", "content")
        puts "ANSWER #{answer}"
        if answer.nil?
            answer = "I don't know"
        else
            render json: answer
        end
    end
    #@TODO refactor prompt to chatgtp, tell him about my categories and ask him if the new item fits in any of them, if not create a new one and return just that
    private
    def send_openai_request(params)
        # this is the response i get back from openai
        # response = {
        #     "id": "chatcmpl-8DvbSlZMfls3AiYMTpDDgt9343lKI",
        #     "object": "chat.completion",
        #     "created": 1698330382,
        #     "model": "gpt-3.5-turbo-0613",
        #     "choices": [
        #         {
        #             "index": 0,
        #             "message": {
        #                 "role": "assistant",
        #                 "content": "{\n  \"internal_id\": 412,\n  \"label\": \"Burger buns\",\n  \"category\": \"Canned goods\",\n  \"measurement_unit\": \"package\"\n}"
        #             },
        #             "finish_reason": "stop"
        #         }
        #     ],
        #     "usage": {
        #         "prompt_tokens": 106,
        #         "completion_tokens": 37,
        #         "total_tokens": 143
        #     }
        # }
        # return response
        url = "https://api.openai.com/v1/chat/completions"
        puts "PARAMS INSIDE SEND OPENAI REQUEST AAAA #{params[:params]}"
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
        puts response
        return response
    end

    def self.generate_prompt(category_ids, new_item)
       prompt = "My pantry app categories: Fruits (internal_id 100+), last used ID: #{category_ids[:last_fruit_id]}, Vegetables (200, #{category_ids[:last_vegetables_id]}), Dairy (300, #{category_ids[:last_dairy_id]}), Canned goods (400, #{category_ids[:last_canned_goods_id]}). User adds '#{new_item[:label]}'. In which category? If none, create new with internal_id rules. Answer only an object with internal_id, label, category, measurement_unit (in metric system eg. kilo, package, unit). Do not include explanations."
    end

    def prompt_params
        params.permit(:last_fruit_id, :last_vegetables_id, :last_dairy_id, :last_canned_goods_id, :new_item)
    end
end
