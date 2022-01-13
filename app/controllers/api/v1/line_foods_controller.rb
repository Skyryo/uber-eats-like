#start_my_code

module Api
    module V1
        class LineFoodsController < ApplicationController
            before_aciton :set_food, only: %i[create replace]

            # definate index method
            def index
                line_foods = LineFood.active
                if line_foods.exists?
                    renor json: {
                        line_food_ids: line_foods.map { |line_food| line_food.id },
                        restaurant: line_foods[0].restaurant,
                        count: line_foods.sum { |line_food| line_food[:count] },
                        amount: line_foods.sum { |line_food| line_food.total_amount },   
                    }, status: :ok
                else
                    render json: {}, status: :no_content
                end
            end

            # definate cleate method
            def create
                if LineFood.active.other_restaurant(@ordered_food.restaurant.id).exists?
                    return render json: {
                        existing_restaurant: LineFood.other_restaurant(@ordered_food.restaurant_id).first.restaurant.name,
                        new_restauranat: Food.find(params[:food_id]).restaurant.name,
                    },status: :not_acceptable
                end

                set_line_food(@ordered_food)

                if @line_food.save
                    render json: {
                        line_food: @line_food
                    },status: :created
                else
                    render json: {},status: :internal_server_error
                end
            end

            # definate replace method
            def replace
                LineFood.active.other_restaurant(@ordered_food.restaurant.id).each do |line_food|
                    line_food.update_attribute(:active, false)
            end

            set_line_food(@ordered_food)

            if @line_food.save
                render json: {
                    line_food: @line_food
                }, status: :created
            else
                render json: {}, status: :internal_server_error
            end
        end

            private

            def set_food
                @ordered_food = Food.find(params[:food_id])
            end

            def set_line_food(ordered_food)
                if ordered_food.line_food.present?
                    @line_food = ordered_food.line_food
                    @line_food.attributes = {
                        const: ordered_food.line_food.count + params[:count],
                        active: true
                    }
                else
                    @line_food = ordered_food.buil_line_food(
                        count: params[:count],
                        restaurant: ordered_food.restaurant,
                        active: true
                    )
                end
            end
        end
    end
end

#end