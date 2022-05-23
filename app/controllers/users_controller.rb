class UsersController < ApplicationController
  before_action :set_user, only: %i[ show update destroy ]
  before_action :authorize_user,  only: [:index,:show, :create,:destroy, :update, :me]
  before_action :is_admin, only: [:index,:show, :destroy,:create, :update]

  def index
    @users = User.all

    render json: @users
  end


  def show
    render json: @user
  end


  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user, status: :created, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

def me
  render json: User.find(session[:current_user]), status: :ok, serializer: MeUserSerializer 
end

  def create_user
    @user = User.new(user_params)    
    if @user.save
      UserMailer.registration_confirmation(@user).deliver_later
      #flash[:success] = "Please confirm your email address to continue"
      render jason:{message:"nicely created"}
    else
      render jason:{errors:"oops something went wrong"}
    end
  end

  def email_activate
    self.email_validated = true
    self.confirmation_token = nil
    save!(:validate => false)
  end 

  def confirm_email
    user = User.find_by(confirmation_token: params[:id])
    if user
      user.update!(confirmation_token:"",email_validated:true)
        render json: {message:"Welcome to the Sample App! Your email has been confirmed.Please sign in to continue."}
    else
      render json: {errors:"Sorry. This token is not active."}
    end
end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.permit(:user_name, :color_coefficient, :user_email, :email_validated, :password)
    end
   
end
