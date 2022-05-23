Rails.application.routes.draw do
  resources :preperations
  resources :events
  resources :prereqs
  resources :tasks
  resources :coplanners
  
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
  post "/addUserEvent", to: "events#add_event"
  patch "/updateUserEvent", to: "events#update_user_event"
  delete "/destroyUserEvent/:id", to: "events#destroy_user_event"
 
  delete "/deleteUserPrereq/:id", to: "prereqs#destroy_user_prereq"
  post "/createUserPrereq", to: "prereqs#create_user_prereq"
  get '*path',
  to: 'fallback#index'
  # constraints: ->(req) { !req.xhr? && req.format.html? }
end
