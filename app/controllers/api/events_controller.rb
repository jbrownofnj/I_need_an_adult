class Api::EventsController < ApplicationController
  before_action :set_event, only: [ :show, :update, :destroy ]
  before_action :authorize_user,  only: [:index,:show,:create,:update,:get_events,:add_event,:update_user_event,:destroy_user_event]
  before_action :is_admin, only: [:index,:show, :destroy,:create, :update]

  def index
    @events = Event.all

    render json: @events
  end

  def show
    render json: @event
  end

  def create
    @event = Event.new(event_params)

    if @event.save
      render json: @event, status: :created, location: @event
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  def update
    if @event.update(event_params)
      render json: @event
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @event.destroy
  end
  
  def get_events
    user_for_events=User.find(session[:current_user])
    render json: user_for_events.events, each_serializer: GetUserEventsSerializer
  end

  def get_coplanner_events
    user_for_coplanner_events=User.find(session[:current_user])
    render json: user_for_coplanner_events.shower_users, each_serializer: GetCoplannerEventsSerializer
  end

  def add_event
    user_for_event=User.find(session[:current_user])
    new_event=user_for_event.events.build(event_params)
    if new_event.save
        render json:new_event, status: :created, serializer: GetUserEventsSerializer
    else
        render json: {errors:"That event didnt work"}, status: :unprocessable_entity
    end
    
  end

  def update_user_event
    the_event=Event.find(params[:id])
    if the_event.user_id==session[:current_user]
        
        if the_event.update!(event_params)
        render json:the_event, status: :created
        end
    else 
        render json: {errors:"failed security check"}
    end
end

def destroy_user_event
    the_event=Event.find(params[:id])
    if the_event.user_id==session[:current_user]
        the_event.destroy
        render json:the_event
    else
        render json:{errors:"Not yours!"} 
    end
end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_event
      @event = Event.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def event_params
      params.permit(:event_name,:event_start,:event_end,:event_description, :event_location, :event_contact, :private)
    end
end
