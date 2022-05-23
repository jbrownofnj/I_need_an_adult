class PreperationSerializer < ActiveModel::Serializer
  attributes :id
  has_one :task
  has_one :event
end
