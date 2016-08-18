class Api::CurrentUserController < ApplicationController
  def index
    render json: current_user
  end

  # def create
  #   @message = Message.new(image: params[:image],
  #                          user_id: params[:user_id],
  #                          to_user_id: params[:to_user_id],
  #                         )
  #   @message.save
  #   redirect_to messages_path
  # end
end
