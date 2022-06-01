class CoplannerMailer < ApplicationMailer
    def coplanner_confirmation(shower,viewer,new_coplanner)
        @shower = shower
        @viewer=viewer
        @new_coplanner=new_coplanner
        mail(:to=>"#{@shower.user_name} <#{@shower.user_email}>", subject:"Registration Confirmation")
    end
end