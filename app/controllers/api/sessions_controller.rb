class Api::SessionsController < ApplicationController
    before_action :authorize_user, except: [:login]

    def login

        user = User.find_by(user_email: params[:email])
        if user&.email_validated != true
            render json:{errors:"Email has yet to be validated"}, status: :unauthorized
        else
            if user&.authenticate(params[:password])
                session[:current_user] = user.id
                render json: user, status: :ok, serializer: MeUserSerializer
            else
                render json: { errors: "Bad username or password" },  status: :unauthorized
            end
        end

     

    end 

    def logout
        session[:current_user]=nil
        render json:{success:"hopefully you logged out"}
    end 
end
