class FriendsController < ApplicationController
  def friend
    friend = User.find(params[:friend_id])
    friend.touch # updated_atの更新
    friend.save
    friendData = Friend.all.where("user_id = #{current_user.id} and to_user_id = #{params[:friend_id]}")
    #二重にDBへ同じデータを保存しないようにする
    if friendData.length === 0
      new_friend_data = current_user.friends.build(to_user_id: friend.id)
      new_friend_data.save
    end
    redirect_to messages_path
  end

  def unfriend
    friendData = Friend.all.where("user_id = #{current_user.id} and to_user_id = #{params[:friend_id]}")
    friendData[0].destroy # whereは配列で返すので
    redirect_to messages_path
  end
end
