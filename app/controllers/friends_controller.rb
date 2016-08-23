class FriendsController < ApplicationController
  def friend
    userFriend = User.find(params[:friend_id])
    #二重にDBへ同じデータを保存しないようにする
    if !current_user.friend?(userFriend)
      new_friend_data = current_user.friends.build(to_user_id: params[:friend_id])
      new_friend_data.save
    end
    redirect_to messages_path
  end

  def unfriend
    friendData = Friend.find_by(user_id: current_user.id, to_user_id: params[:friend_id])
    if !friendData
      friendData = Friend.find_by(user_id: params[:friend_id], to_user_id: current_user.id)
    end
    friendData.destroy
    redirect_to messages_path
  end
end
