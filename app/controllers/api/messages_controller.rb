class Api::MessagesController < ApplicationController
  def index # TODO current_userに基づいた情報のみ取ってくる
    @messages = Message.all.where("user_id = #{current_user.id} or to_user_id = #{current_user.id}")
    render json: @messages
  end

  def create
    @message = Message.new(content: params[:content], user_id: params[:user_id], to_user_id: params[:to_user_id])
    @message.save
    redirect_to messages_path
  end
end
