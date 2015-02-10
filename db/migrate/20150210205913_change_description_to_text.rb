class ChangeDescriptionToText < ActiveRecord::Migration
  def change
    change_column :features, :description, :text
  end
end
