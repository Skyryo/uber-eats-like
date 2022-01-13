class CreateLineFoods < ActiveRecord::Migration[7.0]
  def change
    create_table :line_foods do |t|

      #ここから追記
      
      t.references :food, null: false, foreign_key: true
      t.references :restaurant, null: false, foreign_key: true
      t.references :order, foreign_key: true
      t.integer :count, null: false, default: 0
      t.boolean :active, null: false, default: false

      #ここまで追記

      t.timestamps
    end
  end
end
