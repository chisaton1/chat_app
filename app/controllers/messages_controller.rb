class MessagesController < ApplicationController
  def show
    messages = Message.all
    render json: messages
  end
end
