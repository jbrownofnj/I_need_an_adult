class CreateCoplanners < ActiveRecord::Migration[7.0]
  def change
    create_table :coplanners do |t|
      t.integer :shower_user_id, null: false, foreign_key: true
      t.integer :viewer_user_id, null: false, foreign_key: true
      t.boolean :viewer_has_been_validated
      t.string :confirmation_token

      t.timestamps
    end
    add_index :coplanners,:shower_user_id
    add_index :coplanners,:viewer_user_id
  end
  
end
