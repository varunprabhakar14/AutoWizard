class Feature < ActiveRecord::Base
  # validates :name, :price, :presence => true

  belongs_to :car
end
