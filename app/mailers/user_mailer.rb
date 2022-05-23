class UserMailer < ApplicationMailer
    def registration_confirmation(user)
        @user=user
        mail(:to=>"#{user.user_name} <#{user.user_email}>", subject:"Registration Confirmation")
    end
end
