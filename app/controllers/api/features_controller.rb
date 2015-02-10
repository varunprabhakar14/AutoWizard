module Api
  class FeaturesController < ApplicationController
    def create
      @feature = current_user.features.new(feature_params)

      if @feature.save
        render json: @feature
      else
        render json: @feature.errors.full_messages, status: :unprocessable_entity
      end
    end

    def index
      @features = current_user.features
      render json: @features
    end

    private

    def feature_params
      params.require(:feature).permit(:name, :description, :price)
    end
  end
end
