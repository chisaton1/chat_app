class UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :correct_user, only: [:update, :show]

  def show
    @user = User.find(params[:id])
    # file = params[:user][:image]
    # if !file.nil?
    #   file_name = file.original_filename
    #   File.open("public/user_images/#{file_name}", 'wb'){|f|f.write(file.read)}
    #   @user.image = file_name
    # end
  end

  # def edit
  #   @user = User.find(params[:id])
  # end

  # def edit
  #   @user = current_user
  #   @user.image_data = data
  #   binding.pry
  # end

  # def update
  # end
  def upload
    # binding.pry
    file = params[:image]
    file_name = Time.zone.now.to_i.to_s + file.original_filename
    File.open("public/user_images/#{file_name}", 'wb'){|f| f.write(file.read)}
    @content = Message.new(user_id: current_user.id, to_user_id: params[:to_user_id], image: file_name)
    @content.save
    redirect_to messages_path
  end

  def index
    @user = User.all
  end

  private
    def correct_user
      user = User.find(params[:id])
      if current_user.id != user.id
        return_back #前のページヘリダイレクトする　app_controllerのメソッドより
        flash[:alert] = "アクセス出来ません"
      end
    end

    # binding.pry
end
