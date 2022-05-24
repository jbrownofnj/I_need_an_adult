class Api::CoplannersController < ApplicationController
  before_action :set_coplanner, only:[ :show, :update, :destroy ]
  before_action :is_admin, only: [:index, :show, :destroy, :create, :update]
  before_action :authorize_user,  only: [:index, :show, :create, :update, :destroy]

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

  private

    def set_coplanner
      @coplanner = Coplanner.find(params[:id])
    end

    def coplanner_params
      params.require(:coplanner).permit(:shower_id, :viewer_id, :viewer_validated, :confimation_token)
    end

end
