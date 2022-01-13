#start_my_code

module Api
    module V1
        class RestaurantsController < ApplicationController
            def index
                restaurants = Restaurant.all
                
                render json: {
                    restaurants: restaurants
                }, status: :ok
            end
        end
    end
end

#end_my_code