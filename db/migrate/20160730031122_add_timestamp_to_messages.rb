class AddTimestampToMessages < ActiveRecord::Migration
  def change
    add_column :messages, :timestamp, :timestamp
  end
end
