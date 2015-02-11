module Api
  class FeaturesController < ApplicationController
    def create
      @feature = current_car.features.new(feature_params)

      if @feature.save
        render json: @feature
      else
        render json: @feature.errors.full_messages, status: :unprocessable_entity
      end
    end

    def index
      car = Car.find(params[:car_id])
      render :json => car.features
    end

    private

    def current_car
      if params[:id]
        @feature = Feature.find(params[:id])
        @car = @feature.car
      elsif params[:feature]
        @car = Car.find(params[:feature][:car_id])
      end
    end

    def feature_params
      params.require(:feature).permit(:name, :description, :price)
    end
  end
end
