class MeUserSerializer < ActiveModel::Serializer
  attributes :userName, :userEmail, :colorCoefficient
  def userName
    object.user_name
  end
  def userEmail
    object.user_email
  end
  def colorCoefficient
    object.color_coefficient
  end
  
end
