class CreateOrders < ActiveRecord::Migration[7.0]
  def change
    create_table :orders do |t|

      #ここから追記

      t.integer :total_price, null: false, default: 0

      #ここまで追記

      t.timestamps
    end
  end
end
