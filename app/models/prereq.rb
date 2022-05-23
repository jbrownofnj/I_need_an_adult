class Prereq < ApplicationRecord
    belongs_to :prereq_task, class_name:"Task"
    belongs_to :independent_task, class_name:"Task"
end
