class CreateCars < ActiveRecord::Migration
  def change
    create_table :cars do |t|
      t.string :make
      t.string :model
      t.string :trim_name
      t.string :trim_number
      t.integer :price
      t.integer :user_id

      t.timestamps
    end
  end
end
