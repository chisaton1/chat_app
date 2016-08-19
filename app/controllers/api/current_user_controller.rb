class Api::CurrentUserController < ApplicationController
  def index
    render json: current_user
  end

  # def create
  #   current_user.touch
  #   current_user.save
  #   render json: current_user
  # end
end
