class TaskSerializer < ActiveModel::Serializer
  attributes :id, :taskName,:taskDescription,:taskLocation,:taskContact,:taskDuration,:taskDueDate
  has_many :prereq_tasks
  def taskName
    object.task_name
  end
  def taskDescription
    object.task_description
  end
  def taskLocation
    object.task_location
  end
  def taskContact
    object.task_contact
  end
  def taskDueDate 
    object.task_due_date
  end
  def taskDuration
    object.task_duration
  end
end

