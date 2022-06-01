class Api::PrereqsController < ApplicationController
  before_action :set_prereq, only: %i[ show update destroy]
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
    independent_task_owner=Task.find(params[:independent_task_id]).user
    dependent_task_owner=Task.find(params[:prereq_task_id]).user
    are_your_tasks=independent_task_owner.id==session[:current_user] && dependent_task_owner.id==session[:current_user]
    not_same_tasks=params[:prereq_task_id]==params[:independent_task_id]
    if are_your_tasks && !not_same_tasks
      new_prereq=Prereq.create(prereq_params)
      render json:new_prereq, status: :ok
    else
      render json:{errors: "These tasks are unaccessable"}
    end
  end

  def destroy_user_prereq
    user=User.find(session[:current_user])
    prereq_to_destroy=Prereq.find_by(prereq_task_id: params[:id])
    if(prereq_to_destroy.independent_task.user.id==session[:current_user])
      prereq_to_destroy.destroy
      render json:prereq_to_destroy, status: :ok
    else
      render json:{errors:"didnt work"}
    end
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
