class Api::FriendsController < ApplicationController
  def index
    ids = Friend.where(user_id: current_user.id).pluck(:to_user_id)
    # チャットをしている友人のデータのみをjsonで返す
    render json: User.where(id: ids)
  end
end
