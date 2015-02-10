class Car < ActiveRecord::Base
  validates :make, :model, :trim_name, :trim_number, :price, presence: true

  belongs_to :user
  has_many :features
end
