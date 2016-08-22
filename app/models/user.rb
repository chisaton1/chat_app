class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :messages, dependent: :destroy
  has_many :friends
  validates :name, presence: true

  def friend?(user)
    binding.pry
    !!Friend.find_by(user_id: self.id, to_user_id: user.id)
  end
end
