class CreateFeatures < ActiveRecord::Migration
  def change
    create_table :features do |t|
      t.string :name
      t.string :description
      t.integer :price
      t.integer :car_id

      t.timestamps
    end
  end
end
