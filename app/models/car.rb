class Car < ActiveRecord::Base
  validates :make, :model, :trim_name, :trim_number, :price, presence: true

  belongs_to :user
  has_many :features, dependent: :destroy
  accepts_nested_attributes_for :features
end
