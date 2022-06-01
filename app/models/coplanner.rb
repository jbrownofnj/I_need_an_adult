class Coplanner < ApplicationRecord
    belongs_to :shower_user, class_name: "User"
    belongs_to :viewer_user, class_name: "User"
    before_create :confirm_token
    private
    def confirm_token
        if self.confirmation_token.blank?
            self.confirmation_token = SecureRandom.urlsafe_base64.to_s
        end
    end
end
