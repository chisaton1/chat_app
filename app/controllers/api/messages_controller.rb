class Api::MessagesController < ApplicationController
  def index
    @messages = Message.all
    render json: @messages
  end

  def create
    @message = Message.new(content: params[:content], user_id: params[:user_id], to_user_id: params[:to_user_id])
    @message.save
    redirect_to messages_path
  end
end
