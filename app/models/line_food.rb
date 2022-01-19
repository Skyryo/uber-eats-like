#start_my_code

class LineFood < ApplicationRecord
    belongs_to :food
    belongs_to :restaurant
    belongs_to :order, optional: true

    validates :count, numericality: { greater_than: 0 }

    scope :active, -> { where(active: true) }
    scope :other_restaurant, -> (picked_resaurant_id) { where.not(restaurant_id: picked_resaurant_id) }

    def total_amount
        food.price * count
    end
end

#end_my_code