class CreatePreperations < ActiveRecord::Migration[7.0]
  def change
    create_table :preperations do |t|
      t.references :task, null: false, foreign_key: true
      t.references :event, null: false, foreign_key: true

      t.timestamps
    end
  end
end
