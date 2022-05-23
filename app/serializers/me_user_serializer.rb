class MeUserSerializer < ActiveModel::Serializer
  attributes :id, :color_coefficient, :user_name, :user_email
end
