class GetCoplannerEventsSerializer < ActiveModel::Serializer
  attributes :coplannerEvents
  
  def coplannerEvents
    coplanner_event_array=[]
    if object.events
      object.events.each do |eachEvent|
        if(!eachEvent.private)
        coplanner_event_array<<{"eventName": eachEvent.event_name,"eventUser": eachEvent.user.user_name,"eventUserEmail": eachEvent.user.user_email,"private": eachEvent.private, "eventStart": eachEvent.event_start , "eventEnd":eachEvent.event_end , "id": eachEvent.id, "eventDescription": eachEvent.event_description, "userEmail": eachEvent.user.user_email,"eventLocation": eachEvent.event_location,"eventContact": eachEvent.event_contact}
        end
      end
      return coplanner_event_array
    else
      return coplanner_event_array
    end
  end

end
