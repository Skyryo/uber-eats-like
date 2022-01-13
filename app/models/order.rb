#start_my_ode

class Order < ApplicationRecord
    has_many :line_foods

    validates :total_price, numericality: { greater_than: 0 }

    def save_with_update_line_foods!(line_foods)
        ActiveRecord::Base.transaction do
            line_foods.each do |line_food|
                line_food.update_attributes!(active: false, other: self)
            end
            self.save!
        end
    end
end

#end_my_code