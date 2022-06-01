class Task < ApplicationRecord
  belongs_to :user
  
  
  has_many :independent_prereqs, foreign_key: :independent_task_id, class_name: "Prereq", dependent: :destroy
  has_many :prereq_tasks,through: :independent_prereqs

  has_many :prereq_prereqs, foreign_key: :prereq_task_id, class_name: "Prereq", dependent: :destroy
  has_many :independent_tasks, through: :prereq_prereqs

  has_many :preperations, dependent: :destroy
  has_many :events, through: :preperations

  validates :task_name, presence: true, length: {minimum:1 , maximum:50}
  validates :task_description,length:{maximum:500}
  validates :task_location,length:{maximum:200}
  validates :task_contact,length:{maximum:100}
  validate :task_due_date

end
