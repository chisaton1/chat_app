class Api::FriendsController < ApplicationController
  def index
    ids = current_user.friend_ids
    # チャットをしている友人のデータのみをjsonで返す
    render json: User.where(id: ids)
  end
end
