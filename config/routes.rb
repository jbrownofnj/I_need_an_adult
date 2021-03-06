Rails.application.routes.draw do
  namespace :api do
    resources :preperations
    resources :events
    resources :prereqs 
    resources :tasks
    resources :coplanners do
      member do
        get :confirm_coplanner
      end
    end
    resources :users do
      member do
        get :confirm_email
      end
    end

    post "/login", to: 'sessions#login'
    delete "/logout", to:'sessions#logout'
    
    get "/me", to: "users#me"
    post "/createUser", to:'users#create_user'
  
    get "/getUserTasks", to:'tasks#get_tasks'
    post "/createUserTask", to: "tasks#create_user_task"
    delete "/completeTask/:id", to: 'tasks#destroy_task' 
  
    get "/getUserEvents", to: "events#get_events"
    get "/getCoplannerEvents", to: "events#get_coplanner_events"
    post "/addUserEvent", to: "events#add_event"
    patch "/updateUserEvent", to: "events#update_user_event"
    delete "/destroyUserEvent/:id", to: "events#destroy_user_event"
   
    delete "/deleteUserPrereq/:id", to: "prereqs#destroy_user_prereq"
    post "/createUserPrereq", to: "prereqs#create_user_prereq"

    get "/getCoplannerUsers", to: "users#get_coplanner_users"
    post "/requestCoplanner", to: "coplanners#create_viewer_coplanner"
    delete "/deleteShowerCoplanner", to: "coplanners#destroy_shower_coplanner"
    delete "/deleteViewerCoplanner", to: "coplanners#destroy_viewer_coplanner"
  end
  
    get '*path',
    to: 'fallback#index'
 
end

