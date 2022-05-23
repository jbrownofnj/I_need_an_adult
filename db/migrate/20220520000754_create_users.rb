class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :user_name, null: false
      t.float :color_coefficient, default: 1.0
      t.string :user_email, null: false
      t.boolean :email_validated, default: false
      t.string :confirmation_token, default:""
      t.string :password_digest, null:false
      t.boolean :is_admin, default: false

      t.timestamps
    end
  end
end
