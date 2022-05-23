class Event < ApplicationRecord
  belongs_to :user
  has_many :preperations, dependent: :destroy
  has_many :tasks, through: :preperations
  validates :event_name,presence: true, length:{minimum:1,maximum:100}
  validates :event_description, length:{maximum:1000}
  validates :event_location, length:{maximum:200}
  validates :event_contact, length:{maximum:200}
  validates :event_start, presence: true
  validates :event_end, presence: true

end
