class RemoveTimestampFromMessages < ActiveRecord::Migration
  def change
    remove_column :messages, :timestamp, :datetime
  end
end
