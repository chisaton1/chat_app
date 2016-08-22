class FriendsController < ApplicationController
  def friend
    userFriend = User.find(params[:friend_id])
    # friend.touch # updated_atの更新
    # friend.save
    # friendData = friend.where("user_id = #{current_user.id} and to_user_id = #{params[:friend_id]}")
    #二重にDBへ同じデータを保存しないようにする
    if !current_user.friend?(userFriend)
      new_friend_data = current_user.friends.build(to_user_id: friend.id)
      new_friend_data.save
    end
    redirect_to messages_path
  end

  def unfriend
    # friendData = Friend.find_by("user_id = #{current_user.id} and to_user_id = #{params[:friend_id]}")
    friendData = Friend.find_by(user_id: current_user.id, to_user_id: params[:friend_id])
    friendData.destroy
    redirect_to messages_path
  end
end
