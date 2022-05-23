class PrereqSerializer < ActiveModel::Serializer
  attributes :id, :independent_task_id, :prereq_task_id
end
