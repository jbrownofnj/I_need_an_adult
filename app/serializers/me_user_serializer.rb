class MeUserSerializer < ActiveModel::Serializer
  attributes :userName, :userEmail, :colorCoefficient,:userShowerCoplanners, :userViewerCoplanners
  def userName
    object.user_name
  end
  def userEmail
    object.user_email
  end
  def colorCoefficient
    object.color_coefficient
  end
  def userShowerCoplanners
    user_shower_coplanner_array=[]
    if object.shower_coplanners.each do |shower_coplanner|
      if (shower_coplanner.viewer_has_been_validated)
        user_shower_coplanner_array<<{"userName": shower_coplanner.viewer_user.user_name,"userEmail": shower_coplanner.viewer_user.user_email}
      end
    end
    end
    return user_shower_coplanner_array
  end

  def userViewerCoplanners
    user_viewer_coplanner_array=[]
    if object.viewer_coplanners.each do |viewer_coplanner|
      if (viewer_coplanner.viewer_has_been_validated)
        user_viewer_coplanner_array<<{"userName": viewer_coplanner.shower_user.user_name,"userEmail": viewer_coplanner.shower_user.user_email}
      end
    end
    end
    return user_viewer_coplanner_array
  end
  
end
