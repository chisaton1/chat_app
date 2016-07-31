class AddLastAccessToUsers < ActiveRecord::Migration
  def change
    add_column :users, :last_access, :timestamp
  end
end
