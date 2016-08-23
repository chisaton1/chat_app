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
    user = User.find(params[:friend_id])
    friendData = current_user.friend_data_for(user)
    friendData.destroy
    redirect_to messages_path
  end
end
