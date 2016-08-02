class Api::MessagesController < ApplicationController
  def index
    @messages = Message.all
    render json: @messages
  end

  def create
    @message = Message.new(content: params[:content], user_id: params[:user_id])
    if @message.save
      render json: @message #for comfirmation
    else
      render text: "error"
    end
  end
end
