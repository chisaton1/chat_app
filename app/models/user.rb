class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :messages, dependent: :destroy
  has_many :friends
  validates :name, presence: true

  def friend?(user)
    Friend.find_by(user_id: self.id, to_user_id: user.id) ||
    Friend.find_by(user_id: user.id, to_user_id: self.id)
  end

  def friend_data_for(user)
    Friend.find_by(user_id: self.id, to_user_id: user.id) ||
      Friend.find_by(user_id: user.id, to_user_id: self.id)
  end

  def friend_ids
    Friend.where(user_id: self.id).pluck(:to_user_id).
      concat(Friend.where(to_user_id: self.id).pluck(:user_id))
  end
end
