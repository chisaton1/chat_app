class Api::UsersController < ApplicationController
  def index
    if current_user
      render json: User.where.not("id = #{current_user.id}")
    else
      render json: []
    end
  end
end
