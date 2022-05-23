class Coplanner < ApplicationRecord
    belongs_to :shower_user, class_name: "User"
    belongs_to :viewer_user, class_name: "User"
end
