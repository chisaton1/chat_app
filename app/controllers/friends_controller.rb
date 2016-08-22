class FriendsController < ApplicationController
  def friend
    # Friendモデルがあるので、ここでfriendという変数名は紛らわしいのでやめたほうがいいかな
    friend = User.find(params[:friend_id])
    # これって何のためにやってるのかな？？必要？？
    friend.touch # updated_atの更新
    friend.save
    # whereとか使うときはallなしで！
    friendData = Friend.all.where("user_id = #{current_user.id} and to_user_id = #{params[:friend_id]}")
    # 上の1行とまとめて if current_user.friend?(相手のuser)みたいにメソッド作って書けるといいね！
    #二重にDBへ同じデータを保存しないようにする
    if friendData.length === 0
      new_friend_data = current_user.friends.build(to_user_id: friend.id)
      new_friend_data.save
    end
    redirect_to messages_path
  end

  def unfriend
    # whereは配列を返すけどfind_by使ったら1つだけ返ってくるよ!
    friendData = Friend.all.where("user_id = #{current_user.id} and to_user_id = #{params[:friend_id]}")
    friendData[0].destroy # whereは配列で返すので
    redirect_to messages_path
  end
end
