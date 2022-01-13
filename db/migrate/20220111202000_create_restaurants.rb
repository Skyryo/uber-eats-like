class CreateRestaurants < ActiveRecord::Migration[7.0]
  def change
    create_table :restaurants do |t|

      #ここから追記
      
      t.string :name, null: false
      t.integer :fee, null: false, default: 0
      t.integer :time_required, null: false

      #ここまで追記

      t.timestamps
    end
  end
end
