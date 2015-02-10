module Api
  class CarsController < ApiController
    def create
      @car = current_user.cars.new(car_params)
      
      if @car.save
        render json: @car
      else
        render json: @car.errors.full_messages, status: :unprocessable_entity
      end
    end

    def index
      @cars = current_user.cars
      render json: @cars
    end

    private

    def car_params
      params.require(:car).permit(:make, :model, :trim_name, :trim_number, :price)
    end
  end
end
