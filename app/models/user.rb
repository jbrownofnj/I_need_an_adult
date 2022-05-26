class User < ApplicationRecord
    has_secure_password
    before_create :confirm_token
    has_many :tasks
    has_many :events

    has_many :shower_coplanners, foreign_key: :shower_user_id, class_name: "Coplanner"
    has_many :viewer_users, through: :shower_coplanners

    has_many :viewer_coplanners, foreign_key: :viewer_user_id, class_name: "Coplanner"
    has_many :shower_users, through: :viewer_coplanners
    
    validates :user_name, presence: true, length: {minimum:4,maximum:30}
    validates :color_coefficient, presence: true, numericality: {greater_than:0.1,less_than:3}
    validates :user_email, presence: true, email: {mode: :strict, require_fqdn: true},uniqueness: true
    validates :password , presence:true, format: { with: /\A(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.{8,})(?=.*[^[:alnum:]])/x, message: "please enter keywords in correct format"} 
    private
      def confirm_token
        if self.confirmation_token.blank?
            self.confirmation_token = SecureRandom.urlsafe_base64.to_s
        end
      end
end
