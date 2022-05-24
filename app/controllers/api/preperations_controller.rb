class Api::PreperationsController < ApplicationController
  before_action :set_preperation, only: %i[ show update destroy ]
  before_action :authorize_user,  only: [:index,:show, :create,:destroy, :update]
  before_action :is_admin, only: [:index,:show, :destroy,:create, :update]
  # GET /preperations
  def index
    @preperations = Preperation.all

    render json: @preperations
  end

  # GET /preperations/1
  def show
    render json: @preperation
  end

  # POST /preperations
  def create
    @preperation = Preperation.new(preperation_params)

    if @preperation.save
      render json: @preperation, status: :created, location: @preperation
    else
      render json: @preperation.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /preperations/1
  def update
    if @preperation.update(preperation_params)
      render json: @preperation
    else
      render json: @preperation.errors, status: :unprocessable_entity
    end
  end

  # DELETE /preperations/1
  def destroy
    @preperation.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_preperation
      @preperation = Preperation.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def preperation_params
      params.require(:preperation).permit(:task_id, :event_id)
    end
end
