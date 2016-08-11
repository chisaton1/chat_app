class FriendsController < ApplicationController
  def friend
    friend = User.find(params[:friend_id])
    friend.touch # updated_atの更新
    friend.save
    findData = Friend.where("user_id = #{current_user.id} and to_user_id = #{params[:friend_id]}")
    if !findData
      new_friend_data = current_user.friends.build(to_user_id: friend.id)
      new_friend_data.save
    end
    redirect_to messages_path
  end

  def unfriend
  end
end
