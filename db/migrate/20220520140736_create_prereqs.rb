class CreatePrereqs < ActiveRecord::Migration[7.0]
  def change
    create_table :prereqs do |t|
      t.integer :independent_task_id, null: false, foreign_key: true
      t.integer :prereq_task_id, null: false, foreign_key: true
      

      t.timestamps
    end
    add_index :prereqs, :independent_task_id
    add_index :prereqs, :prereq_task_id
  end
end
