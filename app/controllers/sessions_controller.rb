class SessionsController < ApplicationController
    before_action :authorize_user, except: [:login]

    def login

        user = User.find_by(user_email: params[:email])
    
        if user&.authenticate(params[:password])
            session[:current_user] = user.id
            session[:cheesecake]="sweet sweet cake"
            render json: user, status: :ok
        else
            render json: { error: "Bad username or password" },  status: :unauthorized
        end

    end 

    def logout
        session[:current_user]=nil
        render json:{success:"hopefully you logged out"}
    end 
end
