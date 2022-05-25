class GetUserEventsSerializer < ActiveModel::Serializer
  attributes :id, :eventName, :eventDescription, :eventLocation, :eventContact, :eventStart, :eventEnd, :userEmail,:eventUser,:private

  def eventName
    object.event_name
  end
  def eventDescription
    object.event_description
  end
  def eventLocation
    object.event_location
  end
  def eventContact
    object.event_contact
  end
  def eventStart
    object.event_start
  end
  def eventEnd
    object.event_end
  end
  def userEmail     
    object.user.user_email
  end
  def eventUser
    object.user.user_name
  end
  

 
 

end
