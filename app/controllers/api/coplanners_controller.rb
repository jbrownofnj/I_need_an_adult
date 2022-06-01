class Api::CoplannersController < ApplicationController
  before_action :set_coplanner, only:[ :show, :update, :destroy]
  before_action :is_admin, only: [:index, :show, :create, :update, :destroy]
  before_action :authorize_user,  only: [:index, :show, :create, :update, :destroy,:create_viewer_coplanner,:destroy_viewer_coplanner,:destroy_shower_coplanner]

  def index
    @coplanners = Coplanner.all

    render json: @coplanners
  end

  def show
    render json: @coplanner
  end

  def create
    @coplanner = Coplanner.new(coplanner_params)

    if @coplanner.save
      render json: @coplanner, status: :created, location: @coplanner
    else
      render json: @coplanner.errors, status: :unprocessable_entity
    end
  end

  def update
    if @coplanner.update(coplanner_params)
      render json: @coplanner
    else
      render json: @coplanner.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @coplanner.destroy
  end

  def create_viewer_coplanner
    if User.exists?(user_email: params[:shower_email])
      if User.find(session[:current_user])==User.find_by!(user_email: params[:shower_email])
        render json:{errors: "You are trying to make a request to your own email"}, status: :bad_request
      else
        if (User.find(session[:current_user]).shower_users.exists?(user_email: params[:shower_email]))
          existing_coplanner=User.find(session[:current_user]).viewer_coplanners.find_by(shower_user_id: User.find_by(user_email: params[:shower_email]).id)
          if (existing_coplanner.created_at.before?(15.seconds.ago))
            existing_coplanner.destroy
            showing_user=User.find_by(user_email: params[:shower_email])
            viewing_user=User.find(session[:current_user])
            @new_coplanner=Coplanner.new(shower_user: showing_user, viewer_user: viewing_user )
            if @new_coplanner.save
              @shower=User.find_by(user_email: params[:shower_email])
              @viewer=User.find(session[:current_user])
              CoplannerMailer.coplanner_confirmation(@shower,@viewer,@new_coplanner).deliver_later
              render json:@new_coplanner, status: :ok
            else
              render json:{errors:"New coplanner failed to save"}, status: :unprocessable_entity
            end
          else
            render json: {errors:"A request for view permission has already been sent. Please wait before resending request."}, status: :bad_request
          end
        else
          showing_user=User.find_by(user_email: params[:shower_email])
          viewing_user=User.find(session[:current_user])
          @new_coplanner=Coplanner.new(shower_user: showing_user, viewer_user: viewing_user)
          if @new_coplanner.save
            @shower=User.find_by(user_email: params[:shower_email])
            @viewer=User.find(session[:current_user])
            CoplannerMailer.coplanner_confirmation(@shower,@viewer,@new_coplanner).deliver_later
            render json:@new_coplanner, status: :ok
          else
            render json:{errors:"New coplanner failed to save"}, status: :unprocessable_entity
          end
        end
      end
    else
      render json:{errors:"User doesn't exist"}, status: :bad_request
    end
  end

  def confirm_coplanner
    coplanner = Coplanner.find_by(confirmation_token: params[:id])
    if coplanner
      coplanner.update!(confirmation_token:"",viewer_has_been_validated:true)
        render json: {message:"Thanks for confirming this users abilty to view your events."}
    else
      render json: {errors:"Sorry. This token is not active."}
    end
end
  
  def destroy_viewer_coplanner
    user=User.find(session[:current_user])
    showing_user=user.shower_users.find_by(user_email: params[:userEmail])
    users_viewer_coplanners=user.viewer_coplanners
    coplanner_to_destroy=users_viewer_coplanners.find_by(shower_user_id: showing_user.id)
    coplanner_to_destroy.destroy
    render json: {message: "Destroyed Viewer Coplanner"}, status: :ok
  end
  
  def destroy_shower_coplanner
    user=User.find(session[:current_user])
    viewing_user=user.viewer_users.find_by(user_email: params[:userEmail])
    user_shower_coplanners=user.shower_coplanners
    coplanner_to_destroy=user_shower_coplanners.find_by(viewer_user_id: viewing_user.id)
    coplanner_to_destroy.destroy
    render json:{message: "Destroyed Shower Coplanner"}, status: :ok
  end

  private

    def set_coplanner
      @coplanner = Coplanner.find(params[:shower_user])
    end

    def coplanner_params
      params.require(:coplanner).permit(:shower_id, :viewer_id, :viewer_validated, :confimation_token)
    end

    def user_coplanner_params
      params.require(:coplanner).permit(:shower_id, :viewer_id)
    end

end
