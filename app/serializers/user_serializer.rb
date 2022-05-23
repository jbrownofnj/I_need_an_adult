class UserSerializer < ActiveModel::Serializer
  attributes :id, :user_name, :color_coefficient, :user_email, :email_validated, :confirmation_token, :password_digest, :is_admin
end
