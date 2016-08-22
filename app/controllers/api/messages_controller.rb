class Api::MessagesController < ApplicationController
  def index
    @messages = Message.where("user_id = #{current_user.id} or to_user_id = #{current_user.id}")
    render json: @messages
  end

  def create
    if params[:content]
      @message = Message.new(
        content: params[:content],
        user_id: current_user.id,
        to_user_id: params[:to_user_id]
      )
    else
      file = params[:image]
      file_name = Time.zone.now.to_i.to_s + params[:image].original_filename
      File.open("public/user_images/#{file_name}", 'wb'){|f| f.write(file.read)}
      @message = Message.new(
        image: file_name,
        user_id: params[:user_id],
        to_user_id: params[:to_user_id]
      )
    end
    @message.save
    # redirect_to messages_path
    render json: @message
  end
  # def createImage
  #   @message = Message.new(image: params[:image],
  #                           user_id: params[:user_id],
  #                           to_user_id: params[:to_user_id],
  #                         )
  #   @message.save
  #   redirect_to messages_path
  # end
end
