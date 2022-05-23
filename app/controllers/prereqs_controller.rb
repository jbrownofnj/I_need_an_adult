class PrereqsController < ApplicationController
  before_action :set_prereq, only: %i[ show update destroy create_user_prereq destroy_user_prereq]
  before_action :authorize_user,  only: [:index,:show, :create,:destroy, :update, :create_user_prereq, :destroy_user_prereq]
  before_action :is_admin, only: [:index,:show, :destroy,:create, :update]
 
  def index
    @prereqs = Prereq.all

    render json: @prereqs
  end


  def show
    render json: @prereq
  end

 
  def create
    @prereq = Prereq.new(prereq_params)

    if @prereq.save
      render json: @prereq, status: :created, location: @prereq
    else
      render json: @prereq.errors, status: :unprocessable_entity
    end
  end


  def update
    if @prereq.update(prereq_params)
      render json: @prereq
    else
      render json: @prereq.errors, status: :unprocessable_entity
    end
  end

 
  def destroy
    @prereq.destroy
  end
  def create_user_prereq
    @prereq = Prereq.new(prereq_params)

    if @prereq.save
      render json: @prereq, status: :created, location: @prereq
    else
      render json: @prereq.errors, status: :unprocessable_entity
    end
  end
  def destroy_user_prereq
    @prereq.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_prereq
      @prereq = Prereq.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def prereq_params
      params.require(:prereq).permit(:independent_task_id, :prereq_task_id)
    end
end
