class Feature < ActiveRecord::Base
  validates :name, :description, :price

  belongs_to :car
end
