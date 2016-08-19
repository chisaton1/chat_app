class RemoveLastAccessFromUsers < ActiveRecord::Migration
  def change
    remove_column :users, :last_access, :datetime
  end
end
