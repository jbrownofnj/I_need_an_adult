class Api::TasksController < ApplicationController
  before_action :set_task, only: %i[ show update destroy ]
  before_action :authorize_user,  only: [:index,:show, :create,:destroy, :update,:get_tasks,:destroy_task,:create_user_task]
  before_action :is_admin, only: [:index,:show, :destroy,:create, :update]
  # GET /tasks
  def index
    @tasks = Task.all

    render json: @tasks
  end

  # GET /tasks/1
  def show
    render json: @task
  end

  # POST /tasks
  def create
    @task = Task.new(task_params)

    if @task.save
      render json: @task, status: :created, location: @task
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tasks/1
  def update
    if @task.update(task_params)
      render json: @task
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  # DELETE /tasks/1
  def destroy
    @task.destroy
  end

  def get_tasks
    user_for_task=User.find(session[:current_user])
    render json:user_for_task.tasks each_serializer: GetUserTasksSerializer
end

def destroy_task
    destroyed_task=Task.find(params[:id])
    if destroyed_task.user_id==session[:current_user]
        destroyed_task.destroy
    
        if Prereq.find_by(required_task_id: destroyed_task.id)
            Prereq.where(required_task_id: destroyed_task.id).destroy_all
        else 
            render json: {result:"nope"}
        end
    else
        render json:{errors:"Thats not yours"}
    end
    render json:destroyed_task
end

def create_user_task
    user_for_task=User.find(session[:current_user])
    new_task=user_for_task.tasks.build(task_params)
    if new_task.save
        render json:new_task, status: :created
    else
        render json: {errors:"That task didnt work"}, status: :unprocessable_entity
    end
  
end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_task
      @task = Task.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def task_params
      params.require(:task).permit(:task_name, :task_description, :task_location, :task_contact, :task_due_date, :task_duration, :private, :user_id)
    end
end
